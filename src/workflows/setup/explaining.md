# Setup Workflow

## Overview
This folder contains the basic setup and initialization code for testing the OpenAI API integration.

## Files

### index.ts
A minimal "Hello World" style setup file that:
- Loads environment variables from `.env` using `dotenv`
- Initializes the OpenAI client with API key
- Makes a simple test API call with the prompt "What is the meaning of life?"
- Logs the full response object

**Purpose**:
- Verifies OpenAI API credentials are configured correctly
- Tests basic connectivity to the OpenAI API
- Demonstrates the minimal setup required for all other workflows
- Serves as a starting point for understanding the OpenAI SDK usage

**Dependencies**:
- `dotenv`: Environment variable management
- `openai`: Official OpenAI TypeScript/JavaScript SDK

## Pattern
This is a **setup/verification script** - not a workflow pattern itself, but a foundation that ensures:
1. API credentials are properly configured
2. The OpenAI client is correctly initialized
3. Basic API calls are working before running more complex workflows
