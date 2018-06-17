const electron = require('electron')

const { app, BrowserWindow } = require('electron')

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600 })

    // and load the index.html of the app.
    win.loadFile('index.html')
}

app.on('ready', createWindow)



/**

const electron = require('electron')
const url = require('url')
const path = require('path')

const {app, BrowserWindow} = electron;

let mainWindow;



app.on('ready', function () {
	mainWindow = new BrowserWindow({})
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'pages/home.html'),
		protocol: 'file:',
		slashes: true
	}));
});





const { browserwindow } = require('electron')
let win = new browserwindow({ width: 400, height: 320 })

win.on('close', () => { win = null })
win.loadurl(modalpath)
win.show()

const newwindowbtn = document.getelementbyid('new-window')

newWindowBtn.addEventListener('click', (event) => {
    const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html')
    let win = new BrowserWindow({ width: 400, height: 320 })

    win.on('close', () => { win = null })
    win.loadURL(modalPath)
    win.show()
})
**/



/**
mainWindow = new BrowserWindow({});
mainWindow.loadURL(url.format({
	pathname: path.join(__dirname, 'pages/home.html'),
	protocol: 'file:',
	slashes: true
}))
**/
