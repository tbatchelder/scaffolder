// formEngineData.ts — nav structure + content file registry
// Nav items 1 & 2 are Project Basics and Style Editor.
// All other items follow as the rest of the orchestration system.
//
// TYPE ALIGNMENT NOTES (must match Formengine.types.ts exactly):
//   - comment      (not helperText)
//   - lines        (not rows)
//   - default      (not defaultValue)
//   - options: string[]  (not { label, value }[])
//   - type: 'checkbox-group'  (not 'checkboxGroup')
//   - type: 'sentence-list'   (not 'sentences')
//   - type: 'tag-list'        (not 'tags')
//   - SimpleListField requires itemType: 'text'
//   - ObjectListField requires itemFields: FormField[]

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
		content: '__style-editor__', // Special key — Workshop renders StyleEditor, not a ContentFile
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
	// ─── PROJECT BASICS ────────────────────────────────────────────────────────
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
				comment: 'A short, memorable name for this project.',
			},
			{
				id: 'project-description',
				label: 'Description',
				type: 'textarea',
				order: 1,
				placeholder: 'Briefly describe what this project does...',
				comment: 'A 1–3 sentence summary of the project purpose.',
				lines: 4,
			},
			{
				id: 'project-goal',
				label: 'Primary Goal',
				type: 'textarea',
				order: 2,
				placeholder: 'What does success look like for this project?',
				comment: 'The single most important outcome you want to achieve.',
				lines: 3,
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
				type: 'tag-list',
				order: 4,
				comment: 'Keywords to help categorize and find this project.',
			},
			{
				id: 'project-status',
				label: 'Status',
				type: 'radio',
				order: 5,
				options: ['Draft', 'In Progress', 'Review', 'Complete'],
				default: 'Draft',
			},
		],
	},

	// ─── PROJECT IDENTITY ──────────────────────────────────────────────────────
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
				lines: 4,
			},
			{
				id: 'type',
				label: 'Project Type',
				type: 'dropdown',
				order: 2,
				options: ['Conversational Agent', 'Task Automation', 'Content Generation', 'Data Analysis'],
			},
			{
				id: 'active',
				label: 'Active Project',
				type: 'toggle',
				order: 3,
				default: true,
			},
		],
	},

	// ─── PROJECT ARCHITECTURE ──────────────────────────────────────────────────
	'project-architecture': {
		title: 'Architecture',
		note: 'Define the technical structure and constraints of your agent system.',
		fields: [
			{
				id: 'model',
				label: 'Primary Model',
				type: 'dropdown',
				order: 0,
				options: ['Claude Sonnet 4', 'Claude Opus 4', 'Claude Haiku 4'],
			},
			{
				// SimpleListField — itemType: 'text' is required to hit the right branch
				id: 'constraints',
				label: 'System Constraints',
				type: 'list',
				itemType: 'text',
				order: 1,
				comment: 'Hard limits and requirements the system must respect.',
			},
			{
				id: 'output-formats',
				label: 'Output Formats',
				type: 'checkbox-group',
				order: 2,
				options: ['Markdown', 'JSON', 'Plain Text', 'HTML'],
			},
		],
	},

	// ─── AGENT ROLES ───────────────────────────────────────────────────────────
	'agent-roles': {
		title: 'Agent Roles',
		note: 'Define the agents in your system, their responsibilities, and their nested capabilities.',
		fields: [
			{
				// ObjectListField — itemFields required, no itemType
				id: 'agents',
				label: 'Agents',
				type: 'list',
				order: 0,
				comment:
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
						lines: 3,
						placeholder: 'What is this agent responsible for?',
					},
					{
						// Nested ObjectListField
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
								lines: 2,
							},
							{
								// Deepest level ObjectListField
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

	// ─── TOOLS & FUNCTIONS ─────────────────────────────────────────────────────
	'tools-functions': {
		title: 'Tools & Functions',
		note: 'Define the tools and functions available to agents in this project.',
		fields: [
			{
				id: 'tools',
				label: 'Available Tools',
				type: 'checkbox-group',
				order: 0,
				options: ['Web Search', 'Code Execution', 'File System', 'API Calls', 'Database Query'],
			},
			{
				id: 'custom-functions',
				label: 'Custom Functions',
				type: 'sentence-list',
				order: 1,
				comment: 'Define any custom functions this agent system can call.',
			},
		],
	},
};
