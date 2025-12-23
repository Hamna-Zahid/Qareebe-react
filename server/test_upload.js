const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

async function testUpload() {
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

        const token = loginData.token;
        console.log('Login Success. Token:', token.substring(0, 20) + '...');

        console.log('\n2. Testing Product Upload...');
        const form = new FormData();
        form.append('name', 'Test Product');
        form.append('description', 'Test Description');
        form.append('price', '1000');
        form.append('category', 'women');
        form.append('stock', '10');

        // Create a dummy file
        fs.writeFileSync('test_image.jpg', 'dummy image content');
        form.append('image', fs.createReadStream('test_image.jpg'));

        const uploadRes = await fetch('http://127.0.0.1:5000/api/products', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
                // Note: node-fetch + form-data automatically sets Content-Type header with boundary
            },
            body: form
        });

        const uploadData = await uploadRes.json();

        if (uploadRes.status === 201) {
            console.log('Upload Success:', uploadData);
        } else {
            console.error('Upload Failed:', uploadRes.status, uploadData);
        }

    } catch (err) {
        console.error('Test Error:', err);
    }
}

testUpload();
