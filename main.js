const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'public/img/favicon-16x16.ico'),
        webPreferences: {
            nodeIntegration: true, // Allow node.js features in the renderer process
            contextIsolation: false // Ensure `ipcRenderer` works
        },
        autoHideMenuBar: true, // Hides the menu
    });    

    mainWindow.webContents.openDevTools();

    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Handle folder dialog open event
ipcMain.on('open-folder-dialog', (event) => {
    dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'] // Open only directories
    }).then(result => {
        if (!result.canceled) {
            event.sender.send('selected-folder', result.filePaths[0]);
        }
    }).catch(err => {
        console.log(err);
    });
});