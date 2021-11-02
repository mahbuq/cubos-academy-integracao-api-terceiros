const express = require("express");
const { verificarVoto, getTodosVotos } = require("./controladores/votacoes");

const roteadores = express();

roteadores.post("/votacoes/:pais/:id", verificarVoto);
roteadores.get("/votacoes", getTodosVotos);

module.exports = { roteadores };
