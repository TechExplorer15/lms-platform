const http = require('http');

function makeRequest(path, method, bodyObj) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(bodyObj);
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    
    const req = http.request(options, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function run() {
  const email = `testuser${Date.now()}@example.com`;
  const password = "Password123!";
  
  console.log(`[1] Registering user: ${email}...`);
  const regRes = await makeRequest('/api/auth/register', 'POST', {
    name: "Test User",
    email: email,
    password: password,
    primaryType: "user"
  });
  console.log(`Register Status: ${regRes.statusCode}`);
  console.log(`Register Body: ${regRes.body}`);
  
  console.log(`\n[2] Logging in as ${email}...`);
  const logRes = await makeRequest('/api/auth/login', 'POST', {
    email: email,
    password: password
  });
  console.log(`Login Status: ${logRes.statusCode}`);
  console.log(`Login Body: ${logRes.body}`);
}

run().catch(console.error);
