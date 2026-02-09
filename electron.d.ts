export interface IElectronAPI {
	createUserID: (username: string) => Promise<boolean>;
}

declare global {
	interface Window {
		electronAPI: IElectronAPI;
	}
}
