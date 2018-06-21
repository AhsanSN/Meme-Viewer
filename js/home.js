slideSSbool = true;
function stopSS() {
    if (slideSSbool == true) {
        slideSSbool = false;
        document.getElementById("pause").innerHTML = "Resume";
    }
    else {
        slideSSbool = true;
        document.getElementById("pause").innerHTML = "Pause";
    }
}

function timer(seconds) {
    var i = 0;
    while (i < 100000) {
        (function (i) {
            setTimeout(function () {
                if (slideSSbool == true) {
                    ipcRenderer.send('asynchronous-message', 'ping');
                }
            }, seconds * i)
        })(i++)
    }
}

const electron = require('electron');
const { ipcRenderer } = require('electron');

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg) // prints "pong
    document.getElementById('text').innerHTML = arg;
    document.getElementById('image').src = arg;
})
timer(2000);