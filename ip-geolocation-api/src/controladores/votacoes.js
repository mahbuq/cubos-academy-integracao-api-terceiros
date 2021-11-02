const axios = require("axios");
const fs = require("fs/promises");

async function verificarVoto(req, res) {
   const ip = req.params.id;
   const paisVotacao = req.params.pais;

   const promessaAxios = axios.get(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.API_KEY}&ip_address=${ip}`
   );

   try {
      const { data } = await promessaAxios;

      if (data.country !== paisVotacao) {
         res.status(400).json({
            erro: "IP enviado não pertence ao país de votação.",
         });
         return;
      } else {
         const votos = JSON.parse(await fs.readFile("./dados/votos.json"));

         votos.push({ ip: ip, voto: req.body.voto });

         fs.writeFile("./dados/votos.json", JSON.stringify(votos));

         res.json({ mensagem: "Voto adicionado com sucesso" });
         return;
      }
   } catch (error) {
      res.status(400).json({
         erro: `Endereço IP inválido`,
      });
      return;
   }
}

async function getTodosVotos(req, res) {
   const votos = JSON.parse(await fs.readFile("./dados/votos.json"));
   res.json(votos);
}

module.exports = { verificarVoto, getTodosVotos };
