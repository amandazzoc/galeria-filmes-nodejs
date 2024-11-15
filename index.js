import express from "express"
import connection from "./config/sequelize-config.js"
import FilmesController from "./controllers/FilmesController.js";
import Filme from "./models/Filme.js"

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')

// Realizando a conexão com o banco de dados
connection.authenticate().then(()=> {
    console.log("Conexão com o banco de dados feita com sucesso!")
}).catch((error) => {
    console.log(error)
})

// Criando o banco de dados se ele não existir
connection.query(`CREATE DATABASE IF NOT EXISTS galeriafilmes;`)
  .then(() => {
    console.log("O banco de dados está criado.");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", FilmesController);

const port = 8080

app.listen(port, (err) => {
    if(err) {
        console.log(`Ocorreu um erro! ${err}`);
    } else {
        console.log(`Servidor rodando em http://localhost:${port}`);
    }
})