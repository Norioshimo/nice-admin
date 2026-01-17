// electron.cjs
const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const win = new BrowserWindow({
    //fullscreen: true,// Pantalla completa
    width,
    height,
    //frame: false, // quita la barra de título
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  //Menu.setApplicationMenu(null);// Quitamos el menu superior
  win.setMenuBarVisibility(false);

  //win.loadFile(path.join(__dirname, "dist", "index.html"));
  
  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "dist/index.html"));
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
