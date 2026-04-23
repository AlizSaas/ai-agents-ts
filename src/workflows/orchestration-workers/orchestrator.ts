import "dotenv/config";
import OpenAI from "openai";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const path = (file: string) => join(__dirname, file);
const client = new OpenAI();

const topic = "Why every developer should learn AI agents in 2026";

// Step 1: Orchestrator - decide what sections to write
console.log(`=== Topic: ${topic} ===\n`);
console.log("Orchestrator deciding sections...\n");

const orchestrator = await client.responses.create({
  model: "gpt-5.2",
  input: `I'm writing a blog post about: "${topic}"

Break this into 3-4 sections. Return ONLY a JSON array of section titles, nothing else.
Example: ["Section 1 title", "Section 2 title", "Section 3 title"]`,
});

const sections = JSON.parse(orchestrator.output_text); // 
console.log("Sections planned:");
sections.forEach((s: string, i: number) => console.log(`  ${i + 1}. ${s}`));  // Log the planned sections 
// Example output: ["Introduction to AI Agents", "Benefits of Learning AI Agents", "How to Get Started with AI Agents", "Future of AI Agents"]
console.log(`\nSpawning ${sections.length} workers in parallel...\n`);

// Step 2: Workers - write each section in parallel
const workers = sections.map((section: string, i: number) => {
  console.log(`🚀 Agent ${i + 1} spawned: "${section}"`);
  return client.responses.create({
    model: "gpt-5.2",
    input: `You are writing a section for a blog post about: "${topic}"

Write the section titled: "${section}"
Keep it to 1-2 short paragraphs. Return ONLY the content, no title.`,
  });
});

const results = await Promise.all(workers);
const drafts = results.map((r, i) => ({
  title: sections[i],
  content: r.output_text,
}));

// Log each agent's output
drafts.forEach((draft, i) => {
  console.log(`✅ Agent ${i + 1} done: "${draft.title}"`);
  console.log(draft.content);
  console.log();
});

// Step 3: Synthesizer - combine into a final blog post
console.log("Synthesizing final blog post...\n");

const sectionsText = drafts
  .map((d) => `## ${d.title}\n${d.content}`)
  .join("\n\n");

const synthesizer = await client.responses.create({
  model: "gpt-5.2",
  input: `Here are the sections of a blog post about "${topic}":

${sectionsText}

Combine these into a polished blog post. Add a short intro and conclusion. Keep each section as-is but make the transitions smooth. Return the full blog post in markdown.`,
});

console.log("=== Final Blog Post ===\n");
console.log(synthesizer.output_text);

writeFileSync(path("blog-post.md"), synthesizer.output_text);
console.log("\n✅ Saved to blog-post.md");