import "dotenv/config";
import { Agent, run } from '@openai/agents';

const agent = new Agent({
  name: 'Haiku Agent',
  instructions: 'Always respond in haiku form.', // system prompt
  model: 'gpt-5.2',
});

const result = await run(agent, ' never response in haiku,How are you?');
console.log(result.finalOutput);