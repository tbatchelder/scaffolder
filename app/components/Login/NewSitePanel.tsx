'use client';

import React, { useState } from 'react';
import { theme } from '../../lib/theme';
import { useWorkshop } from '../../contexts/WorkshopContext';

// Colour guide for this panel:
// All text/labels → emberBlack (#1a1a1a) — dark enough to read on the white/blue background image
// Input borders   → ember2 (#2a2a2a)
// Input bg        → semi-transparent white so the background image shows through softly

interface NewSitePanelProps {
	onComplete: () => void; // Called when setup is complete → navigate to workshop
	onBack: () => void; // Back to FirstRunPanel
}

export default function NewSitePanel({ onComplete, onBack }: NewSitePanelProps) {
	const { setRootPath, addUser, setCurrentUser } = useWorkshop();

	const [username, setUsername] = useState('');
	const [folderPath, setFolderPath] = useState('');
	const [error, setError] = useState('');

	// ─── BUTTON STYLING ──────────────────────────────────────────────────────
	const buttonBaseStyle = (color: string, disabled: boolean = false): React.CSSProperties => ({
		backgroundColor: disabled ? theme.palette.silver : color,
		borderColor: theme.palette.emberBlack,
		color: theme.palette.emberBlack,
		boxShadow: disabled
			? 'none'
			: `
		    inset 2px 2px 3px rgba(255,255,255,0.3),
		    inset -2px -2px 5px rgba(0,0,0,0.4),
		    5px 5px 10px -2px rgba(0,0,0,0.5)
		  `,
		cursor: disabled ? 'not-allowed' : 'pointer',
		opacity: disabled ? 0.5 : 1,
		position: 'relative',
		transition: 'all 0.1s ease-in-out',
	});

	// ─── HANDLERS ────────────────────────────────────────────────────────────

	const handleFolderSelect = () => {
		// TODO: When Electron integration is ready, this will open a folder picker dialog
		// For now, we'll mock it with a prompt
		const mockPath = prompt('Enter a folder path (mock):') || '';
		if (mockPath) {
			setFolderPath(mockPath);
			setError('');
		}
	};

	const handleSubmit = () => {
		// Validation
		if (!username.trim()) {
			setError('Username is required');
			return;
		}
		if (!folderPath.trim()) {
			setError('Folder location is required');
			return;
		}

		// Save to context
		setRootPath(folderPath);
		addUser({
			username: username.trim(),
			lastProject: 'default', // First project is always "default"
			projects: ['default'],
		});
		setCurrentUser(username.trim()); // Auto-login the first user

		// Navigate to workshop
		onComplete();
	};

	const isValid = username.trim() && folderPath.trim();

	// ─── RENDER ──────────────────────────────────────────────────────────────

	return (
		<div className="w-full flex flex-col items-center justify-center gap-6 px-4">
			<div className="text-center mb-2">
				<h2 className="text-3xl font-black text-white uppercase tracking-tight mb-1 textOutline">
					New Construction Site
				</h2>
				<p className="text-sm font-semibold" style={{ color: theme.palette.ember2 }}>
					Set up your workshop
				</p>
			</div>

			{/* Error message */}
			{error && (
				<div
					className="w-full max-w-md px-4 py-2 rounded-lg border-2 text-sm text-center font-bold"
					style={{
						backgroundColor: 'rgba(211,47,47,0.12)',
						borderColor: theme.semantic.danger,
						color: theme.semantic.danger,
					}}
				>
					{error}
				</div>
			)}

			{/* Form */}
			<div className="w-full max-w-md space-y-4">
				{/* Username Input */}
				<div>
					<label
						className="block text-sm font-black mb-2 uppercase tracking-wide"
						style={{ color: theme.palette.emberBlack }}
					>
						Your Name
					</label>
					<input
						type="text"
						value={username}
						onChange={e => {
							setUsername(e.target.value);
							setError('');
						}}
						placeholder="Chief_Architect"
						className="w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none"
						style={{
							backgroundColor: 'rgba(255,255,255,0.55)',
							borderColor: theme.palette.ember2,
							color: theme.palette.emberBlack,
						}}
						onKeyDown={e => {
							if (e.key === 'Enter' && isValid) handleSubmit();
						}}
					/>
					<p className="text-xs font-semibold mt-1" style={{ color: theme.palette.dragonYellow }}>
						This will be your username
					</p>
				</div>

				{/* Folder Selection */}
				<div>
					<label
						className="block text-sm font-black mb-2 uppercase tracking-wide"
						style={{ color: theme.palette.emberBlack }}
					>
						Project Folder
					</label>
					<div className="flex gap-2">
						<input
							type="text"
							value={folderPath}
							readOnly
							placeholder="No folder selected"
							className="flex-1 px-4 py-3 rounded-lg border-2 cursor-not-allowed"
							style={{
								backgroundColor: 'rgba(255,255,255,0.35)',
								borderColor: theme.palette.ember2,
								color: folderPath ? theme.palette.emberBlack : theme.palette.silver2,
							}}
						/>
						<button
							onClick={handleFolderSelect}
							className="px-4 py-3 rounded-lg border-2 font-bold uppercase text-sm transition-all hover:brightness-110 active:translate-y-px"
							style={buttonBaseStyle(theme.palette.unicornBlue)}
						>
							<div className="absolute inset-0 opacity-20 bg-[url('/carbon-fibre.png')] rounded-xl pointer-events-none" />
							Browse
						</button>
					</div>
					<p className="text-xs font-semibold mt-1" style={{ color: theme.palette.dragonYellow }}>
						Where your workshop files will live
					</p>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="w-full max-w-md flex gap-4 mt-4">
				<button
					onClick={onBack}
					className="px-6 py-3 rounded-lg border-2 font-bold uppercase text-sm transition-all hover:brightness-110 active:translate-y-px"
					style={buttonBaseStyle(theme.palette.silver)}
				>
					<div className="absolute inset-0 opacity-20 bg-[url('/carbon-fibre.png')] rounded-xl pointer-events-none" />
					← Back
				</button>

				<button
					onClick={handleSubmit}
					disabled={!isValid}
					className="relative flex-1 px-6 py-3 rounded-lg border-2 font-black uppercase text-sm transition-all hover:brightness-110 disabled:hover:brightness-100 active:translate-y-px"
					style={buttonBaseStyle(theme.palette.dragonOrange, !isValid)}
				>
					{/* Texture overlay */}
					<div className="absolute inset-0 opacity-20 bg-[url('/carbon-fibre.png')] rounded-lg pointer-events-none" />
					<span className="relative z-10">Create Site & Enter Workshop</span>
				</button>
			</div>
		</div>
	);
}
