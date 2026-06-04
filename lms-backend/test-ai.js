import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

import aiService from './src/services/ai.service.js';

async function run() {
  try {
    const mockProfile = {
      dreamRole: "Frontend Engineer",
      currentLevel: "beginner",
      currentSkills: ["HTML", "CSS"],
      targetTimelineMonths: 6
    };
    
    console.log("Testing Groq...");
    const result = await aiService.generateRoadmapGroq(mockProfile);
    console.log("Success! Nodes:", result.nodes.length);
  } catch (error) {
    console.error("AI Service Error:", error);
  }
}

run();
