const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');

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
