import dotenv from "dotenv";
import OpenAI from "openai";
import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url)) //
const path = (file: string) => join(__dirname, file)

dotenv.config();

/**
 * Prompt Chaining Workflow — AI-powered code generation with validation gates.
 *
 * 1. Reads bikes.ts and sends it to GPT, asking it to add a new "getCheapest" function.
 * 2. Gate 1: Checks if the AI's response actually contains the new function.
 * 3. Writes the AI-generated code to bikes.ts.
 * 4. Gate 2: Runs test.ts to verify both existing and new functions work correctly.
 *    If tests fail, rolls back bikes.ts to the original version.
 * 5. Sends both the original and new code to GPT to generate a changelog entry.
 *
 * This is an agentic workflow that chains multiple LLM calls together,
 * where each step's output feeds into the next, with quality gates in between
 * to catch and recover from bad AI output.
 */

const client = new OpenAI(
    {
        apiKey: process.env.OPENAI_API_KEY!
    }
)
 

const code = readFileSync(path('bikes.ts'), 'utf-8')

//workflow read -> promp t -> write and test rollback if failed

 const response = await client.responses.create({
    model: "gpt-4o",
    input: `Add a new exported function called "getCheapest" that takes the same arguments as "getTopExpensiveBikes" but returns the cheapest bikes instead. Keep the existing code unchanged. Return ONLY the full file code, no markdown, no explanation.\n\n${code}`
 })

 let newCode = response.output_text

 // Strip markdown code fences if the model wrapped the output
 newCode = newCode.replace(/^```(?:typescript|ts)?\n/i, '').replace(/\n```$/,'')

 if(!newCode.includes('getCheapest')) {
    console.log('Test failed: Expected the new code to include the function getCheapest');
    process.exit(1)
 }

 console.log('Gate 1 new function found\n')



writeFileSync(path('bikes.ts'), newCode)



try {
  const output = execSync(`npx tsx ${path('test.ts')}`, { encoding: 'utf-8' });
  console.log('Gate 2: tests passed\n' + output.trim());
} catch (error) {
    console.log('Test failed: Code did not compile or run successfully');
    writeFileSync(path('bikes.ts'), code)
    console.log('Code rolled back to previous version\n')
    process.exit(1)
}


const changeLog = await client.responses.create({
    model: "gpt-4o",
    input: `Here is the original code:\n\n${code}\n\nHere is the new code:\n\n${newCode}\n\nWrite a short one-line changelog entry describing what was added. Example format: "Added getCheapest function to return the N lowest priced products."`
})

console.log('\n== Changelog ==\n')
console.log(changeLog.output_text)

writeFileSync(path('changelog.txt'), `- ${changeLog.output_text}`, { flag: 'a', encoding: 'utf-8' })