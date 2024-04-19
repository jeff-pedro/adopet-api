<div align="center">

  # Adopet API

  > RESTful API for an imaginary pet adoption company named "Adopet".

  <a>English</a> -
  <a href="../../README.md">Portuguese</a>

</div>

<div align="center" >

  ![Release](https://img.shields.io/github/v/release/jeff-pedro/api-adopet?display_name=tag&style=flat-square)
  [![Node Version](https://img.shields.io/badge/node-v20.12.2-blueviolet?style=flat-square&logo=node.js)](https://nodejs.org/download/)
  [![Code Style](https://img.shields.io/badge/code_style-eslint-ff69b4.svg?style=flat-square&logo=eslint)](https://eslint.org/)
  [![Code Formatter](https://img.shields.io/badge/code%20formatter-prettier-blue?style=flat-square&logo=prettier)](https://prettier.io/)


</div>

---

## 🤖 Technologies
- **Back-End**: Node.js RESTful API
- **Database**: Postgres
- **ORM**: Sequelize
- **Express** as a framework for building web applications

## 📋 Requirements
1. Node.js and NPM
2. Postgres database
3. Docker and docker compose


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
