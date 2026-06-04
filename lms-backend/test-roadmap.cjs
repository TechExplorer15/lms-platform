const http = require('http');

function makeRequest(path, method, bodyObj, token) {
  return new Promise((resolve, reject) => {
    const data = bodyObj ? JSON.stringify(bodyObj) : '';
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: headers
    };
    
    const req = http.request(options, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
    });
    
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function run() {
  const email = `testuser${Date.now()}@example.com`;
  const password = "Password123!";
  
  console.log(`[1] Registering...`);
  const regRes = await makeRequest('/api/auth/register', 'POST', {
    name: "Test User",
    email: email,
    password: password,
    primaryType: "user"
  });
  
  const token = JSON.parse(regRes.body).data.token;
  console.log(`Registered. Token: ${token.substring(0, 20)}...`);

  console.log(`\n[2] Updating Profile (Onboarding)...`);
  const profileRes = await makeRequest('/api/career/profile', 'PUT', {
    dreamRole: "Frontend Engineer",
    currentLevel: "beginner",
    currentSkills: ["HTML"],
    preferredLearningStyle: "visual",
    targetTimelineMonths: 6
  }, token);
  console.log(`Profile Status: ${profileRes.statusCode}`);
  console.log(`Profile Body: ${profileRes.body}`);

  console.log(`\n[3] Generating Roadmap...`);
  const roadmapRes = await makeRequest('/api/career/roadmap/generate', 'POST', null, token);
  console.log(`Roadmap Status: ${roadmapRes.statusCode}`);
  console.log(`Roadmap Body: ${roadmapRes.body}`);
}

run().catch(console.error);
