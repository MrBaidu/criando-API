const express = require('express');
const app = express();
const porta = 3000; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let clientes = [
    {
        id: 1,
        nome: 'João',
        telefone: '9999-9999',
    },
    {
        id: 2,
        nome: 'Maria',
        telefone: '8888-8888',
    },
    {
        id: 3,
        nome: 'Pedro',
        telefone: '7777-7777',
    }
];

app.get('/', (req, res) => 
{
    res.json(clientes);
});

app.post('/cadastraCliente', (req, res) => {
    const nome = req.body.nome;
    const telefone = req.body.telefone;

    let cliente = {
        nome: nome,
        telefone: telefone
    };

    clientes.push(cliente);

    console.log(`cadastrado: ${nome} - ${telefone}`);
    res.status(201).json({mensagem: `Cliente ${nome} cadastrado`});
    if (!nome) 
    { 
        res.status(422).json({mensagem: 'Campo nome é obrigatório'}); 
        return;
    } 
});

app.delete('/deletaCliente/:id', (req, res) => 
{
    const id = req.params.id;
    const cliente = clientes.find(c => c.id == id);
    if (!cliente)
    {
        res.status(404).json({mensagem: 'Cliente não encontrado'});
        return;
    }
    clientes = clientes.filter(c => c.id != id);
    res.status(200).json({mensagem: `Cliente ${cliente.nome} deletado`});
});

app.listen(porta, () => 
    {
        console.log(`Rodando na porta ${porta}`)
    }); 