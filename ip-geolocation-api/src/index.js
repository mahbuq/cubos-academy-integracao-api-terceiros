require("dotenv").config({
   path: "../.env",
});

const express = require("express");
const app = express();

const { roteadores } = require("./rotas");

app.use(express.json());

app.use(roteadores);

app.listen(8800);
