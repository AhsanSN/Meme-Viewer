const electron = require('electron')
const url = require('url')
const path = require('path')

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;


function launchingMainWindow() {
    mainWindow.setMenu(null);
    mainWindow.setTitle("Meme Viewer");
    mainWindow.setSize(800, 600, 1);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/pages/home.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.webContents.send('newImg',"asd")

}

app.on('ready', function () {
    mainWindow = new BrowserWindow({})
    launchingMainWindow();
    console.log("1");

});


