// tests/math.test.js

function suma(a, b) {
    return a + b;
  }
  
  test('la suma de 2 + 3 debe ser 5', () => {
    expect(suma(2, 3)).toBe(5);
  });