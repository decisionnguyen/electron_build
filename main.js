const { app, BrowserWindow, protocol } = require("electron/main");
const path = require("node:path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableBlinkFeatures:
        "TouchEventFeatureDetection,TouchpadAndWheelScrollLatching,UnifiedTouchAdjustment,Touch",
      webSecurity: false,
    },
    autoHideMenuBar: true,
  });

  win.loadFile(path.join(__dirname, "dist/index.html"));
  win.setFullScreen(true);
  win.removeMenu();
}

app.commandLine.appendSwitch("--enable-touch-events");
app.commandLine.appendSwitch("--touch-events");

// Standard scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: { standard: true, secure: true, supportFetchAPI: true },
  },
]);

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
