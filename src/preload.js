const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  sendMessage: (message) => ipcRenderer.send('send-message', message),
  onReceiveMessage: (callback) => {
    console.log('onReceiveMessage Hit!'); // Debugging
    ipcRenderer.removeAllListeners('receive-message');
    ipcRenderer.on('receive-message', (event, message) => callback(message));
  },
});