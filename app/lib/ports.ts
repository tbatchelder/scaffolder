// app/lib/ports.ts
export interface ProjectService {
	listProjects(): Promise<{ id: string; name: string }[]>;
}

export const browserProjectService: ProjectService = {
	async listProjects() {
		// For now, just mock
		return Promise.resolve(mockProjectList);
	},
};

// Later in Electron land:
// export const electronProjectService: ProjectService = { ... }
