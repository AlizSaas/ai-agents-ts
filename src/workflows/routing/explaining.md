# Routing Workflow

## Overview
This folder demonstrates the **routing pattern**, where an initial LLM call classifies input and routes it to specialized handlers with domain-specific prompts and capabilities.

## Files

### router-simple.ts
A basic routing implementation for customer support:
- **Step 1**: Classifier LLM determines if the message is "billing", "technical", or "general"
- **Step 2**: Routes to specialized agent with category-specific system prompt
- **Step 3**: Specialized agent generates response using appropriate context

**Example**: "I was charged twice for my last order and I need a refund"
- Classified as: `billing`
- Routed to billing specialist with instructions to be "direct and solution-oriented"

**Categories**:
- **Billing**: Handles refunds, invoices, payment issues
- **Technical**: Diagnoses issues with step-by-step troubleshooting
- **General**: Answers general product questions

### router.ts
An interactive version of the routing pattern:
- Implements a continuous conversation loop using `readline`
- User can type messages interactively
- Each message is classified and routed in real-time
- Shows category classification before each response
- Type "exit" to quit

**Features**:
- Live classification and routing
- Different system prompts per category
- Visual indicators (🏷️ for classification, 🤖 for response)

## Pattern
This demonstrates the **Classify → Route → Respond** pattern, where:
1. A classifier determines the intent/category
2. Code routes to the appropriate specialized handler
3. A specialized LLM responds with domain-specific context

This is more efficient than a single general-purpose prompt and allows for:
- Category-specific tools (e.g., billing agent could access order lookup)
- Specialized knowledge bases per category
- Different response styles and priorities
