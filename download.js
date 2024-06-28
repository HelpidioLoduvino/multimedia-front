const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const cors = require('cors');

const app = express();
const privateKey = fs.readFileSync('ssl/localhost_4200.key', 'utf8');
const certificate = fs.readFileSync('ssl/localhost_4200.crt', 'utf8');
const downloadsPath = path.join(__dirname, 'src/assets/downloads');
const credentials = { key: privateKey, cert: certificate };


app.use(cors());

app.get('/api/contents/:userId', (req, res) => {
  const userId = req.params.userId;
  const userDownloadsPath = path.join(downloadsPath, userId);

  fs.readdir(userDownloadsPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory');
    }

    const contents = files.map(file => ({
      name: path.basename(file),
      path: `assets/downloads/${userId}/${file}`
    }));

    res.json(contents);
  });
});


app.use('/assets', express.static(path.join(__dirname, 'src/assets')));


const httpsServer = https.createServer(credentials, app);

const port = 3000;


httpsServer.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});
