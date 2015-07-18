jest.dontMock('../multiply');

describe('multiply', function() {
  it('multiply 2 * 3 to equal 6', function() {
    const multiply = require('../multiply');
    expect(multiply(2, 3)).toBe(6);
  });
});
