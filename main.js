const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');

const { safeStorage } = require('electron'); // Optional: for encrypting paths

// We'll use a simple object for now, or 'electron-store' if you have it installed
let siteConfig = {
	rootPath: null,
};

ipcMain.handle('get-site-config', () => siteConfig);

ipcMain.handle('set-site-config', (event, path) => {
	siteConfig.rootPath = path;
	// In a real app, you'd save this to a local config file here
	return true;
});

// IPC for the Folder Picker
ipcMain.handle('open-directory-picker', async () => {
	const { dialog } = require('electron');
	const result = await dialog.showOpenDialog({
		properties: ['openDirectory'],
	});
	return result.filePaths[0];
});

function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			// This links to your preload script for the "bridge"
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: false,
			contextIsolation: true,
		},
	});

	// If developing, point to the Next.js dev server
	// If production, point to the exported HTML files
	const startURL = isDev
		? 'http://localhost:3000'
		: `file://${path.join(__dirname, '../out/index.html')}`;

	win.loadURL(startURL);
}

// --- IPC HANDLERS ---
// This is the "createUserID" logic we talked about earlier
ipcMain.handle('create-user-directory', async (event, username) => {
	const userPath = path.join(app.getPath('documents'), 'Scaffolder', username);

	try {
		if (!fs.existsSync(userPath)) {
			fs.mkdirSync(userPath, { recursive: true });
		}
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
