import express from "express";
import { configuration } from "./config.js";
import { operar, suma } from "./calculadora.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hola mundo al usuario ${configuration.username}`);
});

app.get("/operar", (req, res) => {
  const a = parseInt(req.query.a as string);
  const b = parseInt(req.query.b as string);
  const oper = req.query.oper as string;

  try {
      let resultado;     
      resultado = operar(oper, a, b);
      if (oper === 'factorial') {
        res.send(`Factorial solo necesita un dato y se operara solo con el dato ingresado en a. El resultado de la operación ${oper} de ${a} es ${resultado}`);
      } else {
        res.send(`El resultado de la operación ${oper} de ${a} y ${b} es ${resultado}`);
      }
  } catch (error: unknown) {
      res.status(400).send(error instanceof Error ? error.message : "Error desconocido");
  }
});

export default app;