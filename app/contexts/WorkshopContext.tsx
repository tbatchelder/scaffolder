'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface User {
	username: string;
	lastProject: string;
	projects: string[]; // List of project names this user has worked on
}

export interface WorkshopData {
	rootPath: string | null; // The site's root folder (null = not configured yet)
	users: User[]; // All users found in this site
	currentUser: string | null; // Who's logged in right now (null = not logged in)
}

interface WorkshopContextValue {
	data: WorkshopData;

	// ─── SETTERS ─────────────────────────────────────────────────────────────
	setRootPath: (path: string) => void;
	setUsers: (users: User[]) => void;
	setCurrentUser: (username: string | null) => void;

	// ─── UTILITIES ───────────────────────────────────────────────────────────
	addUser: (user: User) => void;
	updateUserLastProject: (username: string, projectName: string) => void;
	getCurrentUserData: () => User | null;
	reset: () => void; // Clear all data (for logout or reset)

	// ─── COMPUTED FLAGS ──────────────────────────────────────────────────────
	hasPersistentData: boolean; // True if rootPath exists (site is configured)
	isLoggedIn: boolean; // True if currentUser exists
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT & DEFAULT VALUES
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL_DATA: WorkshopData = {
	rootPath: null,
	users: [],
	currentUser: null,
};

const WorkshopContext = createContext<WorkshopContextValue | undefined>(undefined);

// ─────────────────────────────────────────────────────────────────────────────
// PROVIDER COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function WorkshopProvider({ children }: { children: ReactNode }) {
	// ─── STATE WITH LAZY INITIALIZATION ──────────────────────────────────────
	// Load from localStorage on first render only (lazy initializer)
	const [data, setData] = useState<WorkshopData>(() => {
		if (typeof window === 'undefined') return INITIAL_DATA; // SSR safety

		const stored = localStorage.getItem('workshop-data');
		if (stored) {
			try {
				return JSON.parse(stored);
			} catch (error) {
				console.error('Failed to parse stored workshop data:', error);
				return INITIAL_DATA;
			}
		}
		return INITIAL_DATA;
	});

	// ─── PERSISTENCE: Save to localStorage whenever data changes ────────────
	useEffect(() => {
		localStorage.setItem('workshop-data', JSON.stringify(data));
	}, [data]);

	// ─── SETTERS ─────────────────────────────────────────────────────────────

	const setRootPath = (path: string) => {
		setData(prev => ({ ...prev, rootPath: path }));
	};

	const setUsers = (users: User[]) => {
		setData(prev => ({ ...prev, users }));
	};

	const setCurrentUser = (username: string | null) => {
		setData(prev => ({ ...prev, currentUser: username }));
	};

	// ─── UTILITIES ───────────────────────────────────────────────────────────

	const addUser = (user: User) => {
		setData(prev => ({
			...prev,
			users: [...prev.users, user],
		}));
	};

	const updateUserLastProject = (username: string, projectName: string) => {
		setData(prev => ({
			...prev,
			users: prev.users.map(user =>
				user.username === username ? { ...user, lastProject: projectName } : user,
			),
		}));
	};

	const getCurrentUserData = (): User | null => {
		if (!data.currentUser) return null;
		return data.users.find(u => u.username === data.currentUser) || null;
	};

	const reset = () => {
		setData(INITIAL_DATA);
		localStorage.removeItem('workshop-data');
	};

	// ─── COMPUTED FLAGS ──────────────────────────────────────────────────────

	const hasPersistentData = data.rootPath !== null;
	const isLoggedIn = data.currentUser !== null;

	// ─── CONTEXT VALUE ───────────────────────────────────────────────────────

	const value: WorkshopContextValue = {
		data,
		setRootPath,
		setUsers,
		setCurrentUser,
		addUser,
		updateUserLastProject,
		getCurrentUserData,
		reset,
		hasPersistentData,
		isLoggedIn,
	};

	return <WorkshopContext.Provider value={value}>{children}</WorkshopContext.Provider>;
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM HOOK
// ─────────────────────────────────────────────────────────────────────────────

export function useWorkshop(): WorkshopContextValue {
	const context = useContext(WorkshopContext);
	if (!context) {
		throw new Error('useWorkshop must be used within a WorkshopProvider');
	}
	return context;
}
