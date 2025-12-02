const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const db = ('.config/database');
const Pessoa = require('.models/pessoa.model');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.engine('handlebars', exphbs.engine({ defaultLayout: false}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}))

/*Página Principal*/
app.get('/', (req, res) => res.render('home'));

/*Listar pessoas*/
app.get('/pessoas', async (req, res) => {
	try{
		let pessoas = await Pessoa.findAll({raw: true});

		res.render('ListarPessoas', { pessoas });
	}catch(e){
		console.log(e.message);
		res.status(500).send('Erro ao buscar pessoas')
	};
});

/*Cadastrar Pessoas*/
app.get("/pessoas/novas", (req, res) => res.render('cadastrarPessoa'));

app.post('/pessoas', async (req, res) => {
	try{
		await Pessoa.create({ nome: req.body.nome });

		res.redirect('/pessoas');
	}catch(e){
		console.log(e.message);
		res.status(500).send('Erro ao cadastrar pessoa')
	};
});

/*Detalhar Pessoas*/
app.get('/pessoas/ver/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const pessoa = pessoas.find(p => p.id === id);
	if (!pessoa) return res.status(404).send('Pessoa não encontrada');
	res.render('detalharPessoa', { pessoa })
});

/*Editar Pessoa*/
app.get('/pessoas/:id/editar', async (req, res) => {
	try{
		let pessoa = await Pessoa.findByPk(req.body.id, {raw: true});

		res.render('editarPessoa', { pessoa })
	}catch(e){
		console.log(e.message);
		res.status(500).send('Erro ao buscar pessoa')
	};
});

app.post('/pessoas/:id/editar/', async (req, res) => {
	try{
		let pessoa = await Pessoa.findByPk(req.params.id);
		
		pessoa.nome = req.body.nome;
		await pessoa.save();

		res.redirect('/pessoas')
	}catch(e){
		console.log(e.message);
		res.status(500).send('Erro ao buscar pessoa')
	};
});

/*Excluir Pessoa*/
app.post('/pessoas/exluir/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = pessoas.findIndex(p => p.id === id);

	if (index === -1) return res.status(404).send('Pessoa não encontrada');

	pessoas.splice(index, 1);
	res.redirect('/pessoas')
});

//adição do dia 26/11
db.sync({force: true}
	.then ( () => {
		console.log('Banco de dados sincronizado')
	}))
	.catch(erro => {
		console.log('erro ao conectar com o banco de dados' + erro.message)
	});

/*Listen*/
app.listen(port, () => {
	console.log(`Servidor em execução: https//localhost:${port}`)
});