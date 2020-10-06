/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import Datastore from 'nedb-promises';
import MenuBuilder from './menu';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let loginWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  // require('electron-debug')();
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * database
 */
const dbFactory = (fileName) => {
  return Datastore.create({
    filename: process.env.NODE_ENV === 'development' ? `./data/${fileName}` : `${app.getPath('userData')}/mekpreme_data/${fileName}`,
    timestampData: true
  });
};

const db = {
  account: null,
  taskGroups: null,
  profiles: null,
  profileGroups: null,
  proxy: null,
};

const initDb = () => {
  db.account = dbFactory('account.db');
  db.taskGroups = dbFactory('taskGroups.db');
  db.profiles = dbFactory('profiles.db');
  db.profileGroups = dbFactory('profileGroups.db');
  db.proxy = dbFactory('proxy.db');
};

ipcMain.on('insert', async (event, fileName, data) => {
  console.log('insert: ', data);
  const result = await db[fileName].insert(data);
  event.returnValue = result;
});

ipcMain.on('find', async (event, fileName, query) => {
  console.log('find: ', query);
  const result = await db[fileName].find(query).sort({ createdAt: 1 });
  event.returnValue = result;
});

ipcMain.on('findOne', async (event, fileName, query) => {
  console.log('findOne: ', query);
  const result = await db[fileName].findOne(query);
  event.returnValue = result;
});

ipcMain.on('update', async (event, fileName, query, data, options = {}) => {
  console.log('update: ', {query, data});
  const result = await db[fileName].update(query, data, options);
  event.returnValue = result;
});

ipcMain.on('count', async (event, fileName, query) => {
  console.log('count: ', query);
  const result = await db[fileName].count(query);
  event.returnValue = result;
});

ipcMain.on('remove', async (event, fileName, query, options = {}) => {
  console.log('remove: ', {query, options});
  const result = await db[fileName].remove(query, options);
  event.returnValue = result;
});

ipcMain.on('login', async (event, arg) => {
  // db.account.remove({}, { multi: true });
  const account = await db.account.findOne({});
  let daysPast = 0;
  let firstTime = false;
  let msPast = 0;

  if (account) {
    const { date } = account;
    const currentDate = new Date();
    const diffTime = currentDate - date;
    daysPast = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    msPast = Math.abs(diffTime);
    console.log('days past: ', daysPast);
    console.log('ms past: ', msPast);
  } else {
    firstTime = true;
    db.account.insert({ date: new Date() });
  }

  if (process.env.NODE_ENV === 'development' || firstTime || daysPast < 6){
    console.log('pinged');
    firstTime = false;
    loginWindow.hide();
    mainWindow.show();
    mainWindow.focus();

    mainWindow.webContents.send('login success', { msg:'hello from main process' });
  } else {
    mainWindow.webContents.send('login failed', { msg:'expired!' });
  }

  event.returnValue = true;
});

/**
 * create the main window
 */
const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1366,
    height: 768,
    minWidth: 1366,
    minHeight: 768,
    frame: false,
    // webPreferences: { nodeIntegration: true }
    webPreferences: (process.env.NODE_ENV === 'development' ||
        process.env.E2E_BUILD === 'true') &&
      process.env.ERB_SECURE !== 'true'
        ? {
            nodeIntegration: true,
          }
        : {
            preload: path.join(__dirname, 'dist/main.renderer.prod.js'),
          },
  });

  loginWindow = new BrowserWindow({
    show: false,
    width: 400,
    height: 500,
    minWidth: 400,
    minHeight: 500,
    frame: false,
    webPreferences:
      (process.env.NODE_ENV === 'development' ||
        process.env.E2E_BUILD === 'true') &&
      process.env.ERB_SECURE !== 'true'
        ? {
            nodeIntegration: true,
          }
        : {
            preload: path.join(__dirname, 'dist/login.renderer.prod.js'),
          },
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);
  loginWindow.loadURL(`file://${__dirname}/login.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      mainWindow.show();
      mainWindow.focus();
      mainWindow.webContents.send('login success', { msg:'hello from main process' });
    }
  });

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  loginWindow.webContents.on('did-finish-load', () => {
    if (!loginWindow) {
      throw new Error('"loginWindow" is not defined');
    }

    loginWindow.show();
    loginWindow.focus();

  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  
  loginWindow.on('closed', () => {
    loginWindow = null;
    mainWindow = null;
  });

  const mainMenuBuilder = new MenuBuilder(mainWindow);
  const loginMenuBuilder = new MenuBuilder(loginWindow);
  mainMenuBuilder.buildMenu();
  loginMenuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

if (process.env.E2E_BUILD === 'true') {
  // eslint-disable-next-line promise/catch-or-return
  app.whenReady().then(createWindow);
} else {
  app.on('ready', () => {
    initDb();
    createWindow();
  });
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    initDb();
    createWindow();
  }
});
