# Letsbook

API para gerenciamento de reservas e hóspedes de hotéis, utilizando Express.js e MongoDB.


## Instalação

A API precisa de  [Node.js](https://nodejs.org/) para rodar, bem como um banco local [MongoDB](https://www.mongodb.com/).

Para instalar as dependências, basta rodar um dos seguiuntes comandos:

```sh
yarn install
npm install
```

## Configuração
O projeto possui um arquivo .env.example, que serve de base para o setup de ambiente e banco de dados. Para que o banco rode como esperado sem alterações no código, seu valor no arquivo .env a ser criado deve ser no seguinte formato: mongodb://localhost:27017/<DB>

## Requests
O projeto possui um arquivo .json com uma collection do postman, contendo todos os endpoints da aplicação. Os endpoints que buscam todos os hóspedes e todas as reservas podem ser filtrados por campo(incluindo valores com modificadores [gte|gt|lte|lt]), limitados, paginados e ordenados.

### Produção
Para rodar o ambiente de produção, basta rodar um dos comandos:

```sh
yarn start:prod
npm run start:prod
```

### Desenvolvimento
Para rodar o ambiente de desenvolvimento, basta rodar um dos comandos:

```sh
yarn start:dev
npm run start:dev
```

### Testes
Para rodar os testes, basta rodar um dos comandos:

```sh
yarn test
npm run test
```

### Debug
Caso necessário, o projeto possui instalado o ndb, que pode ser rodado em conjunção com qualquer dos comandos listados acima. Possui também seu próprio script, rodando no ambiente definido no arquivo .env:

```sh
yarn debug
npm run debug
```

## Documentação
A API está documentada com [Swagger](https://swagger.io/), para acessar a documentação, deve-se acessar a porta na qual o projeto estiver rodando através do navegador, no endpoint /doc.
Ex: http://localhost:8080/doc
