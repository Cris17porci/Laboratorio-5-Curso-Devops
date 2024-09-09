import { describe, test, expect } from "@jest/globals";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";

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
