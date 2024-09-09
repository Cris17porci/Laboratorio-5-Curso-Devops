import { esPalindromo } from '../src/palindromo';

describe('esPalindromo', () => {
  test('debe devolver true para frases palíndromas', () => {
    expect(esPalindromo("Ana")).toBe(true);
    expect(esPalindromo("A man a plan a canal Panama")).toBe(true);
    expect(esPalindromo("redivider")).toBe(true);
    expect(esPalindromo("madam")).toBe(true);
    expect(esPalindromo("No lemon, no melon")).toBe(true);
    expect(esPalindromo("Able was I ere I saw Elba")).toBe(true);
  });

  test('debe devolver false para frases no palíndromas', () => {
    expect(esPalindromo("Hola mundo")).toBe(false);
    expect(esPalindromo("Esto no es un palíndromo")).toBe(false);
    expect(esPalindromo("Hello world")).toBe(false);
    expect(esPalindromo("Not a palindrome")).toBe(false);
  });

  test('debe devolver true para frases vacías', () => {
    expect(esPalindromo("")).toBe(true); // Considerar una cadena vacía como palíndromo
  });

  test('debe manejar correctamente las frases con puntuación y espacios', () => {
    expect(esPalindromo("a man a plan a canal panama")).toBe(true); // Ignorar puntuación y espacios
    expect(esPalindromo("was it a car or a cat i saw")).toBe(true); // Ignorar puntuación y espacios
    expect(esPalindromo("no x in nixon")).toBe(true); // Ignorar puntuación y espacios
  });

  test('debe manejar correctamente las diferencias de capitalización', () => {
    expect(esPalindromo("Racecar")).toBe(true); // Considerar mayúsculas y minúsculas iguales
    expect(esPalindromo("MadAm")).toBe(true); // Considerar mayúsculas y minúsculas iguales
  });
});