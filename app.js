const {app, BrowserWindow} = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

function createWindow(){
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800
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
