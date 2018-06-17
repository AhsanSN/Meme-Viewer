const electron = require('electron')
const url = require('url')
const path = require('path')

const {app, BrowserWindow} = electron;

let mainWindow;


app.on('ready', function () {
    mainWindow = new BrowserWindow({})
    mainWindow.setMenu(null);
    mainWindow.setTitle("Meme Viewer");
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '/pages/home.html'),
		protocol: 'file:',
		slashes: true
	}));
});


