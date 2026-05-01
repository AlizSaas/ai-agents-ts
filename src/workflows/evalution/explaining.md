# Evaluation Workflow

## Overview
This folder demonstrates an **evaluation and iteration pattern** for AI-generated code, where a generator and evaluator work together to produce high-quality TypeScript code through multiple iterations.

## Files

### evaluation.ts
The main workflow script that implements a 3-iteration loop for code generation and evaluation:
- **Generator Agent**: Creates or rewrites TypeScript code based on the task specification
- **Evaluator Agent**: Reviews the generated code against strict quality criteria
- **Iteration Loop**: Runs 3 times, feeding evaluator feedback back to the generator
- **Task**: Generates a `getTopExpensive` function that returns the top N most expensive items from an array of products
- **Quality Checks**: 
  1. Descriptive variable/parameter names
  2. Explicit return types on functions
  3. Custom type definitions (not inline)
  4. Edge case handling (empty array, negative count)
  5. No mutation of the original array

### result.ts
The final generated code output from the evaluation workflow:
- Defines a `Product` type with name and price properties
- Exports the `getTopExpensive` function with proper TypeScript typing
- Implements edge case handling and immutability
- Represents the refined result after iterative feedback

## Pattern
This demonstrates the **Generate → Evaluate → Refine** pattern, where multiple LLM calls collaborate to improve code quality through structured feedback loops.
