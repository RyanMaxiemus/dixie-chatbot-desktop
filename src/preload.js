const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  sendMessage: (message) => ipcRenderer.send('send-message', message),
  onReceiveMessage: (callback) => {
        ipcRenderer.removeAllListeners('receive-message');
    ipcRenderer.on('receive-message', (event, message) => callback(message));
  },
});