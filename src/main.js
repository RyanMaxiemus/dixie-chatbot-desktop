// Import necessary modules from Electron and Node.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');

// Disable hardware acceleration to suppress VSync error messages
app.disableHardwareAcceleration();

// Function to create the main application window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // Enable context isolation for security
      enableRemoteModule: false, // Turn off remote module for security
      nodeIntegration: false, // Disable node integration for security
    },
  });
  
  // Load the index.html file into the window
  win.loadFile(path.join(__dirname, 'index.html'));
};

// When Electron has finished initialization, create the window
app.whenReady().then(createWindow).catch((err) => {
  console.error('Failed to create window:', err); // Log errors
});

// Quit the application when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Re-create a window on macOS when the app is activated (clicking the dock icon)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Handle IPC messages from the renderer process
ipcMain.handle('send-message', async (event, userMessage) => {
  try {
    // Send a message to the backend server
    const response = await axios.post('http://localhost:3000/message', { message: userMessage });
    
    // Return the backend server's response to the renderer process
    return response.data.message;
  } catch (error) {
    // Log any errors to the console
    console.error('Failed to send message to server:', error);

    // Return an error message to the renderer process
    return "Error: Failed to contact server's API.";
  }
});
/* ipcMain.on('send-message', (event, message) => {
  // Simulate a bot response after a delay of 500ms
  setTimeout(() => {
    // Send a message back to the renderer process
    event.sender.send('receive-message', `Bot: ${message}`);
  }, 500);
}); */
