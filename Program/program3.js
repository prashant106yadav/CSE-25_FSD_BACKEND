const http = require('http');

const server = http.createServer((req, res) => {
    // Set status code and headers
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    // Send response
    res.end('Hello World');
});

// Start server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

