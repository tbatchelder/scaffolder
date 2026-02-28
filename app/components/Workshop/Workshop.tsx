'use client';

import React, { useState } from 'react';
import { theme } from '../../lib/theme';
import { useWorkshop } from '../../contexts/WorkshopContext';
import { ProjectProvider, useProject } from '../../contexts/ProjectContext';
import Image from 'next/image';
import WorkshopNavigation from './WorkshopNavigation';
import ContentRenderer from './ContentRenderer';
import { contentFiles } from '../../data/Formenginedata';
import { StyleProvider } from '../../contexts/StyleContext';
import { StyleEditor } from './StyleEditor';
import { STYLE_EDITOR_KEY } from '../../data/Formenginedata';

function WorkshopInner() {
	const { getCurrentUserData, setCurrentUser } = useWorkshop();
	const { projectData } = useProject();
	const currentUser = getCurrentUserData();

	const [currentProject, setCurrentProject] = useState(currentUser?.lastProject || 'default');
	const [navDepth, setNavDepth] = useState(0);
	const [activeContent, setActiveContent] = useState<string | null>(null);

	// ─── HANDLERS ────────────────────────────────────────────────────────────

	const handleProjectChange = (projectName: string) => {
		setCurrentProject(projectName);
		// TODO: When Electron is ready, load project data from disk
	};

	const handleLogout = () => {
		setCurrentUser(null);
		// User gets kicked back to gate by the currentView logic in page.tsx
	};

	// Handle navigation selection from WorkshopNavigation
	const handleNavSelect = (contentKey: string) => {
		setActiveContent(contentKey);
	};

	// ─── RENDER ──────────────────────────────────────────────────────────────

	if (!currentUser) {
		return (
			<div className="w-screen h-screen flex items-center justify-center bg-stone-900 text-white">
				<p>No user logged in. How did you get here?</p>
			</div>
		);
	}

	const content = activeContent ? contentFiles[activeContent] : null;

	return (
		<div className="w-screen h-screen flex flex-col overflow-hidden bg-stone-900 text-white">
			{/* ═══ HEADER ═════════════════════════════════════════════════════ */}
			<header
				className="flex items-center justify-between px-4 py-2 gradient-diagonal border-b-2"
				style={{ borderColor: theme.palette.emberBlack }}
			>
				{/* Left: Branding + current project */}
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<Image src="/beam-logo.svg" alt="BEAM" width={30} height={30} />
						<Image src="/logo.png" alt="Scaffolder" width={30} height={30} />
						<h1 className="headerTitle text-2xl font-black uppercase tracking-tight">Scaffolder</h1>
					</div>

					{/* Divider */}
					<div className="h-6 w-px" style={{ backgroundColor: theme.palette.ember2 }} />

					{/* Current Project */}
					<div className="flex items-center gap-2">
						<span
							className="text-xs font-bold uppercase tracking-wider"
							style={{ color: theme.palette.ember2 }}
						>
							Project:
						</span>
						<span
							className="text-base font-black uppercase"
							style={{ color: theme.palette.emberBlack }}
						>
							{currentProject}
						</span>
					</div>
				</div>

				{/* Right: Project dropdown + settings + user profile */}
				<div className="flex items-center gap-3">
					{/* Project Dropdown */}
					<select
						value={currentProject}
						onChange={e => handleProjectChange(e.target.value)}
						className="px-3 py-1.5 rounded border-2 font-bold uppercase text-sm cursor-pointer transition-colors"
						style={{
							backgroundColor: theme.palette.silver,
							borderColor: theme.palette.emberBlack,
							color: theme.palette.emberBlack,
						}}
					>
						{currentUser.projects.map(proj => (
							<option key={proj} value={proj}>
								{proj}
							</option>
						))}
						<option value="__new__">+ New Project</option>
					</select>

					{/* Settings Icon/Button */}
					<button
						className="w-8 h-8 flex items-center justify-center rounded border-2 font-black hover:brightness-110 transition-all cursor-pointer"
						style={{
							backgroundColor: theme.palette.silver,
							borderColor: theme.palette.emberBlack,
							color: theme.palette.emberBlack,
						}}
						onClick={() => console.log('Settings clicked')}
					>
						⚙
					</button>

					{/* User Profile */}
					<div
						className="flex items-center gap-3 px-3 py-1 border-2 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
						style={{
							backgroundColor: theme.palette.silver,
							borderColor: theme.palette.emberBlack,
						}}
					>
						{/* Avatar */}
						<div
							className="w-6 h-6 flex items-center justify-center border text-[10px] font-black uppercase"
							style={{
								backgroundColor: theme.palette.dragonYellow,
								borderColor: theme.palette.emberBlack,
								color: theme.palette.emberBlack,
							}}
						>
							{currentUser.username.charAt(0)}
						</div>

						{/* Name + Logout */}
						<div className="flex flex-col leading-none">
							<span
								className="text-xs font-black uppercase tracking-tight"
								style={{ color: theme.palette.emberBlack }}
							>
								{currentUser.username}
							</span>
							<button
								onClick={handleLogout}
								className="text-[9px] font-bold uppercase text-left transition-colors cursor-pointer"
								style={{ color: theme.palette.ember2 }}
								onMouseEnter={e => (e.currentTarget.style.color = theme.palette.dragonRed)}
								onMouseLeave={e => (e.currentTarget.style.color = theme.palette.ember2)}
							>
								Clock Out
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* ═══ MAIN CONTENT AREA ══════════════════════════════════════════ */}
			<div
				className="flex-1 flex overflow-hidden relative"
				style={{ backgroundColor: theme.palette.ember2 }}
			>
				{/* Navigation sidebar */}
				<WorkshopNavigation onDepthChange={setNavDepth} onSelect={handleNavSelect} />

				{/* Main work area — pushed right to avoid nav overlap */}
				<main
					className="flex-1 overflow-y-auto transition-all duration-300"
					style={{
						paddingLeft: '80px', // Avoid collapsed nav overlap
						color: theme.palette.silver,
					}}
				>
					{activeContent === STYLE_EDITOR_KEY ? (
						<StyleEditor />
					) : (
						<ContentRenderer content={content} />
					)}
				</main>
			</div>

			{/* ═══ DEBUG: Project Data Preview ════════════════════════════════ */}
			<div
				className="fixed bottom-4 right-4 max-w-sm max-h-64 overflow-auto text-[10px] font-mono p-3 rounded border-2"
				style={{
					backgroundColor: 'rgba(0,0,0,0.9)',
					borderColor: theme.palette.dragonYellow,
					color: theme.palette.silver,
				}}
			>
				<p className="font-bold mb-2" style={{ color: theme.palette.dragonYellow }}>
					Project Data (Live)
				</p>
				<pre className="whitespace-pre-wrap">{JSON.stringify(projectData, null, 2)}</pre>
			</div>
		</div>
	);
}

// Wrap WorkshopInner with ProjectProvider so form engine has access to project context
export default function Workshop() {
	return (
		<StyleProvider>
			<ProjectProvider>
				<WorkshopInner />
			</ProjectProvider>
		</StyleProvider>
	);
}
