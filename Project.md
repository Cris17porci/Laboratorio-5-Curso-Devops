# Proyecto: Calculadora

## Descripción del Proyecto

Este proyecto consiste en una calculadora que implementa las siguientes funciones básicas:

- **Suma**: Realiza la adición de dos números.
- **Resta**: Realiza la sustracción de un número de otro.
- **Operar**: Ejecuta operaciones aritméticas combinadas.

El proyecto está estructurado en varios archivos clave:

- **`index.js`**: Archivo principal que inicia la aplicación.
- **`server.js`**: Contiene los endpoints de la calculadora.
- **`config.js`**: Archivo de configuración para ajustes y variables globales.

Cada función tiene sus respectivos tests desarrollados con **Jest**, asegurando que las operaciones de la calculadora funcionen correctamente.

## Guía para Ejecutar Tests y Ver la Cobertura de Código

Para ejecutar los tests con **Jest**, sigue los siguientes pasos:

1. **Instala las dependencias** del proyecto si aún no lo has hecho:
    ```bash
    npm install
    ```

2. **Ejecuta los tests** utilizando el comando:
    ```bash
    npm test
    ```

3. **Genera un informe de cobertura de código** con:
    ```bash
    npm run test:coverage
    ```

   Esto creará un informe detallado sobre la cobertura de código, indicándote qué partes del código están bien cubiertas por los tests y cuáles podrían necesitar más pruebas.

## Próximos Pasos

Actualmente, se están desarrollando los siguientes archivos para su próxima integración en un servidor de integración continua:

- **Dockerfile**: Archivo para crear una imagen Docker de la aplicación.
- **Jenkinsfile**: Archivo para definir el pipeline de CI/CD en Jenkins.

Estos archivos serán subidos próximamente, alineándose con el desarrollo del curso.

---

Mantente atento para futuras actualizaciones y mejoras del proyecto.
