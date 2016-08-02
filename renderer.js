// In renderer process (web page).
const {ipcRenderer} = require('electron')

ipcRenderer.on('dialogs', (event, arg) => {
  console.log(arg) // prints "pong"
});


function ld () {
    ipcRenderer.send('getDialogs');
}
