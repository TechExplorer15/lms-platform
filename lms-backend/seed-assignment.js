import mongoose from "mongoose";
import dotenv from "dotenv";
import Assignment from "./src/models/assignment.js";
import Course from "./src/models/course.js";

dotenv.config();

const seedAssignment = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding assignments...");

    // Find any course to link
    const course = await Course.findOne();
    if (!course) {
      console.log("No courses found. Create a course first.");
      process.exit(1);
    }

    const newAssignment = new Assignment({
      title: "Build a Custom React Hook",
      moduleName: "Module 3: Advanced React Patterns",
      skillTag: "React Mastery",
      brief: "Your task is to build a custom React hook `useFetch` that handles loading states, error boundaries, and data caching. This proves you understand the component lifecycle and effect dependencies.",
      timeEstimateMinutes: 120,
      acceptedFormat: "github",
      acceptanceCriteria: [
        "Hook manages loading, error, and data states correctly.",
        "Hook implements a basic cache mechanism using a ref or state.",
        "No infinite loops caused by missing dependencies.",
        "Exported successfully and used in a dummy component."
      ],
      commonMistakes: [
        "Forgetting to add the URL to the dependency array of useEffect.",
        "Not handling the abort controller for component unmounts.",
        "Mutating the cache object directly instead of immutably."
      ],
      exampleOutputUrl: "https://codesandbox.io/s/usefetch-example",
      course: course._id
    });

    const saved = await newAssignment.save();
    console.log(`Assignment seeded with ID: ${saved._id}`);
    process.exit(0);

  } catch (error) {
    console.error("Error seeding assignment:", error);
    process.exit(1);
  }
};

seedAssignment();
