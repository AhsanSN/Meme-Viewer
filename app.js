const electron = require('electron')
const url = require('url')
const path = require('path')

const { app, BrowserWindow } = electron;

let mainWindow;



app.on('ready', function () {

    mainWindow = new BrowserWindow({})
    mainWindow.setMenu(null);
    mainWindow.setTitle("Meme Viewer");
    mainWindow.setSize(800, 600, 1);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/pages/home.html'),
        protocol: 'file:',
        slashes: true
    }));
    console.log(2.2);

    const { ipcMain } = require('electron')
    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log(arg) // prints "ping"
        event.sender.send('asynchronous-reply', 'pong')
        event.returnValue = 'pong'
    })

    console.log("1");

});


