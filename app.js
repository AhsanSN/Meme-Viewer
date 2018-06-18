const electron = require('electron')
const url = require('url')
const path = require('path')
const fs = require('fs');

const { app, BrowserWindow } = electron;
let mainWindow;

function downloadImg(url ="https://www.google.com/images/srpr/logo3w.png") {
    const request = require('request');

    var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };

    download(url, './images/google.png', function () {
        console.log('done');
    });
}

function googleApi() {
    const { google } = require('googleapis');
    const customsearch = google.customsearch('v1');

    // Ex: node customsearch.js
    //      "Google Node.js"
    //      "API KEY"
    //      "CUSTOM ENGINE ID"

    async function runSample(options) {
        console.log(options);
        const res = await customsearch.cse.list({
            cx: options.cx,
            q: options.q,
            auth: options.apiKey
        });
        console.log(res.data);
        return res.data;
    }

    if (module === require.main) {
        // You can get a custom search engine id at
        // https://www.google.com/cse/create/new
        const options = {
            q: process.argv[2],
            apiKey: process.argv[3],
            cx: process.argv[4]
        };
        runSample(options).catch(console.error);
    }

    module.exports = {
        runSample
    };
}

function writeToFile(data = "no text provided") {
    data = data + '\n';
    fs.appendFile('imagesFile.txt', data, function (err, data) {
        if (err) console.log(err);
        console.log("Address added");
    });
}

function readFile(callback) {
    var arrayImg;
    fs.readFile('imagesFile.txt', function (error, data) {
        if (error)
            callback(error, null);
        else {
            arrayImg = data.toString().split("\n");
            callback(null, arrayImg);
        }
    });
}

function ipc(imgArray) {
    var imgNumber = 0;
    const { ipcMain } = require('electron')
    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log(arg) // prints "ping"

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
    //writeToFile();
}

app.on('ready', function () {
    showWindow();
    //getting images array
    var imgArray = readFile(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        } else {
            ipc(data);
        }
    });
    downloadImg();
});
