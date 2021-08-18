const express = require("express");
const { roteadores } = require("./rotas");
const app = express();

app.use(express.json());
app.use(roteadores);

app.listen(8800);
