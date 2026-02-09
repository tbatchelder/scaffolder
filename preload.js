const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
	createUserID: username => ipcRenderer.invoke('create-user-directory', username),
});
