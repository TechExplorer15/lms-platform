import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

import Roadmap from './src/models/roadmap.js';
import User from './src/models/user.js';

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const user = await User.findOne({ email: /user1/i });
    if (!user) return console.log('User not found');

    const roadmap = await Roadmap.findOne({ user: user._id });
    if (!roadmap) return console.log('Roadmap not found');

    console.log(`Roadmap ID: ${roadmap._id}`);
    console.log(`Updated At: ${roadmap.updatedAt}`);
    console.log(`Nodes Count: ${roadmap.nodes.length}`);
    
    console.log('\n--- First 3 Nodes ---');
    roadmap.nodes.slice(0, 3).forEach(n => {
      console.log(`[${n.skillDomain}] ${n.title} (${n.status}) - ${n._id}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
