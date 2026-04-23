import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

 const response  = await client.responses.create({
    model:"gpt-5.2",
    input:' What is the meaning of life?'
 })

    console.log(response);