# Node port reuse addon

This is a really simple to use linux native node addon that enables port reuse without needing to use clusters in nodejs.

It works by binding a socket with [`SO_REUSEPORT`](https://lwn.net/Articles/542629/) and passing it to nodejs as a handle whenever you want to listen on that port.

The native addon is built using dotnet core 8 and it's amazing new AOT feature.

## Quick start

Install the package:
```shell
npm i node-port-reuse-addon
```

Example usage:
```js
const http = require('http');
const library = require('node-port-reuse-addon');

// instead of just the port, pass a handle with the already bound port.
const handle = { fd: library.bindPort(12345) };

const server = http.createServer((req, res) => {
    res.end(`Hello HTTP ${id}`);
});

server.listen(handle, () => {
    console.log('HTTP server is listening');
});
```

## Prerequisites
If you want to build from source manually you need:
- [Node](https://nodejs.org/en) installed.
- [Make](https://www.gnu.org/software/make/) installed.
- [Dotnet **8**](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) SDK and Runtime.

#### Build the .node file
```shell
make node
```

#### Build npm addon
```shell
make addon
```

#### Run the unit tests
```shell
make tests
```

#### pm2 proof of concept
As a proof of concept you can run a dummy http server using pm2 but *without* it's clustering options. (i.e. `-i N`).

```shell
# all of those should keep running :)
pm2 start ./tests/server.js -f
pm2 start ./tests/server.js -f
...
pm2 start ./tests/server.js -f
```
