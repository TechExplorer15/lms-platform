import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import User from "./src/models/user.js";
import Roadmap from "./src/models/roadmap.js";
import Progress from "./src/models/progress.js";
import Submission from "./src/models/submission.js";
import CareerProfile from "./src/models/careerProfile.js";
import Enrollment from "./src/models/enrollment.js";

async function resetData() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected.");

    // Delete all users except admin
    const deletedUsers = await User.deleteMany({ role: { $ne: "admin" } });
    console.log(`Deleted ${deletedUsers.deletedCount} non-admin users.`);

    // Delete all user-specific data
    const deletedRoadmaps = await Roadmap.deleteMany({});
    console.log(`Deleted ${deletedRoadmaps.deletedCount} roadmaps.`);

    const deletedProgress = await Progress.deleteMany({});
    console.log(`Deleted ${deletedProgress.deletedCount} progress records.`);

    const deletedSubmissions = await Submission.deleteMany({});
    console.log(`Deleted ${deletedSubmissions.deletedCount} submissions.`);

    const deletedProfiles = await CareerProfile.deleteMany({});
    console.log(`Deleted ${deletedProfiles.deletedCount} career profiles.`);

    const deletedEnrollments = await Enrollment.deleteMany({});
    console.log(`Deleted ${deletedEnrollments.deletedCount} enrollments.`);

    console.log("Successfully cleared all user data!");
    process.exit(0);
  } catch (err) {
    console.error("Error clearing data:", err);
    process.exit(1);
  }
}

resetData();
