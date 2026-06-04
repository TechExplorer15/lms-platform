import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';

async function run() {
  const envText = fs.readFileSync('.env', 'utf8');
  const match = envText.match(/GEMINI_API_KEY=(.+)/);
  if (!match) return console.log("Key not found in .env");
  const key = match[1].trim();
  
  const genAI = new GoogleGenerativeAI(key);
  try {
    const models = await genAI.getModels();
    console.log("Models:", models);
  } catch(e) {
    console.log("Error:", e.message);
  }
}
run();
