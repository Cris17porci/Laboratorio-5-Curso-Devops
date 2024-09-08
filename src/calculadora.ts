function operar(operacion: string, a: number, b: number) {
    if (operacion === 'suma') {
        return suma(a, b);
    } else if (operacion === 'resta') {
        return restar(a, b);
    } else if (operacion === 'multiplicacion') {
        return multiplicar(a, b);
    } else if (operacion === 'division') {
        return dividir(a, b);
    } else if (operacion === 'potencia') {
        return potencia(a, b);
    } else if (operacion === 'factorial') {
        return factorial(a);
    } else if (operacion === 'errorDesconocido') {
        throw "Esto no es un Error"; 
    }else {
        throw new Error("Operación no soportada");
    }
}

function suma(a: number, b: number) {
    if (a === undefined || b === undefined) {
        throw new Error("No se puede sumar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    return a + b;
}

function restar(a: number, b: number) {
    if (a === undefined || b === undefined) {
        throw new Error("No se puede restar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    return a - b;
}

function multiplicar(a: number, b: number) {
    if (a === undefined || b === undefined) {
        throw new Error("No se puede multiplicar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    return a * b;
}

function dividir(a: number, b: number) {
    if (a === undefined || b === undefined) {
        throw new Error("No se puede dividir indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    if (b === 0) {
        throw new Error("No se puede dividir por cero");
    }

    return a / b;
}

function potencia(a: number, b: number) {

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }
    if (a === undefined || b === undefined) {
        throw new Error("No se puede calcular la potencia de indefinidos");
        
    }
    if (b === 0) {
        return 1; // cualquier número elevado a 0 es 1
    }

    let resultado = 1;
    for (let i = 0; i < Math.abs(b); i++) {
        resultado *= a;
    }

    // Manejo del exponente negativo
    if (b < 0 ) {
        resultado = 1 / resultado;
    }

    return resultado;
}

function factorial(a: number): number {
    if (a === undefined) {
        throw new Error("No se puede calcular el factorial de indefinidos");
    }

    if (typeof a !== 'number' || a < 0 || !Number.isInteger(a)) {
        throw new Error("El factorial solo está definido para números enteros no negativos");
    }

    if (a === 0 || a === 1) {
        return 1; // El factorial de 0 y 1 es 1
    }

    let resultado = 1;
    for (let i = 2; i <= a; i++) {
        resultado *= i;
    }

    return resultado;
}

export { suma, operar, restar, multiplicar, dividir, potencia, factorial };