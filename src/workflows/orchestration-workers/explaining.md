# Orchestration-Workers Workflow

## Overview
This folder demonstrates the **orchestrator-workers pattern**, where one LLM breaks down a complex task into subtasks, multiple worker LLMs execute those subtasks in parallel, and a synthesizer combines the results into a cohesive output.

## Files

### orchestrator.ts
The main workflow script implementing a 3-step orchestration pattern for blog post generation:
1. **Orchestrator**: Analyzes the topic and breaks it into 3-4 section titles
2. **Workers**: Spawns parallel agents to write each section independently (using `Promise.all`)
3. **Synthesizer**: Combines all sections into a polished final blog post with smooth transitions

**Topic**: "Why every developer should learn AI agents in 2026"

**Key Features**:
- Parallel execution of independent subtasks
- Division of labor based on specialized contexts
- Final aggregation and refinement

### blog-post.md
The final output of the orchestration workflow:
- Complete blog post with introduction and conclusion
- Sections on:
  - AI Agents as the New Default Interface for Software
  - From Coding to Orchestrating: How Developer Workflows Are Changing
  - Building Real Products Faster: Agents for Automation, QA, and Ops
  - Staying Relevant: The Skills and Mindset Developers Need in 2026
- Demonstrates the quality achievable through orchestrated parallel generation

## Pattern
This demonstrates the **Divide → Conquer (Parallel) → Combine** pattern, ideal for tasks that can be decomposed into independent subtasks that are later synthesized into a cohesive whole.
