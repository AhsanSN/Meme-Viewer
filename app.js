const electron = require('electron')
const url = require('url')
const path = require('path')

const {app, BrowserWindow} = electron;

let mainWindow;


function launchingMainWindow() {
    mainWindow = new BrowserWindow({})
    mainWindow.setMenu(null);
    mainWindow.setTitle("Meme Viewer");
    mainWindow.setSize(800, 600, 1);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/pages/home.html'),
        protocol: 'file:',
        slashes: true
    }));
}

app.on('ready', function () {
    launchingMainWindow();
    console.log("1");
});


