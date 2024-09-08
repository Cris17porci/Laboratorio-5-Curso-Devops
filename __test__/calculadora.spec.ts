import { describe, test, expect } from "@jest/globals";
import { suma, operar, restar , dividir, multiplicar, factorial, potencia } from "../src/calculadora.js";
import app from "../src/server.js";
import request from "supertest";

describe("Calculadora", () => {

    test("sumar dos numeros", () => {

        let a: any = 100;
        let b: any = 200;
        expect(suma(a, b)).toBe(300);

        a = 10;
        b = "a";
        expect(suma(a, b)).toBeNaN();

        a = undefined;
        b = 1;
        expect(() => { suma(a, b) }).toThrow("No se puede sumar indefinidos");

    });

    test("restar dos numeros", () => {

        let a: any = 100;
        let b: any = 200;
        expect(restar(b, a)).toBe(100);

        a = 10;
        b = "a";
        expect(restar(a, b)).toBeNaN();

        a = undefined;
        b = 1;
        expect(() => { restar(a, b) }).toThrow("No se puede restar indefinidos");
    });

    test("multiplicar dos numeros", () => {
        let a: any = 10;
        let b: any = 20;
        expect(multiplicar(a, b)).toBe(200);

        a = 10;
        b = "b";
        expect(multiplicar(a, b)).toBeNaN();

        a = undefined;
        b = 5;
        expect(() => { multiplicar(a, b) }).toThrow("No se puede multiplicar indefinidos");
    });

    test("dividir dos numeros", () => {
        let a: any = 10;
        let b: any = 2;
        expect(dividir(a, b)).toBe(5);

        a = 10;
        b = 0;
        expect(() => { dividir(a, b) }).toThrow("No se puede dividir por cero");

        a = 10;
        b = "b";
        expect(dividir(a, b)).toBeNaN();

        a = undefined;
        b = 2;
        expect(() => { dividir(a, b) }).toThrow("No se puede dividir indefinidos");
    });

    test("potencia de dos numeros", () => {
        let a: any = 2;
        let b: any = 3;
        expect(potencia(a, b)).toBe(8);

        a = 2;
        b = -3;
        expect(potencia(a, b)).toBe(0.125);

        a = 2;
        b = "b";
        expect(potencia(a, b)).toBeNaN();

       
    });

    test("factorial con un número", () => {
        let a: any = 5;
        expect(factorial(a)).toBe(120);

        a = 0;
        expect(factorial(a)).toBe(1);

        a = -1;
        expect(() => { factorial(a) }).toThrow("El factorial solo está definido para números enteros no negativos");

        a = "f";
        expect(() => { factorial(a) }).toThrow("El factorial solo está definido para números enteros no negativos");

        a = undefined;
        expect(() => { factorial(a) }).toThrow("No se puede calcular el factorial de indefinidos");
    });
    
    test("operar dos numeros", () => {

        let a: any = 100;
        let b: any = 200;
        expect(operar("suma", a, b)).toBe(300);
        expect(operar("resta", b, a)).toBe(100);
        expect(operar("multiplicacion", a, b)).toBe(20000);
        expect(operar("division", b, a)).toBe(2);
        expect(operar("potencia", a, 2)).toBe(10000);
        expect(operar("potencia", a, 0)).toBe(1);
        expect(operar('factorial', 5, 0)).toBe(120); // 5! = 120
        expect(operar('factorial', 0, 0)).toBe(1); // 0! = 1
        expect(() => { operar('factorial', -1, 0) }).toThrow('El factorial solo está definido para números enteros no negativo');

        a = 10;
        b = "a";
        expect(operar("suma", a, b)).toBeNaN();
        expect(operar("resta", a, b)).toBeNaN();
        expect(operar("multiplicacion", a, b)).toBeNaN();
        expect(operar("division", a, b)).toBeNaN();
        expect(operar("potencia", a, b)).toBeNaN();


        a = undefined;
        b = 1;
        expect(() => { operar("suma", a, b) }).toThrow("No se puede sumar indefinidos");
        expect(() => { operar("resta", a, b) }).toThrow("No se puede restar indefinidos");
        expect(() => { operar("multiplicacion", a, b) }).toThrow("No se puede multiplicar indefinidos");
        expect(() => { operar("division", a, b) }).toThrow("No se puede dividir indefinidos");
  
        expect(() => { operar('sumaInvalida', 10, 5) }).toThrow("Operación no soportada");
        expect(() => { operar('operacionDesconocida', 10, 5) }).toThrow("Operación no soportada");
        expect(() => { operar('', 10, 5) }).toThrow("Operación no soportada");
        expect(() => { operar(' ', 10, 5) }).toThrow("Operación no soportada");
    });


    test("test de endpoint /", async () => {
        return await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola mundo al usuario cmd");
            })
    });

    test("test de endpoint operar", async () => {
        return await request(app)
            .get("/operar?a=30&b=30&oper=suma")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("El resultado de la operación suma de 30 y 30 es 60");
            })
    });
    test('Factorial solo necesita un dato', async () => {
        const response = await request(app).get('/operar?oper=factorial&a=5');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Factorial solo necesita un dato y se operara solo con el dato ingresado en a. El resultado de la operación factorial de 5 es 120');
    });

    test('Manejo de errores en /operar', async () => {
        const response = await request(app).get('/operar?oper=operacionNoSoportada&a=5&b=2');
        expect(response.status).toBe(400);
        expect(response.text).toBe("Operación no soportada");
    });
    test('Manejo de error desconocido', async () => {
        const response = await request(app).get('/operar?oper=errorDesconocido&a=5');
        expect(response.status).toBe(400);
        expect(response.text).toBe("Error desconocido");
    });

});