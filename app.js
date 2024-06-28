const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require("path");
const fs = require('fs');

let mainWindow

function createWindow(){
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  const startUrl = path.join(__dirname, 'dist', 'multimedia-front', 'browser', 'index.html');
  mainWindow.loadFile(startUrl);

  mainWindow.on('closed', function () {
    mainWindow = null;
  })

}

app.whenReady().then(() =>{
  createWindow()
})


ipcMain.on('save-file', (event, { arrayBuffer, filename, userId }) => {
  const userDocumentsPath = path.join(__dirname, 'src', 'assets', 'downloads', userId); // Obtém a pasta de downloads do usuário
  const baseFilename = path.basename(filename);
  const downloadPath = path.join(userDocumentsPath, baseFilename); // Caminho completo para o arquivo de download

  const dirPath = path.dirname(downloadPath);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  let buffer = Buffer.from(arrayBuffer);
  console.log('Buffer created:', buffer);

  fs.writeFile(downloadPath, buffer, (err) =>{
    if(err){
      console.error('Erro ao salvar o arquivo:', err);
      dialog.showErrorBox('Erro ao salvar arquivo', `Ocorreu um erro ao salvar o arquivo: ${err.message}`);
      event.reply("save-file-response", {success: false, error: err.message})
    } else {
      event.reply("save-file-response", {success: true, downloadPath})
    }
  })

});
