![](https://i.imgur.com/xG74tOh.png)

# Referendo por localização

## Objetivo

Criar uma API para registrar votos de uma votação por localização.

## Sobre

A ideia é que em uma votação, a API possa verificar se o usuário que está enviando o voto está realmente no país correto da votação antes de registrar o voto.

## API Externa

**IP Geolocation API** da **Abstract API** (https://www.abstractapi.com/ip-geolocation-api) que exige **autenticação**.

## Funcionamento

**Buscando a localização por IP na API externa**

Para encontrar a localização a partir de um IP utilizando a API mencionada acima utiliza-se o seguinte endereço:

```
https://ipgeolocation.abstractapi.com/v1/
```

Passando dois parâmetros do tipo **query**:

-  **api_key**: que deverá receber como valor a chave de teste **58cafbe4558f425d8e8c731e3b26fbe0** para a autenticação
-  **ip_address**: que deverá receber o IP do usuário, por exemplo: **192.168.0.1**

**Obs.:** Em um caso real, o IP seria identificado diretamente da requisição, mas isso só seria possível com uma API exposta na internet. Portanto, para facilitar, o IP do usuário por parâmetro é recebido por parâmetro, assim como o país onde ele se encontra.

Dito isto, a API deverá possuir um único recurso chamado **votacao** que receberá dois parâmetros obrigatórios na rota (path): **pais** e **ip**.

**POST /votacao/:pais/:ip**

Este nosso recurso deverá estar disponível no endereço http://localhost:8800/votacao, deverá receber apenas requisições **POST** e deverá receber dois parâmetros do tipo path (params) obrigatórios:

-  **pais**: deverá receber o nome do país em inglês ("Brazil", com "z", por exemplo) onde está acontecendo o referendo.
-  **ip**: deverá receber o endereço IP do usuário que está enviando o voto.

Além dos parâmetros, deverá também ser enviado no corpo (body) da requisição, um objeto contendo uma propriedade **voto** que deve possuir valor booleano **true** ou **false**, representando respectivamente **sim** ou **nao** para o referendo. Portanto o corpo da nossa requisição deverá seguir o formato:

```json
{
   "voto": true
}
```

O IP recebido deverá ser enviado à API externa. Após receber o retorno da API externa, **caso o IP não seja válido**, deverá ser retornado ao usuário da API um response com **status 400 (Bad Request)** e mensagem apropriada informando que o IP enviado não é válido.

Caso **o retorno** da API externa **seja válido**, deve-se selecionar a propriedade **country** deste retorno e comparar com o valor do parâmetro **pais** informado pelo usuário. Caso sejam iguais, deve-se considerar o voto válido, caso não sejam, deve-se retornar um response com **status 400 (Bad Request)** informando que o IP enviado não coincide com o país da votação.

**Voto Válido**

Após validar o país da localização do endereço IP, deve-se adicionar o voto em um **array** que deverá existir em um arquivo **votos.json** no servidor.

Para adicionar o voto, deve-se criar um objeto que contenha duas propriedades: o **ip** informado pelo usuário e o **voto** (true ou false). Portanto deverá seguir o formato:

```json
{
   "ip": "200.45.187.22",
   "voto": false
}
```

**POST /votacao/:pais/:ip**

Criar uma nova rota GET para que seja possível consultar todos os votos. A função para esta rota deverá ler todo o array do arquivo **votos.json** e retornar no response da requisição.

---

###### tags: `nodeJS` `express` `http` `api` `integracao com api` `api de terceiros` `autenticacao`
