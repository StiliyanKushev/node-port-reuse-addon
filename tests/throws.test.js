const library = require('node-port-reuse-addon');

it('should throw when no port is given', () => {
    expect(() => library.bindPort()).toThrow();
});
it('should throw when invalid port is given', () => {
    expect(() => library.bindPort(-1)).toThrow();
});
it('should not throw when valid port is given', () => {
    expect(typeof library.bindPort(12345)).toBe('number');
});