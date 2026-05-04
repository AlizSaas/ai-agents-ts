import "dotenv/config";
import OpenAI from "openai";
import readline from "readline";
import { execSync } from "child_process";

const client = new OpenAI();

const readLine = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout 
});

const tools = [
    {
        name: "do_bash",
        description: "Execute a bash command and return the output",
        type: "function" as const,
        strict: true,
        parameters: {
            type: "object",
            properties: {
                command: { type: "string"}
            },
            required: ["command"],
            additionalProperties: false
        }
    },
    {
        name:'my_dream_bike',
        description:'Answer questions about my dream bike',
        type:'function' as const,
        strict:true,
        parameters:{
            type:'object',
            properties:{command:{type:'string'}},
            required:['command'],
            additionalProperties:false
        }


    }
];

// {"ls -la"}

let previousResponseId: string | null 

function ask(prompt: string): Promise<string> {
  return new Promise((resolve) => readLine.question(prompt, resolve));
}

function executeBash(command: string): string {
  return execSync(command, { encoding: "utf-8" }).toString();
}
function myDreamBike(command: string): string {
 
    return execSync(`echo "My dream bike is a custom-built cafe racer with a sleek black frame, a powerful V-twin engine, and minimalist design. It has a comfortable leather seat, high-performance suspension, and retro-style round headlight. The bike combines classic aesthetics with modern engineering for an exhilarating riding experience."`, { encoding: "utf-8" }).toString();
}


while(true) {
    const input = await ask("You: ");

    if(input.toLowerCase() === "exit" || input.toLowerCase() === "quit") {
        console.log("Exiting...");
        break;
    }

    const response = await client.responses.create({
        model: "gpt-5.2",
        input: input,
        tools,
        previous_response_id: previousResponseId!,
    });



    const toolCall = response.output.find((item) => item.type === "function_call");

    if(toolCall) {
        const args = JSON.parse(toolCall.arguments);
        if(toolCall.name === "do_bash") {
            console.log("Executing command: " + args.command);
            console.log(executeBash(args.command));
        } else if(toolCall.name === "my_dream_bike") {
            console.log(myDreamBike(args.command));
        }
    } else {
        console.log("AI: " + response.output_text);
    }

    previousResponseId = response.id;
}

readLine.close();