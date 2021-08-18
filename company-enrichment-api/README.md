![](https://i.imgur.com/xG74tOh.png)

# Coletando dados de empresas

## Objetivo

Criar uma API para descobrir e guardar dados de empresas como ano de fundação, ramo, número de funcionários, cidade, país e etc.

## API Externa

**Company Enrichment API** do site **Abstract API** (https://www.abstractapi.com/api/company-enrichment)

## Funcionamento

API autentica e consulta os dados na API externa a partir do domínio requisitado e ao conseguir um resultado da API externa, guarda em um array em arquivo **JSON** chamado **empresas.json**.

Sobre as requisições:

**GET /empresas**

API deverá possuir apenas 1 recurso **empresas** que deverá ser acessado através do endereço http://localhost:8800/empresas.
Este recurso receberá apenas requisições GET e deverá possuir um parâmetro obrigatório na rota (path) chamado **dominioEmpresa**.

Ao receber o domínio da empresa pelo parâmetro, deve-se enviá-lo à API externa para consultar os dados da empresa.
O endereço da API externa que será utilizado é:

```
https://companyenrichment.abstractapi.com/v1/
```

No qual será acrescentado dois parâmetros query:

-  **api_key**: utilizada para a autenticação e deverá possuir como valor a seguinte chave de teste: **34a8499969c4401daf6a685935323c1d**
-  **domain**: onde deveremos enviar o domínio da empresa que recebemos no parâmetro da nossa API.

Deverá ser guardado o que for encontrado no array do arquivo **empresas.json**. Mas para isso, existe uma regra:

-  Guardar apenas os resultados cujo nome da empresa (propriedade **name** do objeto retornado) venha preenchido corretamente (não venha com null ou undefined).

E independente de como o dado seja retornado da API externa, sempre deverá ser retornado o exato mesmo objeto no response da API.

---

###### tags: `nodeJS` `express` `http` `api` `integracao com api` `api de terceiros` `autenticacao`
