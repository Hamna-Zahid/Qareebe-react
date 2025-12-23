const API_URL = 'http://localhost:5000/api';

const testLoginFlow = async () => {
    try {
        console.log('1️⃣  Attempting Login...');
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone: '+923000000000',
                password: 'adminpassword123'
            })
        });

        const loginData = await loginRes.json();

        if (loginRes.ok && loginData.success) {
            console.log('✅ Login Successful');
            const token = loginData.token;
            console.log('🔑 Token received:', token.substring(0, 20) + '...');

            console.log('\n2️⃣  Attempting Admin Route (GET /admin/stats)...');
            const statsRes = await fetch(`${API_URL}/admin/stats`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (statsRes.ok) {
                const statsData = await statsRes.json();
                console.log('✅ Admin Access Granted');
                console.log('📊 Stats:', statsData);
            } else {
                console.log('❌ Admin Access Failed:', statsRes.status);
                const errData = await statsRes.text();
                console.log('   Response:', errData);
            }

        } else {
            console.log('❌ Login Failed:', loginRes.status, loginData);
        }

    } catch (error) {
        console.error('❌ Error during test:', error.message);
    }
};

testLoginFlow();
