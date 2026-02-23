// formEngineData.ts — nav structure + content file registry
// Nav items 1 & 2 are Project Basics and Style Editor.
// All other items follow as the rest of the orchestration system.

import { NavItem, ContentFiles } from '../types/Formengine.types';

export const navigation: NavItem[] = [
	{
		title: 'Project Basics',
		order: 0,
		content: 'project-basics',
	},
	{
		title: 'Style Editor',
		order: 1,
		content: '__style-editor__', // Special key — Workshop renders StyleEditor component, not a content file
	},
	{
		title: 'Project Setup',
		order: 2,
		children: [
			{ title: 'Identity', order: 0, content: 'project-identity' },
			{ title: 'Architecture', order: 1, content: 'project-architecture' },
		],
	},
	{
		title: 'Agent Configuration',
		order: 3,
		children: [
			{ title: 'Agent Roles', order: 0, content: 'agent-roles' },
			{ title: 'Tools & Functions', order: 1, content: 'tools-functions' },
		],
	},
];

export const STYLE_EDITOR_KEY = '__style-editor__';
export const PROJECT_BASICS_KEY = 'project-basics';

export const contentFiles: ContentFiles = {
	'project-basics': {
		title: 'Project Basics',
		note: 'Define the core identity of this project — what it is, what it does, and what success looks like.',
		fields: [
			{
				id: 'project-name',
				label: 'Project Name',
				type: 'text',
				order: 0,
				placeholder: 'My Awesome Agent Project',
				helperText: 'A short, memorable name for this project.',
			},
			{
				id: 'project-description',
				label: 'Description',
				type: 'textarea',
				order: 1,
				placeholder: 'Briefly describe what this project does...',
				helperText: 'A 1–3 sentence summary of the project purpose.',
				rows: 4,
			},
			{
				id: 'project-goal',
				label: 'Primary Goal',
				type: 'textarea',
				order: 2,
				placeholder: 'What does success look like for this project?',
				helperText: 'The single most important outcome you want to achieve.',
				rows: 3,
			},
			{
				id: 'project-audience',
				label: 'Target Audience',
				type: 'text',
				order: 3,
				placeholder: 'e.g. developers, content creators, support teams...',
			},
			{
				id: 'project-tags',
				label: 'Tags',
				type: 'tags',
				order: 4,
				helperText: 'Keywords to help categorize and find this project.',
			},
			{
				id: 'project-status',
				label: 'Status',
				type: 'dropdown',
				order: 5,
				options: [
					{ label: 'Draft', value: 'draft' },
					{ label: 'In Progress', value: 'in-progress' },
					{ label: 'Review', value: 'review' },
					{ label: 'Complete', value: 'complete' },
				],
				defaultValue: 'draft',
			},
		],
	},

	'project-identity': {
		title: 'Project Identity',
		note: 'Define high-level project details that ground the entire agent configuration.',
		fields: [
			{
				id: 'name',
				label: 'Project Name',
				type: 'text',
				order: 0,
				placeholder: 'Enter project name...',
			},
			{
				id: 'description',
				label: 'Description',
				type: 'textarea',
				order: 1,
				placeholder: 'Describe what this project does...',
				rows: 4,
			},
			{
				id: 'type',
				label: 'Project Type',
				type: 'dropdown',
				order: 2,
				options: [
					{ label: 'Conversational Agent', value: 'conversational' },
					{ label: 'Task Automation', value: 'automation' },
					{ label: 'Content Generation', value: 'content' },
					{ label: 'Data Analysis', value: 'analysis' },
				],
			},
			{
				id: 'active',
				label: 'Active Project',
				type: 'toggle',
				order: 3,
				defaultValue: true,
			},
		],
	},

	'project-architecture': {
		title: 'Architecture',
		note: 'Define the technical structure and constraints of your agent system.',
		fields: [
			{
				id: 'model',
				label: 'Primary Model',
				type: 'dropdown',
				order: 0,
				options: [
					{ label: 'Claude 3.5 Sonnet', value: 'claude-3-5-sonnet' },
					{ label: 'Claude 3 Opus', value: 'claude-3-opus' },
					{ label: 'Claude 3 Haiku', value: 'claude-3-haiku' },
				],
			},
			{
				id: 'constraints',
				label: 'System Constraints',
				type: 'list',
				order: 1,
				helperText: 'Hard limits and requirements the system must respect.',
			},
			{
				id: 'output-formats',
				label: 'Output Formats',
				type: 'checkboxGroup',
				order: 2,
				options: [
					{ label: 'Markdown', value: 'markdown' },
					{ label: 'JSON', value: 'json' },
					{ label: 'Plain Text', value: 'plain' },
					{ label: 'HTML', value: 'html' },
				],
			},
		],
	},

	'agent-roles': {
		title: 'Agent Roles',
		note: 'Define the agents in your system, their responsibilities, and their nested capabilities.',
		fields: [
			{
				id: 'agents',
				label: 'Agents',
				type: 'list',
				order: 0,
				helperText:
					'Add each agent in the system. Each agent can have capabilities which can have sub-capabilities.',
				itemFields: [
					{
						id: 'agent-name',
						label: 'Agent Name',
						type: 'text',
						order: 0,
						placeholder: 'e.g. Orchestrator, Researcher, Writer...',
					},
					{
						id: 'agent-role',
						label: 'Role Description',
						type: 'textarea',
						order: 1,
						rows: 3,
						placeholder: 'What is this agent responsible for?',
					},
					{
						id: 'agent-capabilities',
						label: 'Capabilities',
						type: 'list',
						order: 2,
						itemFields: [
							{
								id: 'cap-name',
								label: 'Capability',
								type: 'text',
								order: 0,
							},
							{
								id: 'cap-details',
								label: 'Details',
								type: 'textarea',
								order: 1,
								rows: 2,
							},
							{
								id: 'cap-sub',
								label: 'Sub-capabilities',
								type: 'list',
								order: 2,
								itemFields: [
									{
										id: 'sub-name',
										label: 'Sub-capability',
										type: 'text',
										order: 0,
									},
								],
							},
						],
					},
				],
			},
		],
	},

	'tools-functions': {
		title: 'Tools & Functions',
		note: 'Define the tools and functions available to agents in this project.',
		fields: [
			{
				id: 'tools',
				label: 'Available Tools',
				type: 'checkboxGroup',
				order: 0,
				options: [
					{ label: 'Web Search', value: 'web-search' },
					{ label: 'Code Execution', value: 'code-exec' },
					{ label: 'File System', value: 'file-system' },
					{ label: 'API Calls', value: 'api-calls' },
					{ label: 'Database Query', value: 'db-query' },
				],
			},
			{
				id: 'custom-functions',
				label: 'Custom Functions',
				type: 'sentences',
				order: 1,
				helperText: 'Define any custom functions this agent system can call.',
			},
		],
	},
};
