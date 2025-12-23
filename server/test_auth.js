const fetch = require('node-fetch');

async function testAuth() {
    console.log('1. Testing Dev Login...');
    try {
        const loginRes = await fetch('http://127.0.0.1:5000/api/auth/dev-login', {
            method: 'POST'
        });
        const loginData = await loginRes.json();

        if (!loginData.success) {
            console.error('Login Failed:', loginData);
            return;
        }

        console.log('Login Success! Token:', loginData.token.substring(0, 20) + '...');
        const token = loginData.token;

        console.log('\n2. Testing Protected Route (/api/auth/me)...');
        const meRes = await fetch('http://127.0.0.1:5000/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (meRes.status === 200) {
            console.log('Protected Route Success:', await meRes.json());
        } else {
            console.error('Protected Route Failed:', meRes.status, await meRes.text());
        }

    } catch (err) {
        console.error('Test Error:', err);
    }
}

testAuth();
