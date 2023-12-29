const http = require('http');
const https = require('https');
const http2 = require('http2');
const fs = require('fs');
const library = require('node-port-reuse-addon');

let port = 12345;
const handle = () => ({ fd: library.bindPort(port++) });

// Assuming you have SSL files for HTTPS and HTTP/2 with TLS tests
const sslOptions = {
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
};

// Test for HTTP server
it('should be passable as handle to http', (done) => {
    const server = http.createServer((req, res) => {
        res.end('Hello HTTP');
    });

    server.listen(handle(), () => {
        console.log('HTTP server is listening');
        server.close(done);
    });
});

// Test for HTTPS server
it('should be passable as handle to https', (done) => {
    const server = https.createServer(sslOptions, (req, res) => {
        res.end('Hello HTTPS');
    });

    server.listen(handle(), () => {
        console.log('HTTPS server is listening');
        server.close(done);
    });
});

// Test for HTTP/2 server
it('should be passable as handle to http2', (done) => {
    const server = http2.createServer((req, res) => {
        res.end('Hello HTTP/2');
    });

    server.listen(handle(), () => {
        console.log('HTTP/2 server is listening');
        server.close(done);
    });
});

// Test for HTTP/2 server with TLS
it('should be passable as handle to http2 tls', (done) => {
    const server = http2.createSecureServer(sslOptions, (req, res) => {
        res.end('Hello HTTP/2 TLS');
    });

    server.listen(handle(), () => {
        console.log('HTTP/2 TLS server is listening');
        server.close(done);
    });
});