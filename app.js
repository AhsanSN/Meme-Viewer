const electron = require('electron')
const url = require('url')
const path = require('path')

const { app, BrowserWindow } = electron;

let mainWindow;


function showWindow() {
    mainWindow = new BrowserWindow({})
    mainWindow.setMenu(null);
    mainWindow.setTitle("Meme Viewer");
    mainWindow.setSize(800, 600, 1);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/pages/home.html'),
        protocol: 'file:',
        slashes: true
    }));

    const { ipcMain } = require('electron')
    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log(arg) // prints "ping"
        var d = new Date();
        var n = d.getTime();
        event.sender.send('asynchronous-reply', n)
        event.returnValue = 'pong'
    })


}


app.on('ready', function () {
    showWindow();
});


