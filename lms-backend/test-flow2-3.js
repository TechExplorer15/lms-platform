import axios from "axios";

const API_URL = "http://localhost:5000/api";
const axiosInstance = axios.create({ baseURL: API_URL, withCredentials: true });

async function runFlow2and3() {
  try {
    console.log("=== Flow 2 & 3: Submission Edge Cases & Rate Limits ===");
    
    // 1. Register a fresh user
    const email = `testuser_${Date.now()}@example.com`;
    console.log(`\n[1] Registering user: ${email}...`);
    let res = await axiosInstance.post("/auth/register", {
      name: "Test User 2",
      email,
      password: "Password123!"
    });
    const token = res.data.data.token;
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("✅ Registration successful.");

    const assignmentId = "6a1dd501dd10d7f61f566995";

    // ==========================================
    // FLOW 2: Invalid Link Validation
    // ==========================================
    console.log("\n[FLOW 2] Submitting a broken GitHub link...");
    try {
      await axiosInstance.post(`/submissions/${assignmentId}`, {
        format: "github",
        content: "this-is-not-a-url"
      });
      console.error("❌ Test Failed: System accepted a broken link!");
    } catch (err) {
      if (err.response?.status === 400) {
        console.log(`✅ System successfully blocked invalid link. Error:`, JSON.stringify(err.response.data?.error?.details || err.response.data.message));
      } else {
        throw err;
      }
    }

    console.log("\n[FLOW 2] Submitting a valid link (First Submission)...");
    let resSubmit = await axiosInstance.post(`/submissions/${assignmentId}`, {
      format: "github",
      content: "https://github.com/test/valid-repo"
    });
    console.log(`✅ Submission successful. Status: ${resSubmit.data.data.submission.status}`);

    // ==========================================
    // FLOW 3: Rate Limiting (5 per day)
    // ==========================================
    console.log("\n[FLOW 3] Triggering rate limit (Submitting 5 more times)...");
    let submissionsCount = 1;
    let hitRateLimit = false;

    for (let i = 0; i < 6; i++) {
      try {
        console.log(`   Attempt ${submissionsCount + 1}...`);
        await axiosInstance.post(`/submissions/${assignmentId}`, {
          format: "github",
          content: `https://github.com/test/valid-repo-${i}`
        });
        submissionsCount++;
      } catch (err) {
        if (err.response?.status === 429) {
          console.log(`✅ Rate limit successfully triggered on attempt ${submissionsCount + 1}. Message: ${err.response.data.message || JSON.stringify(err.response.data.error)}`);
          hitRateLimit = true;
          break;
        } else {
          throw err;
        }
      }
    }

    if (!hitRateLimit) {
      console.error("❌ Test Failed: Rate limit was not triggered after 6 attempts!");
    }

  } catch (error) {
    if (error.response) {
      console.error(`❌ Unexpected Failure [${error.response.status}]:`, 
        error.response.data?.error?.details || error.response.data?.error?.message || error.response.data
      );
    } else {
      console.error("❌ Unexpected Failure:", error.message);
    }
  }
}

runFlow2and3();
