import 'dotenv/config'

import OpenAI from 'openai'

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!
})
 

/**
 * You're building a customer support system. A customer sends a message. The first LLM call
 * classifies the message as billing, technical, or general. Then your code routes it to a specialized
 * LLM.
 *
 * We can also combine it with gates, tools, etc. For example, the billing agent could have access to
 * a tool that looks up order information, while the technical agent could have access to a knowledge
 * base of common issues.
 */

// Just simulating an incoming customer support message, can be anything.



const customerMessage  = 'I was charged twice for my last order and I need a refund'



const classification = await client.responses.create({

    model:'gpt-5.2',
    input:`Classify the following customer support message into one of three categories:
     "billing", "technical", or "general". Return ONLY the category name,
      no explanation.
      
      \n\nMessage: "${customerMessage}"`
})


const category = classification.output_text.trim().toLowerCase()

console.log('===Classcification Result===')
console.log(`Message: "${customerMessage}"`)
console.log(`Category: ${category}\n`)

//step 2: Route to the right handlers


const prompts:Record<string,string> = {
    billing: `You are a helpful customer support agent specializing in billing issues. A customer has sent the following message:\n\n"${customerMessage}"\n\nPlease provide a helpful response to address their billing concern.`,
    technical: `You are a helpful customer support agent specializing in technical issues. A customer has sent the following message:\n\n"${customerMessage}"\n\nPlease provide a helpful response to address their technical concern.`,
    general: `You are a helpful customer support agent. A customer has sent the following message:\n\n"${customerMessage}"\n\nPlease provide a helpful response to address their concern.`
}


const systemPrompt = prompts[category];

console.log(`=== Routing to:${category} ===\n`);

//step 3: Get the response from the specialized agent

const response = await client.responses.create({
    model:'gpt-5.2',
    instructions:systemPrompt!,
    input: customerMessage,
})

console.log(`=== Response from ${category} agent ===`)
console.log(response.output_text)