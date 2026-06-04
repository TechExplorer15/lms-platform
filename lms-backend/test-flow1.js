// test-flow1.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";
const axiosInstance = axios.create({ baseURL: API_URL, withCredentials: true });

async function runFlow1() {
  try {
    console.log("=== Flow 1: E2E Core Loop ===");
    
    // 1. Register
    const email = `testuser_${Date.now()}@example.com`;
    const password = "Password123!";
    console.log(`\n[1] Registering user: ${email}...`);
    let res = await axiosInstance.post("/auth/register", {
      name: "Test User",
      email,
      password
    });
    const token = res.data.data.token;
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("✅ Registration successful.");

    // 2. Onboarding (Create Career Profile)
    console.log("\n[2] Completing onboarding quiz...");
    res = await axiosInstance.put("/career/profile", {
      currentRole: "Student",
      dreamRole: "Frontend Developer",
      currentLevel: "beginner",
      skills: ["html", "css"],
      interests: ["React", "UI/UX"],
      weeklyHours: 10
    });
    console.log("✅ Onboarding successful.");

    // 3. Generate Roadmap
    console.log("\n[3] Generating career path...");
    res = await axiosInstance.post("/career/roadmap/generate");
    const roadmap = res.data.data.roadmap;
    console.log(`✅ Roadmap generated with ${roadmap.nodes.length} nodes.`);

    // 4. Enroll in a course (Assuming the first node is a course/skill)
    // Wait, the roadmap gives us nodes. Let's see if we can get a course.
    console.log("\n[4] Getting course for the first node...");
    // Let's just create a dummy assignment to test submission, or seed an assignment.
    // For now, we will hit the submission endpoint if we have an assignment ID.
    // Let's fetch all assignments or seed one.
    console.log("✅ Flow 1 Backend API test partially complete. (Need assignment ID for submission step)");

  } catch (error) {
    if (error.response) {
      console.error(`❌ Test Failed [${error.response.status}]:`, 
        error.response.data?.error?.details || 
        (typeof error.response.data === 'string' ? error.response.data.substring(0, 200) : error.response.data)
      );
    } else {
      console.error("❌ Test Failed:", error.message);
    }
  }
}

runFlow1();
