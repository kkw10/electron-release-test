const { app, BrowserWindow, ipcMain, autoUpdater } = require('electron');
// const { autoUpdater } = require('electron-updater');
const winston = require('winston');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');
const log = require('electron-log');

winston.log('info', app.getVersion());

const server = 'http://localhost:80';
const feed = `${server}/update/${process.platform}/${app.getVersion()}`;

/**
 * [ Logging ]
 */
// autoUpdater.logger = log;
// autoUpdater.logger.transports.file.level = 'info';
// log.info('[@@@@@ App starting... @@@@@]');

let mainWindow;

function sendMessageToWindow (text) {
  log.info(`[@@@@@ ${text} @@@@@]`);
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('update_message', text);
  })
};
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.webContents.openDevTools();

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  }
  else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  autoUpdater.setFeedURL(feed);
  autoUpdater.checkForUpdates();

  //  autoUpdater.checkForUpdatesAndNotify();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

/**
 * [app.on~]
 */
app.on('ready', () => {
  createWindow();
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * [ipcMain.on~]
 */
ipcMain.on('app_info', (event) => {
  event.sender.send('app_info', { 
    version: app.getVersion(),
    platform: process.platform,
    feedURL: feed,
  });
});

/**
 * [autoUpdater.on~]
 */
autoUpdater.on('checking-for-update', () => {
  sendMessageToWindow('Checking for update...');
});
autoUpdater.on('update-available', () => {
  sendMessageToWindow('Update available');
});
autoUpdater.on('update-not-available', () => {
  sendMessageToWindow('Update not available');
});
autoUpdater.on('error', (err) => {
  sendMessageToWindow(`Error in auto-updater. ${err}`);
});
// autoUpdater.on('update-downloaded', () => {
//   sendMessageToWindow('Update downloaded');
// });
