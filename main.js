import electron from 'electron';
// import crashReporter from 'crash-reporter';
import { enableLiveReload } from 'electron-compile';
enableLiveReload();

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// import appMenu from './browser/menu/appMenu';

let mainWindow = null;
if (process.env.NODE_ENV === 'develop') {
  // crashReporter.start();
  //appMenu.append(devMenu);
}

app.on('window-all-closed', () => {
  app.quit();
});

function createWindow() {


  // mainWindow.loadUrl('file://' + __dirname + '/renderer/index.html');
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 580,
    height: 365
  });

  mainWindow.loadURL('file://' + __dirname + '/renderer/index.html');
});
