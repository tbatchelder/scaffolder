'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT CONTEXT
// ─────────────────────────────────────────────────────────────────────────────
// Manages the dynamic form data built by the JSON engine.
// Separate from WorkshopContext (which handles users/projects/auth).
// This stores the actual prompt/agent configuration data.

type FieldValue =
	| string
	| number
	| boolean
	| string[]
	| Record<string, unknown>[]
	| Record<string, unknown>;
type SectionData = Record<string, FieldValue>;
type ProjectData = Record<string, SectionData>;

interface ProjectContextValue {
	projectData: ProjectData;
	updateField: (
		section: string,
		fieldId: string,
		value: FieldValue | ((prev: FieldValue) => FieldValue),
	) => void;
	clearData: () => void;
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
	const [projectData, setProjectData] = useState<ProjectData>({});

	const updateField = (
		section: string,
		fieldId: string,
		value: FieldValue | ((prev: FieldValue) => FieldValue),
	) => {
		setProjectData(prev => ({
			...prev,
			[section]: {
				...prev[section],
				[fieldId]: typeof value === 'function' ? value(prev[section]?.[fieldId]) : value,
			},
		}));
	};

	const clearData = () => {
		setProjectData({});
	};

	return (
		<ProjectContext.Provider value={{ projectData, updateField, clearData }}>
			{children}
		</ProjectContext.Provider>
	);
}

export function useProject(): ProjectContextValue {
	const context = useContext(ProjectContext);
	if (!context) {
		throw new Error('useProject must be used within a ProjectProvider');
	}
	return context;
}
