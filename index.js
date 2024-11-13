import express from "express"

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.render("index")
})

const port = 8080

app.listen(port, (err) => {
    if(err) {
        console.log(`Ocorreu um erro! ${err}`);
    } else {
        console.log(`Servidor rodando em http://localhost:${port}`);
    }
})