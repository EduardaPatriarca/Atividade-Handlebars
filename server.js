const express = require('express');
const exphbs =require('express-handlebars');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express,urlencoded({ extended: true}));

app.engine('handlebars', exphbs.engine({ defaultLayout: false}));
app.set('view engine', 'handlebars');

Let pessoas = [
	{ id: 1, nome: "Pessoa 1" },
	{ id: 2, nome: "Pessoa 2" },
	{ id: 3, nome: "Pessoa 3" }
];

/*Página Principal*/
app.get('/', (req, res) => res.render('home'));

/*Listar pessoas*/
app.get('/pessoas', (req, res) => {
	res.render('ListarPessoas', { pessoas })
});

/*Cadastrar Pessoas*/
app.get("/pessoas/novas", (req, res) => res.render('cadastrarPessoa'));

app.post('/pessoas', (req, res) => {
	const { nome } = req.body;
	const novaPessoa = { id: pessoas.length + 1, nome };
	pessoas.push(novaPessoa);
	res.render('listarPessoas', { pessoas })
});

/*Detalhar Pessoas*/
app.get('/pessoas/ver/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const pessoa = pessoas.find(p => p.id === id);
	if (!pessoa) return res.status(404).send('Pessoa não encontrada');
	res.render('detalharPessoa', { pessoa })
});

/*Editar Pessoa*/
app.get('/pessoas/:id/editar', (req, res) => {
	const id = parseInt(req.params.id);
	const pessoa = pessoas.find(p => p.id === id);
	if (!pessoa) return res.status(404).send('Pessoa não encontrada');

	res.render('editarPessoa', { pessoa })
});

app.post('/pessoas/:id/editar/', (req, res) => {
	const id = parseInt(req.params.id);
	const pessoa = pessoas.find(p => p.id === id);
	if (!pessoa) return res.status(404).send('Pessoa não encontrada');
	
	pessoa.nome = req.body.nome;
	res.render('listarPessoas', { pessoas })
});

/*Excluir Pessoa*/
app.post('/pessoas/exluir/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = pessoas.findIndex(p => p.id === id);

	if (index === -1) return res.status(404).send('Pessoa não encontrada');

	pessoas.splice(index, 1);
	res.redirect('/pessoas')
});

/*Listen*/
app.listen(port, () => {
	console.log(`Servidor em execução: https//localhost:${port}`)
});