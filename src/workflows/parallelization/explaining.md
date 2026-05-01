# Parallelization Workflow

## Overview
This folder demonstrates **parallel execution patterns** where multiple independent AI tasks run simultaneously using `Promise.all`, then results are combined programmatically or through voting mechanisms.

## Files

### sectioning.ts
Demonstrates parallel research with programmatic combination:
- **Topic**: "AI coding agents"
- **Pattern**: Runs 3 independent research tasks in parallel using web search:
  1. Technical Architecture - How AI coding agents work under the hood
  2. Business Use Cases - Who uses them and for what
  3. Risks & Criticism - What can go wrong
- **Combination**: Results are combined programmatically (not by another LLM call)
- **Output**: Saves comprehensive research to `research.md`

**Key Point**: Each research task is independent and has web search access via `web_search_preview` tool.

### voting.ts
Demonstrates parallel safety checks with majority voting:
- **Scenario**: Content moderation system for product reviews
- **Pattern**: Runs 3 safety checks in parallel:
  1. Hate speech / offensive language detection
  2. Spam / manipulation detection
  3. Personal information (PII) detection
- **Decision Logic**: Uses majority voting - if 2 or more checks flag as "unsafe", the review is blocked
- **Example Input**: A review containing profanity and an email address
- **Output**: Binary decision (PUBLISHED or BLOCKED) based on consensus

### research.md
The output file from `sectioning.ts` containing:
- Detailed technical architecture explanation
- Real-world business use cases with company examples
- Comprehensive risk analysis including security vulnerabilities and legal concerns

## Pattern
This demonstrates two parallel execution strategies:
1. **Parallel Research + Programmatic Combine**: Independent research tasks with deterministic aggregation
2. **Parallel Voting**: Multiple independent checks with consensus-based decision making
