const http = require('http');

function makeRequest(path, method, bodyObj, token, cookie) {
  return new Promise((resolve, reject) => {
    const data = bodyObj ? JSON.stringify(bodyObj) : '';
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (cookie) headers['Cookie'] = cookie;

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
      res.on('end', () => resolve({ 
        statusCode: res.statusCode, 
        body,
        headers: res.headers
      }));
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
  const setCookieHeader = regRes.headers['set-cookie'];
  const cookie = setCookieHeader ? setCookieHeader[0].split(';')[0] : null;
  
  console.log(`Registered. Token: ${token.substring(0, 20)}...`);
  console.log(`Cookie received: ${cookie ? 'YES' : 'NO'}`);

  console.log(`\n[2] Logging Out...`);
  const logoutRes = await makeRequest('/api/auth/logout', 'POST', null, token, cookie);
  console.log(`Logout Status: ${logoutRes.statusCode}`);
  console.log(`Logout Set-Cookie:`, logoutRes.headers['set-cookie']);
  
  console.log(`\n[3] Trying to Refresh with old cookie...`);
  const refreshRes = await makeRequest('/api/auth/refresh', 'GET', null, null, cookie);
  console.log(`Refresh Status (Should be 401): ${refreshRes.statusCode}`);
}

run().catch(console.error);
