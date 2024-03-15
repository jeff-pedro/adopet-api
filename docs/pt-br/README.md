<div align="center">

  # Adopet API

  > API RESTful para uma empresa fictícia de adoção de animais, desenvolvido para um Challenge Back-End.

  <a>Potuguese</a> -
  <a href="./en/README_en.md">English</a>

</div>

<div align="center" >

  ![Release](https://img.shields.io/github/v/release/jeff-pedro/api-adopet?display_name=tag&include_prereleases&style=flat-square)
  [![Node Version](https://img.shields.io/badge/node-v18.14.1-blueviolet)](https://nodejs.org/download/)
  ![JavaScript Language Usage](https://img.shields.io/github/languages/top/jeff-pedro/api-adopet?style=flat-square)
  [![Code Style](https://img.shields.io/badge/code_style-eslint-ff69b4.svg?style=flat-square)](https://eslint.org/)

</div>

---

## Sobre

Adopet é uma empresa que conecta pessoas que querem adotar um pet com abrigos ou ONGs que tem estes animais disponíveis.


## Tecnologias usadas
- **Back-End**: API RESTful em NodeJS
- **Banco de Dados**: MySQL
- **ORM**: Sequelize
- **Express** como framework para construção de Aplicações Web
- **Express-session** para dar suporte a sessões de login à aplicação
- **Redis** para armazenar as sessões de login


## Usando
### Requisitos
1. [Necessário uma instância do bando de dados MySQL](docs/tutorials/docker.md)
2. [Necessário uma instância do Redis](docs/tutorials/redis.md)
3. Clonar o repositório 
4. Seguir para o diretório de execução da API em `./api`
```bash 
cd ./api 
```

### Preparando o bando de dados
1. Configurar parâmetros do banco de dados em `./scr/config/database.json`
2. Inicializar o **Sequelize**
```bash
npx sequelize init
```
3. Criar o bando de dados
```bash
npx sequelize db:create
```
4. Realizar a migração das tabelas
```bash
npx sequelize db:migrate
```
5. Carrega os seeds / dados fakes
```bash
npx sequelize db:seed:all
```


## Documentação
- [em breve]
