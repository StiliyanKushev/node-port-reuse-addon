/**
 * @summary
 * 
 * This test file can be used with pm2 to showcase how you can
 * horizontally extend your nodejs app without creating threads
 * or clusters and without using pm2's native clustering.
 * 
 * You can now run this as many times as you want:
 * `pm2 start ./tests/server.js -f`
 */

const http = require('http');
const library = require('node-port-reuse-addon');

const handle = { fd: library.bindPort(12345) };
const id = Math.floor(Math.random()*10_000);

const server = http.createServer((req, res) => {
    res.end(`Hello HTTP ${id}`);
});

server.listen(handle, () => {
    console.log('HTTP server is listening', id);
});