const express = require('express');
const app = express();

let chifres = [];

app.get('/', (req, res) => {
    res.send('Essa é a página inicial')
});

app.get('/chifres', (req, res) => {
    res.json(chifres)
});

app.post('/chifres', (req, res) => {
    const chifre = { codigo, lote, preco, tipo, descricao } = req.body;
    chifres.push(chifre);
    res.status(201).json(chifre)
});

app.put('/chifres/:codigo', (req, res) => {
    const codigo = req.params.codigo;
    const index = chifres.findIndex(c => c.codigo === codigo);
    if fnrijqrj
});

app.listen(3000, (req, res) => {
    console.log('Servidor rodando na porta 3000')
});