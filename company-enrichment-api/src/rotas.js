const express = require("express");
const { consultarEmpresa } = require("./controladores/empresas");
const roteadores = express();

roteadores.get("/empresas/:domain", consultarEmpresa);

module.exports = { roteadores };
