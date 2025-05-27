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
    const encodedMessage = encodeURIComponent(userMessage);
    const apiUrl = `https://api.duckduckgo.com/?q=${encodedMessage}&format=json&pretty=1`;
    
    const response = await axios.get(apiUrl);
    const data = response.data;

    let summary = "";

    if (data.AbstractText) {
      // Take the first 2-3 sentences
      const sentences = data.AbstractText.split('. ');
      summary = sentences.slice(0, Math.min(sentences.length, 3)).join('. ') + (sentences.length > 2 ? '.' : '');
    } else if (data.RelatedTopics && data.RelatedTopics.length > 0 && data.RelatedTopics[0].Text) {
      summary = `I found some information on ${data.Heading || userMessage}. Here's a snippet: ${data.RelatedTopics[0].Text.substring(0, 200)}...`;
      if (data.RelatedTopics[0].FirstURL) {
        summary += ` More at: ${data.RelatedTopics[0].FirstURL}`;
      }
    } else if (data.Heading) {
      summary = `I found some information related to: ${data.Heading}.`;
       if (data.AbstractURL) {
        summary += ` You can read more at: ${data.AbstractURL}`;
      }
    } else {
      summary = "Sorry, I couldn't find a direct answer for that.";
    }

    return summary;
  } catch (error) {
    console.error('Failed to get answer from DuckDuckGo:', error.message);
    if (error.response) {
      console.error('DDG API Response Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('DDG API No Response:', error.request);
    }
    return "Error: Failed to contact DuckDuckGo API.";
  }
});
