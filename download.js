const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const cors = require('cors'); // Importe o pacote 'cors'

const app = express();
const downloadsPath = path.join(__dirname, 'src/assets/downloads');

// Configuração do certificado e chave
const privateKey = fs.readFileSync('ssl/localhost_4200.key', 'utf8');
const certificate = fs.readFileSync('ssl/localhost_4200.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Middleware CORS
app.use(cors()); // Habilita CORS para todas as rotas

// Rota para listar músicas
app.get('/api/contents', (req, res) => {
  fs.readdir(downloadsPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory');
    }

    const contents = files.map(file => ({
      name: path.basename(file),
      path: `assets/downloads/${file}`
    }));

    res.json(contents);
  });
});

// Servindo arquivos estáticos
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

// Criando o servidor HTTPS
const httpsServer = https.createServer(credentials, app);

const port = 3000;

// Iniciando o servidor HTTPS
httpsServer.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});
