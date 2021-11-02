const axios = require("axios");
const fs = require("fs/promises");

async function consultarEmpresa(req, res) {
   const dominioEmpresa = req.params.domain;

   try {
      const promessaAxios = axios.get(
         `https://companyenrichment.abstractapi.com/v1/?api_key=${process.env.API_KEY}&domain=${dominioEmpresa}`
      );

      const { data } = await promessaAxios;

      if (data.name) {
         const empresas = JSON.parse(await fs.readFile("./dados/empresas.json"));
         empresas.push(data);

         fs.writeFile("./dados/empresas.json", JSON.stringify(empresas));
      }

      return res.json(data);
   } catch (error) {
      return res.status(400).json({ erro: error.message });
   }
}

module.exports = { consultarEmpresa };
