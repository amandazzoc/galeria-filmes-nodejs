import express from "express";
import Filme from "../models/Filme.js";
const router = express.Router();
import multer from "multer";
const upload = multer({ dest: "public/uploads/" });

router.get("/", (req, res) => {
  Filme.findAll().then((filmes) => {
    res.render("index", {
      filmes: filmes,
    });
  });
});
// ROTA DE UPLOAD
router.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file.filename;
  const titulo = req.body.titulo;
  const diretor = req.body.diretor;
  const ano = req.body.ano;
  const resumo = req.body.resumo;
  Filme.create({
    file: file,
    titulo: titulo,
    diretor: diretor,
    ano: ano,
    resumo: resumo,
  });
  res.redirect("/");
});

router.get("/delete/:id",(req, res) => {
  const id = req.params.id;
  Filme.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
});

export default router