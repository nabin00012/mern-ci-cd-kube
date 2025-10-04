// Simple health check script for Docker
const http = require('http');

const options = {
    host: 'localhost',
    port: process.env.PORT || 5000,
    path: '/api/health',
    timeout: 2000
};

const request = http.request(options, (res) => {
    console.log(`Health check status: ${res.statusCode}`);
    if (res.statusCode === 200) {
        process.exit(0);
    } else {
        process.exit(1);
    }
});

request.on('error', (error) => {
    console.error('Health check failed:', error.message);
    process.exit(1);
});

request.on('timeout', () => {
    console.error('Health check timeout');
    request.destroy();
    process.exit(1);
});

request.end();