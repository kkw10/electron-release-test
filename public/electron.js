const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');
const log = require('electron-log');

/**
 * [ Logging ]
 */
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('[@@@@@ App starting... @@@@@]');

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
    },
  });

  mainWindow.webContents.openDevTools();

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  }
  else {
    // mainWindow.loadURL(url.format({
    //   protocol: 'file',
    //   slashes: true,
    //   pathname: 'index.html',
    // }));
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  autoUpdater.checkForUpdatesAndNotify();

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
ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
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
autoUpdater.on('update-downloaded', () => {
  sendMessageToWindow('Update downloaded');
});