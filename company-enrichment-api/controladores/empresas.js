const axios = require("axios");
const fs = require("fs/promises");

async function consultarEmpresa(req, res) {
   const dominioEmpresa = req.params.domain;
   const apiKey = "";

   const promessaAxios = axios.get(
      `https://companyenrichment.abstractapi.com/v1/?api_key=${apiKey}&domain=${dominioEmpresa}`
   );

   try {
      const { data } = await promessaAxios;
      if (data.name) {
         const empresas = JSON.parse(
            await fs.readFile("./dados/empresas.json")
         );
         empresas.push(data);

         fs.writeFile("./dados/empresas.json", JSON.stringify(empresas));
      }
      res.json(data);
      return;
   } catch (error) {
      res.status(400).json({ erro: "Domínio inválido" });
      return;
   }
}

module.exports = { consultarEmpresa };
