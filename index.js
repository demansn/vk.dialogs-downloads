const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const VK = require('vksdk')

// In main process.
const {ipcMain} = require('electron')

var dialogsList = [];
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('ready', createWindow)

var vkAuth = require('vk-auth')(5329877, 'messages');
var vk = new VK({
    'appId'     : 5329877,
    'appSecret' : 'SNY83LI0pH56lWZqB3R5',
    'mode'      : 'oauth',
    'secure'    : true,
    'https'     : true,
    'language'  : 'ru'
});

vkAuth.authorize('+380505488232', 'dimatelkisex', function(err, tokenParams) {

    console.log(tokenParams);
    vk.setToken(tokenParams.access_token);

    vk.on('done:messages.getDialogs', function(e) {
    // var mainWindow = new BrowserWindow({width: 800, height: 600})
    //     mainWindow.loadURL(_o.error.redirect_uri)

        mainWindow.webContents.send('dialogs', e.response.items)
    });

    loadDialogs();


});

function loadDialogs() {
    vk.request('messages.getDialogs');
}

ipcMain.on('getDialogs', function(){
    loadDialogs();
});
