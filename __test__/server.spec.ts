import request from "supertest";
import app from "../src/server"; // Asegúrate de que la ruta sea correcta

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