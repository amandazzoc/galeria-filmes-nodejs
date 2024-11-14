import express from "express"
import multer from "multer"
import connection from "./config/sequelize-config.js"
import Filme from "./models/Filme.js"

const app = express()
const upload = multer({ dest: "public/uploads/" });

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


app.get("/", (req, res) => {
  Filme.findAll().then((filmes) => {
    res.render("index", {
      filmes: filmes,
    });
  });
});
// ROTA DE UPLOAD
app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file.filename
    const titulo = req.body.titulo
    const diretor = req.body.diretor;
    const ano = req.body.ano;
    const resumo = req.body.resumo;
    Filme.create({
      file: file,
      titulo:titulo,
      diretor:diretor,
      ano:ano,
      resumo: resumo
    });
    res.redirect("/")
})



const port = 8080

app.listen(port, (err) => {
    if(err) {
        console.log(`Ocorreu um erro! ${err}`);
    } else {
        console.log(`Servidor rodando em http://localhost:${port}`);
    }
})