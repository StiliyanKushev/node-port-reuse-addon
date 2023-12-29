const library = require('node-port-reuse-addon');

it('should load without errors', () => {
    expect(library).toBeTruthy();
});
it('should include exported functionality', () => {
    expect(library.bindPort).toBeTruthy();
});