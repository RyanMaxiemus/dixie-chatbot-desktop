// Import necessary modules from Electron and Node.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Function to create the main application window
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // Enable context isolation for security
      nodeIntegration: false, // Disable node integration for security
    },
  });
  
  // Load the index.html file into the window
  win.loadFile('index.html');
}

// When Electron has finished initialization, create the window
app.whenReady().then(createWindow).catch((err) => {
  console.error('Failed to create window:', err); // Log any errors
});

// Quit the application when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Re-create a window when the app is activated (macOS specific behavior)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});