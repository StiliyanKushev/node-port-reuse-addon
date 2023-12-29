const http = require('http');
const { Worker, isMainThread, parentPort } = require('worker_threads');
const library = require('node-port-reuse-addon');

const handle = { fd: library.bindPort(12345) };

// returns once the server successfully listens on the port
async function attemptListen() {
    return new Promise(resolve => {
        const server = http.createServer((req, res) => {
            res.end('Hello HTTP');
        });
    
        server.listen(handle, () => {
            console.log('HTTP server is listening', isMainThread);
            resolve(1);
        });
    })
}

// spawn a worker thread of this file
if (isMainThread) {
    const worker = new Worker(__filename);

    // returns once the worker listens on the port
    async function workerAttemptListen() {
        return new Promise(resolve => {
            worker.once('message', resolve);
        });
    }

    // both files will listen on the same port
    it('should be able to listen on the same port', async () => {
        const resolved = await Promise.all([
            attemptListen(),
            workerAttemptListen()
        ]);
        expect(resolved[0]).toBe(1);
        expect(resolved[1]).toBe(1);
    });
}
else {
    // signal success to the main thread
    attemptListen().then(v => parentPort.postMessage(v));
}