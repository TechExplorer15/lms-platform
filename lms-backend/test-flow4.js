import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Need this to handle cookies automatically
});

async function runTest() {
  try {
    console.log("=== Flow 4: Forgot Password (Email Delivery) ===");
    
    // 1. Try forgot password with a non-existent email
    const fakeEmail = "nobody@nowhere.com";
    console.log(`\n[1] Requesting password reset for non-existent user: ${fakeEmail}...`);
    try {
      await axiosInstance.post("/auth/forgot-password", { email: fakeEmail });
      console.error("❌ Test Failed: System allowed forgot password for non-existent user.");
    } catch (err) {
      if (err.response?.status === 404) {
        console.log(`✅ System correctly blocked non-existent user. Error: ${err.response.data.message || err.response.data.error?.message}`);
      } else {
        throw err;
      }
    }

    // 2. Try forgot password with an existing email
    const existingEmail = "testuser_1780339688554@example.com";
    console.log(`\n[2] Requesting password reset for existing user: ${existingEmail}...`);
    let res = await axiosInstance.post("/auth/forgot-password", { email: existingEmail });
    console.log(`✅ Request successful! Status: ${res.status}`);
    console.log(`Response Data:`, res.data);
    
    console.log("\n✅ Flow 4 Test Complete! The backend sent the reset token.");
    console.log("NOTE: Check the backend server logs to see the mocked email output, or provide a RESEND_API_KEY in .env to send real emails.");

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

runTest();
