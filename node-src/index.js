const { Addon } = require("./addon.node");

/**
 * Creates a unix socket and binds it to that port using SO_REUSEPORT.
 * @param {number} port Any valid port.
 * @returns {number} the file descriptor of the bound socket.
 */
module.exports.bindPort = function bindPort(port) {
    
}