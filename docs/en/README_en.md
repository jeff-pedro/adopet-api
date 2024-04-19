<div align="center">

  # Adopet API

  > RESTful API for an imaginary pet adoption company named "Adopet".

  <a>English</a> -
  <a href="../../README.md">Portuguese</a>

</div>

<div align="center" >
  <img src="https://img.shields.io/github/v/release/jeff-pedro/api-adopet?display_name=tag&include_prereleases&style=for-the-badge">
  <img src="https://img.shields.io/badge/node-v20.12.2-blueviolet?style=for-the-badge&logo=node.js)](https://nodejs.org/download/">
  <a href='https://eslint.org/' target='_blank'><img src="https://img.shields.io/badge/Code Style-eslint-ff69b4.svg?style=for-the-badge&logo=eslint">
  <a href='https://prettier.io/' target='_blank'><img src="https://img.shields.io/badge/Code Formatter-prettier-blue?style=for-the-badge&?style=flat-square&logo=prettier">
</div>

---

## 🤖 Technologies
</div>
<div align="center">
  <a href='https://nodejs.org/' target='_blank'><img src="https://img.shields.io/badge/Node.js-white?style=for-the-badge&logo=node.js&logoColor=green">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <a href='https://expressjs.com/' target='_blank'><img src="https://img.shields.io/badge/Express-1572B6?style=for-the-badge&logo=express&logoColor=white">
  <a href='https://jwt.io/' target='_blank'><img src="https://img.shields.io/badge/JWT-61B?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/></a>
  <a href='https://www.postgresql.org/' target='_blank'><img src="https://img.shields.io/badge/PostgreSQL-F6F5F2?style=for-the-badge&logo=postgresql&logoColor=blue"/></a>
  <a href='https://sequelize.org/' target='_blank'><img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white"/></a>
  <a href='https://jestjs.io/' target='_blank'><img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/></a>
  <a href='https://www.docker.com/' target='_blank'><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/></a>
  <a href='https://render.com/' target='_blank'><img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white"/></a>
  <a href='https://nodemon.io/' target='_blank'><img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white"/></a>
  <a href='https://docs.github.com/en/actions' target='_blank'><img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"/></a>
</div>

## 📋 Requirements
- Node.js and NPM
- [Postgres](https://www.postgresql.org/) database
- [Docker](https://www.docker.com/) and [docker compose](https://docs.docker.com/compose/)

## ⚙️ API

🧩 [adopet.api.sapituca.site](http://adopet.api.sapituca.site/)

🗂 [Documentation](https://documenter.getpostman.com/view/22093498/2sA35MxyP2)


## Usage

Clone repository
```bash
git clone [repositório]
```

Go to API directory
```bash
cd adopet-api/
```

🏗️ **Building and running the application**

Start the API and database
```bash
docker compose up --build -d
```

Run migrations to the database
```bash
docker compose run api npx sequelize-cli db:migrate
```

> The API will be available at http://localhost:9000.

💣 **Testing the API**... 🤞🏽

Build test database
```bash
docker compose run api npx sequelize-cli db:create --env test
```

Run migrations to the test database
```bash
docker compose run api npx sequelize-cli db:migrate --env test
```

Run all tests
```bash
docker compose run api npm run test
```

Run integration tests
```bash
docker compose run api npm run test:integration
```

📦 **Building Image**
Build image by running: 
```shell
docker build -t adopet-api:latest .
```


## ♾️ CI/CD

**Github Actions** was chosen as a tool for CI development due to its simplicity in building workflows, because it is integrated with the application repository and for didactic reasons to explore the tool.

The choice of **[Render](https://render.com/)** as the API and Database deployment platform was due to its simplicity in carrying out deployments and the free plan that covers databases * *Postgres**, 
 builds **Node.j Web Services** , in addition to supporting Continuos Deployment by performing **automatic deployments** integrated with **Github** branches.

### 🧪 **Build and Tests**
Workflows are performed to test the application, build a **Docker** image and register it on **Docker Hub** at the moment the repository receives a **Pull Request** for the `main` branch.

### 🚀️ **Deploy**
The Database and API are built using **Render** services, always providing the most recent version of the application when performing automatic deployments based on the `main` branch of this repository.

## 📚 References
- [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)
- [Custom Domains | Render Docs](https://docs.render.com/custom-domains#configuring-dns-to-point-to-render)
- [Configuring Namecheap DNS | Render Docs](https://docs.render.com/configure-namecheap-dns)
