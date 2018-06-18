const electron = require('electron')
const url = require('url')
const path = require('path')
var fs = require('fs');


const { app, BrowserWindow } = electron;

let mainWindow;

function readFile() {

}

function ipc() {
    var imgNumber = 0;
    var imgArray = [];
    imgArray.push("../images/m1.png");
    imgArray.push("../images/m (1).png");
    imgArray.push("../images/m (2).png");
    imgArray.push("../images/m (3).png");
    imgArray.push("../images/m (4).png");
    imgArray.push("../images/m (5).png");
    imgArray.push("../images/m (6).png");

    const { ipcMain } = require('electron')
    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log(arg) // prints "ping"
        var d = new Date();
        var n = d.getTime();

        event.sender.send('asynchronous-reply', imgArray[imgNumber])
        if (imgNumber+1 == imgArray.length) {
            imgNumber = 0;
        }
        else {
            imgNumber++;
        }
        event.returnValue = 'pong'
    })
}

function showWindow() {
    mainWindow = new BrowserWindow({})
    mainWindow.setMenu(null);
    mainWindow.setTitle("Meme Viewer");
    mainWindow.setSize(800, 600, 1);
    mainWindow.setResizable(false)
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/pages/home.html'),
        protocol: 'file:',
        slashes: true
    }));
    ipc();
}


app.on('ready', function () {
    showWindow();
});


