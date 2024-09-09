import { esPalindromo } from '../src/palindromo';

describe('esPalindromo', () => {
  test('debe devolver true para frases palíndromas', () => {
    expect(esPalindromo("Ana")).toBe(true);
    expect(esPalindromo("A man a plan a canal Panama")).toBe(true);
    expect(esPalindromo("redivider")).toBe(true);
    expect(esPalindromo("madam")).toBe(true);
  });

  test('debe devolver false para frases no palíndromas', () => {
    expect(esPalindromo("Hola mundo")).toBe(false);
    expect(esPalindromo("Esto no es un palíndromo")).toBe(false);
  });
});