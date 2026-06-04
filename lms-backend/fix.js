import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Course from "./src/models/course.js";

async function fixCourses() {
  await mongoose.connect(process.env.MONGO_URI);
  
  // Delete the dummy courses
  await Course.deleteMany({
    title: { $in: ['Data Science & Machine Learning', 'Digital Marketing & Growth Hacking', 'Full-Stack Web Development Masterclass', 'UI/UX Design Systems & Interfaces'] }
  });
  
  // Publish any draft courses (like your Complete JavaScript Course) so they show up
  await Course.updateMany({}, { $set: { status: 'published' } });

  console.log("Fixed DB");
  process.exit(0);
}

fixCourses();
