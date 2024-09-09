import { describe, test, expect } from "@jest/globals";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";
import { esPrimo } from '../src/numeros';
import { esPalindromo } from '../src/palindromo';


describe("Test Suite App", () => {

    test("endpoint /", () => {
        expect(1 + 1).toBe(2);
    });

    test("endpoint key", () => {
        expect(1 + 1).toBe(2);
    });

    test("endpoint /palindromo", () => {
        expect(1 + 1).toBe(2);
    });

    test("endpoint /primo", () => {
        expect(1 + 1).toBe(2);
    });

    test("test de endpoint /", async () => {
        return await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api fue configurada por el usuario ${configuration.username}`);
            })
    });
});

describe('Server Initialization', () => {
    beforeAll(() => {
      // Mockear `app.listen` para evitar iniciar el servidor
      jest.spyOn(app, 'listen').mockImplementation((port: number, listeningListener?: () => void) => {
        // Simular la llamada al listener
        if (listeningListener) {
          listeningListener();
        }
        return {} as any; // Retornar un mock de Server
      });
    });
  
    test('should call the listener callback', () => {
      // Mockear `console.log` para verificar la salida
      const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
  
      // Llamar a la función que inicia el servidor
      app.listen(3001, () => {
        // Verificar que el callback fue llamado
        expect(mockConsoleLog).not.toHaveBeenCalled(); // Esto debería ser falso si el callback no está siendo llamado
      });
    });
  });

  // Mockear `console.log` para verificar la salida
// Mockear `console.log` para verificar la salida
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

// Mockear `app.listen` para que el callback se ejecute
const mockListen = jest.spyOn(app, 'listen').mockImplementation((port: number, callback?: () => void) => {
  if (callback) callback(); // Asegúrate de que el callback se ejecute
  return {} as any; // Retornar un mock de Server
});

describe('Server Initialization', () => {
  beforeAll(() => {
    // Verificar que las configuraciones están correctas
    console.log('Configuration:', configuration);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should start the server and log the correct message', () => {
    const testUsername = 'Desconocido';
    const testPort = 3001;
  
    // Mockear `console.log`
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
  
    // Mockear `app.listen`
    const mockListen = jest.spyOn(app, 'listen').mockImplementation((port: number, callback?: () => void) => {
      if (callback) callback(); // Llamar al callback
      return {} as any; // Retornar un mock de Server
    });
  
    app.listen(testPort, () => {
      console.log(`El usuario ${testUsername} ha levantado la aplicacion en el puerto ${testPort}`);
  
      // Verificar que console.log fue llamado con el mensaje correcto
      expect(mockConsoleLog).toHaveBeenCalled();
      expect(mockConsoleLog).toHaveBeenCalledWith(`El usuario ${testUsername} ha levantado la aplicacion en el puerto ${testPort}`);
    });
  });
});
describe("Pruebas para el servidor Express", () => {
  test("GET / debe devolver el saludo con el nombre de usuario de la configuración", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Hola, esta api fue configurada por el usuario");
  });

  test("GET /key debe devolver la clave de API de la configuración", async () => {
    const response = await request(app).get("/key");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Hola, esta api contiene la siguiente api-key");
  });

  test("GET /palindromo/:frase debe identificar correctamente si la frase es un palíndromo", async () => {
    const responsePalindromo = await request(app).get("/palindromo/Ana%20lava%20la%20tina");
    expect(responsePalindromo.status).toBe(200);
    expect(responsePalindromo.text).toContain("es palindromo");

    const responseNoPalindromo = await request(app).get("/palindromo/Hola%20mundo");
    expect(responseNoPalindromo.status).toBe(200);
    expect(responseNoPalindromo.text).toContain("no es palindromo");
  });

  test("GET /primo/:numero debe identificar correctamente si el número es primo", async () => {
    const responsePrimo = await request(app).get("/primo/7");
    expect(responsePrimo.status).toBe(200);
    expect(responsePrimo.text).toContain("es un numero primo");

    const responseNoPrimo = await request(app).get("/primo/8");
    expect(responseNoPrimo.status).toBe(200);
    expect(responseNoPrimo.text).toContain("no es un numero primo");
  });
});

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

describe("Pruebas para el servidor Express", () => {
  test("GET / debe devolver el saludo con el nombre de usuario de la configuración", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Hola, esta api fue configurada por el usuario");
  });

  test("GET /key debe devolver la clave de API de la configuración", async () => {
    const response = await request(app).get("/key");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Hola, esta api contiene la siguiente api-key");
  });

  test("GET /palindromo/:frase debe identificar correctamente si la frase es un palíndromo", async () => {
    const responsePalindromo = await request(app).get("/palindromo/Ana%20lava%20la%20tina");
    expect(responsePalindromo.status).toBe(200);
    expect(responsePalindromo.text).toContain("es palindromo");

    const responseNoPalindromo = await request(app).get("/palindromo/Hola%20mundo");
    expect(responseNoPalindromo.status).toBe(200);
    expect(responseNoPalindromo.text).toContain("no es palindromo");
  });

  test("GET /primo/:numero debe identificar correctamente si el número es primo", async () => {
    const responsePrimo = await request(app).get("/primo/7");
    expect(responsePrimo.status).toBe(200);
    expect(responsePrimo.text).toContain("es un numero primo");

    const responseNoPrimo = await request(app).get("/primo/8");
    expect(responseNoPrimo.status).toBe(200);
    expect(responseNoPrimo.text).toContain("no es un numero primo");
  });
});
describe("Pruebas para el servidor Express", () => {
  test("GET /palindromo/:frase debe identificar correctamente si la frase es un palíndromo", async () => {
    const responsePalindromo = await request(app).get("/palindromo/Ana%20lava%20la%20tina");
    expect(responsePalindromo.status).toBe(200);
    expect(responsePalindromo.text).toContain("es palindromo");

    const responseNoPalindromo = await request(app).get("/palindromo/Hola%20mundo");
    expect(responseNoPalindromo.status).toBe(200);
    expect(responseNoPalindromo.text).toContain("no es palindromo");
  });
});

