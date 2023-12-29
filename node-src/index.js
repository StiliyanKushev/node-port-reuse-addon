const { Addon } = require("./addon.node");

/**
 * Creates a unix socket and binds it to that port using SO_REUSEPORT.
 * 
 * @param {number} port Any valid port.
 * 
 * @throws when no port is given.
 * @throws when given port is not valid.
 * @throws when dotnet internal error happens.
 * 
 * @returns {number} the file descriptor of the bound socket.
 */
function bindPort(port) {
    if(typeof port != 'number') {
        throw new Error('port not given!');
    }

    if(port < 0) {
        throw new Error('port cannot be negative number!');
    }

    const fd = Addon.bindPort(port);

    if(fd == 0) {
        throw new Error('internal error!');
    }

    return fd;
}

module.exports.bindPort = bindPort;