// app.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração para servir arquivos estáticos na pasta "assets"
app.use(express.static(path.join(__dirname, 'assets')));

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
