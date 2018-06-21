const electron = require('electron')
const url = require('url')
const path = require('path')
const fs = require('fs');
const { google } = require('googleapis');
const customsearch = google.customsearch('v1');
const request = require('request');
var stream = fs.createWriteStream("imagesFile.txt", { flags: 'a' });

const { app, BrowserWindow } = electron;
let mainWindow;
var nImages = 0;
var googleIndex = 1;

function getImgFromArray(dataArray)
{

    console.log(dataArray.items.length);
    var imgArrayDownloaded = []
    for (var i = 0; i < dataArray.items.length; i++) {
        imgArrayDownloaded.push(dataArray.items[i].link);
    }
    return imgArrayDownloaded;
}

function downloadGoogleArray(googleArray, arrayImg)
{

    for (let i = 0; i < googleArray.length; i++) {
        downloadImg(googleArray[i], arrayImg);
    }

}

function downloadImg(url = "https://www.google.com/images/srpr/logo3w.png", arrayImg)
{

    var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {

            if (!err) {
                nImages = nImages + 1;
                var filename = `./images/m (${nImages}).png`;
                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);
                console.log('added ' + filename);
                writeToFile("." + filename);

                nImages = nImages + 1;
                arrayImg.push("." + filename);

                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            }
        });
    };

    download(url, "random", function () {
    });

}

function getImgfromNet(arrayImg)
{

    if (module === require.main) {
        const options = {
            q: "memes",
            apiKey: "AIzaSyAwUpzM9DJr58Y3y_8TMnMkfwCBtCEGcTs",
            cx: "010789280150233095101:gry9brqojdc",
        };

        imgRequest(options, arrayImg).catch(console.error);
    }

}

async function imgRequest(options, arrayImg)
{

    const res = await customsearch.cse.list({
        cx: options.cx,
        q: options.q,
        auth: options.apiKey,
        searchType: "image",
        start: googleIndex
    });

    var googleArray = getImgFromArray(res.data);
    googleIndex = googleIndex + 10;
    downloadGoogleArray(googleArray, arrayImg);
    //console.log(res.data.items[0].link);
    return res.data;

}

function writeToFile(data = "no text provided")
{

    stream.write(data + '\n');
    console.log("Address added");

}

function readFile(callback)
{

    var arrayImg;
    fs.readFile('imagesFile.txt', function (error, data) {
        if (error)
            callback(error, null);
        else {
            arrayImg = data.toString().split("\n");
            nImages = arrayImg.length;
            callback(null, arrayImg);
        }
    });

}

function ipc(imgArray)
{

    var imgNumber = 0;

    const { ipcMain } = require('electron')
    ipcMain.on('asynchronous-message', (event, arg) => {
        //getImgfromNet(imgArray);
        console.log("-------------------------------------------------------" + googleIndex)

        event.sender.send('asynchronous-reply', imgArray[imgNumber])
        if (imgNumber + 1 == imgArray.length) {
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

//main

app.on('ready', function () {

    showWindow();

    var imgArray = readFile(function (err, data) {

        if (err) {
            console.log("ERROR : ", err);
        } else {
            nImages = data.length;
            ipc(data);
        }

    });  

});
