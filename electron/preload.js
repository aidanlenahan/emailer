const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  getConfig: () => ipcRenderer.invoke('get-config'),
  saveConfig: (config) => ipcRenderer.invoke('save-config', config),
  testSmtp: (config) => ipcRenderer.invoke('test-smtp', config),
  sendEmail: (emailData) => ipcRenderer.invoke('send-email', emailData),
  openSettings: () => ipcRenderer.invoke('open-settings')
});
