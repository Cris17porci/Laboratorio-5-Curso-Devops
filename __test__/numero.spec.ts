import { describe, test, expect } from "@jest/globals";
import { esPrimo } from '../src/numeros';

describe('esPrimo', () => {
  test('debe devolver false para números menores que 2', () => {
    expect(esPrimo(0)).toBe(false);
    expect(esPrimo(1)).toBe(false);
  });

  test('debe devolver true para el número 2', () => {
    expect(esPrimo(2)).toBe(true);
  });

  test('debe devolver true para números primos', () => {
    expect(esPrimo(3)).toBe(true);
    expect(esPrimo(5)).toBe(true);
    expect(esPrimo(7)).toBe(true);
    expect(esPrimo(11)).toBe(true);
  });

  test('debe devolver false para números no primos', () => {
    expect(esPrimo(4)).toBe(false);
    expect(esPrimo(6)).toBe(false);
    expect(esPrimo(8)).toBe(false);
    expect(esPrimo(9)).toBe(false);
    expect(esPrimo(10)).toBe(false);
  });

  test('debe manejar números grandes', () => {
    expect(esPrimo(29)).toBe(true);
    expect(esPrimo(30)).toBe(false);
  });
});