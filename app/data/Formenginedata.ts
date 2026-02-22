import type { Navigation, ContentFiles } from '../types/Formengine.types';

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION STRUCTURE
// ─────────────────────────────────────────────────────────────────────────────

export const navigation: Navigation = [
	{
		title: 'Project Setup',
		order: 0,
		children: [
			{
				title: 'Identity',
				order: 0,
				content: 'identity',
			},
			{
				title: 'Architecture',
				order: 1,
				content: 'architecture',
			},
		],
	},
	{
		title: 'Agent Configuration',
		order: 1,
		children: [
			{
				title: 'Agent Roles',
				order: 0,
				content: 'agent-roles',
			},
			{
				title: 'Tools & Functions',
				order: 1,
				content: 'tools',
			},
		],
	},
];

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT FILES
// ─────────────────────────────────────────────────────────────────────────────

export const contentFiles: ContentFiles = {
	identity: {
		title: 'Project Identity',
		note: 'These fields define the core identity and purpose of your prompt orchestration project.',
		fields: [
			{
				id: 'projectName',
				label: 'Project Name',
				type: 'text',
				order: 0,
				default: '',
				placeholder: 'My Agentic Workflow',
				required: true,
				comment: 'Choose something short, memorable, and descriptive.',
			},
			{
				id: 'shortDescription',
				label: 'Short Description',
				type: 'textarea',
				order: 1,
				lines: 3,
				default: '',
				placeholder: 'A brief summary of what this orchestration accomplishes.',
				comment: 'This helps the agents understand the workflows purpose.',
			},
			{
				id: 'purpose',
				label: 'Purpose',
				type: 'dropdown',
				order: 2,
				options: ['Research Assistant', 'Code Generation', 'Data Analysis', 'Content Creation'],
				allowCustom: true,
				default: '',
				note: 'Select the primary purpose of this orchestration.',
			},
			{
				id: 'loginRequired',
				label: 'Authentication Required',
				type: 'toggle',
				order: 3,
				default: false,
			},
		],
	},

	architecture: {
		title: 'System Architecture',
		note: 'Define the structural components of your agentic system.',
		fields: [
			{
				id: 'deploymentType',
				label: 'Deployment Type',
				type: 'radio',
				order: 0,
				options: ['Local', 'Cloud', 'Hybrid'],
				default: 'Local',
			},
			{
				id: 'permissions',
				label: 'Required Permissions',
				type: 'checkbox-group',
				order: 1,
				options: ['File System Access', 'Network Access', 'Database Access', 'API Access'],
			},
			{
				id: 'audience',
				label: 'Intended Users',
				type: 'sentence-list',
				order: 2,
				default: [],
			},
			{
				id: 'keywords',
				label: 'Keywords',
				type: 'tag-list',
				order: 3,
				default: [],
			},
		],
	},

	'agent-roles': {
		title: 'Agent Roles',
		note: 'Define the agents that will execute this orchestration and their nested capabilities.',
		fields: [
			{
				id: 'agents',
				label: 'Agents',
				type: 'list',
				order: 0,
				itemFields: [
					{ id: 'name', label: 'Agent Name', type: 'text', order: 0 },
					{ id: 'role', label: 'Role Description', type: 'textarea', lines: 2, order: 1 },
					{
						id: 'capabilities',
						label: 'Capabilities',
						type: 'list',
						order: 2,
						itemFields: [
							{ id: 'capabilityName', label: 'Capability', type: 'text', order: 0 },
							{
								id: 'subCapabilities',
								label: 'Sub-Capabilities',
								type: 'list',
								order: 1,
								itemFields: [
									{ id: 'subCapName', label: 'Sub-Capability', type: 'text', order: 0 },
									{ id: 'subCapDesc', label: 'Description', type: 'textarea', lines: 2, order: 1 },
								],
							},
						],
					},
				],
			},
		],
	},

	tools: {
		title: 'Tools & Functions',
		note: 'Register the tools and functions available to your agents.',
		fields: [
			{
				id: 'tools',
				label: 'Available Tools',
				type: 'list',
				order: 0,
				itemFields: [
					{ id: 'toolName', label: 'Tool Name', type: 'text', order: 0 },
					{
						id: 'toolType',
						label: 'Tool Type',
						type: 'dropdown',
						options: ['API', 'Function', 'Database Query', 'File Operation'],
						order: 1,
					},
					{ id: 'toolDescription', label: 'Description', type: 'textarea', lines: 3, order: 2 },
				],
			},
		],
	},
};
