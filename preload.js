window.addEventListener('DOMContentLoaded', () => {
  const { contextBridge, ipcRenderer } = require('electron');

  contextBridge.exposeInMainWorld('api', {
    sendMessage: (message) => ipcRenderer.send('send-message', message),
    onReceiveMessage: (callback) => ipcRenderer.on('receive-message', (event, message) => callback(message)),
  });
});