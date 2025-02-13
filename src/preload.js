const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('chatAPI', {
  sendMessage: (message) => ipcRenderer.invoke('send-message', message),
  onReceiveMessage: (callback) => ipcRenderer.on('receive-message', (event, message) => callback(message)),
});
