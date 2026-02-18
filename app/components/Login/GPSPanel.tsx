'use client';

import React, { useState } from 'react';
import { theme } from '../../lib/theme';
import { useWorkshop } from '../../contexts/WorkshopContext';

interface GPSPanelProps {
	onFound: () => void; // Scaffolder folder found & loaded → go to clock-in
	onNotFound: () => void; // No Scaffolder folder found → go to new-site
	onBack: () => void; // Back to first-run
}

type ScanStatus = 'idle' | 'found' | 'no-scaffolder' | 'invalid';

export default function GPSPanel({ onFound, onNotFound, onBack }: GPSPanelProps) {
	const { setRootPath, setUsers } = useWorkshop();

	const [folderPath, setFolderPath] = useState('');
	const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');

	// ─── BUTTON STYLING ──────────────────────────────────────────────────────
	const buttonBaseStyle = (color: string, disabled: boolean = false): React.CSSProperties => ({
		backgroundColor: disabled ? theme.palette.silver2 : color,
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
		// TODO: Replace with Electron dialog when ready:
		// const result = await window.electronAPI.selectFolder();
		const mockPath = prompt('Enter folder path to scan (mock):') || '';
		if (!mockPath) return;

		setFolderPath(mockPath);
		setScanStatus('idle');
	};

	const handleScan = () => {
		if (!folderPath) return;

		// TODO: Replace with real Electron filesystem scan:
		// const result = await window.electronAPI.scanForScaffolder(folderPath);
		//
		// Real logic will:
		//   1. Check if selected folder IS the BEAM folder or contains one
		//   2. Look for a /Scaffolder subfolder inside BEAM
		//   3. Scan /Scaffolder/users/ for user directories
		//   4. Read each user's projects.json to build the users array
		//
		// Mock: simulate finding Scaffolder with users
		const mockFound = folderPath.toLowerCase().includes('beam');

		if (mockFound) {
			// Mock user data that would come from scanning the folder
			setRootPath(folderPath + '/Scaffolder');
			setUsers([
				{ username: 'Chief_Architect', lastProject: 'Block_A', projects: ['Block_A', 'Block_B'] },
				{ username: 'Site_Foreman', lastProject: 'Block_B', projects: ['Block_B'] },
			]);
			setScanStatus('found');
		} else {
			setScanStatus('no-scaffolder');
		}
	};

	// ─── STATUS MESSAGES ─────────────────────────────────────────────────────

	const statusConfig = {
		found: {
			bg: 'rgba(46,204,113,0.15)',
			border: theme.semantic.success,
			color: theme.semantic.success,
			message: 'Scaffolder folder found! Your users and projects have been loaded.',
		},
		'no-scaffolder': {
			bg: 'rgba(243,156,18,0.15)',
			border: theme.semantic.warning,
			color: theme.semantic.warning,
			message:
				'No Scaffolder folder found inside that BEAM folder. You may need to set up a new site instead.',
		},
		invalid: {
			bg: 'rgba(231,76,60,0.15)',
			border: theme.semantic.danger,
			color: theme.semantic.danger,
			message:
				"That doesn't look like a BEAM folder. Try navigating into the BEAM folder directly.",
		},
	};

	// ─── RENDER ──────────────────────────────────────────────────────────────

	return (
		<div className="w-full flex flex-col items-center justify-center gap-5 px-4">
			{/* Title */}
			<div className="text-center">
				<h2 className="textOutline text-3xl font-black uppercase tracking-tight text-white mb-1">
					GPS Your Lost Site
				</h2>
				<p style={{ color: theme.palette.dragonYellow }} className="text-sm font-bold">
					Point us to your wayward project folder
				</p>
			</div>

			{/* Instructions box */}
			<div
				className="w-full max-w-md rounded-xl border-2 px-5 py-4 text-sm space-y-2"
				style={{
					backgroundColor: 'rgba(0,0,0,0.45)',
					borderColor: theme.palette.ember2,
					color: theme.palette.silver,
				}}
			>
				<p
					className="font-black uppercase tracking-wide text-xs"
					style={{ color: theme.palette.dragonYellow }}
				>
					What to look for:
				</p>
				<ul className="space-y-1.5 list-none">
					<li className="flex items-start gap-2">
						<span style={{ color: theme.palette.dragonOrange }}>→</span>
						<span>
							Navigate to your <strong className="text-white">BEAM</strong> folder, then look for a{' '}
							<strong className="text-white">Scaffolder</strong> subfolder inside it.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span style={{ color: theme.palette.dragonOrange }}>→</span>
						<span>
							Select the <strong className="text-white">BEAM</strong> folder and we will handle the
							rest.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span style={{ color: theme.palette.unicornBlue }}>!</span>
						<span>
							If there is no Scaffolder folder inside BEAM, it may belong to another product. Use{' '}
							<strong className="text-white">New Site</strong> to set one up.
						</span>
					</li>
				</ul>
			</div>

			{/* Folder Browse Row */}
			<div className="w-full max-w-md">
				<label
					className="block text-sm font-black mb-2 uppercase tracking-wide"
					style={{ color: theme.palette.emberBlack }}
				>
					BEAM Folder Location
				</label>
				<div className="flex gap-2">
					<input
						type="text"
						value={folderPath}
						readOnly
						placeholder="No folder selected"
						className="flex-1 px-4 py-3 rounded-lg border-2 cursor-not-allowed text-sm"
						style={{
							backgroundColor: 'rgba(255,255,255,0.55)',
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
			</div>

			{/* Status message */}
			{scanStatus !== 'idle' && (
				<div
					className="w-full max-w-md px-4 py-3 rounded-lg border-2 text-sm font-semibold"
					style={{
						backgroundColor: statusConfig[scanStatus].bg,
						borderColor: statusConfig[scanStatus].border,
						color: statusConfig[scanStatus].color,
					}}
				>
					{statusConfig[scanStatus].message}
				</div>
			)}

			{/* Action Buttons */}
			<div className="w-full max-w-md flex gap-3">
				<button
					onClick={onBack}
					className="px-5 py-3 rounded-lg border-2 font-bold uppercase text-sm transition-all hover:brightness-110 active:translate-y-px"
					style={buttonBaseStyle(theme.palette.silver)}
				>
					<div className="absolute inset-0 opacity-20 bg-[url('/carbon-fibre.png')] rounded-xl pointer-events-none" />
					← Back
				</button>

				{/* Scan button — shows until we have a result */}
				{scanStatus === 'idle' && (
					<button
						onClick={handleScan}
						disabled={!folderPath}
						className="relative flex-1 py-3 px-4 rounded-lg border-2 font-black uppercase text-sm transition-all hover:brightness-110 disabled:hover:brightness-100 active:translate-y-px"
						style={buttonBaseStyle(theme.palette.dragonYellow, !folderPath)}
					>
						<div className="absolute inset-0 opacity-20 bg-[url('/carbon-fibre.png')] rounded-lg pointer-events-none" />
						<span className="relative z-10">Scan for Scaffolder</span>
					</button>
				)}

				{/* Found → proceed to clock-in */}
				{scanStatus === 'found' && (
					<button
						onClick={onFound}
						className="relative flex-1 py-3 px-4 rounded-lg border-2 font-black uppercase text-sm transition-all hover:brightness-110 active:translate-y-px"
						style={buttonBaseStyle(theme.palette.dragonOrange)}
					>
						<div className="absolute inset-0 opacity-20 bg-[url('/carbon-fibre.png')] rounded-lg pointer-events-none" />
						<span className="relative z-10">Clock In →</span>
					</button>
				)}

				{/* No scaffolder → nudge toward new site */}
				{scanStatus === 'no-scaffolder' && (
					<button
						onClick={onNotFound}
						className="relative flex-1 py-3 px-4 rounded-lg border-2 font-black uppercase text-sm transition-all hover:brightness-110 active:translate-y-px"
						style={buttonBaseStyle(theme.palette.dragonOrange)}
					>
						<div className="absolute inset-0 opacity-20 bg-[url('/carbon-fibre.png')] rounded-lg pointer-events-none" />
						<span className="relative z-10">Set Up New Site →</span>
					</button>
				)}

				{/* Invalid folder → let them try again */}
				{scanStatus === 'invalid' && (
					<button
						onClick={() => {
							setFolderPath('');
							setScanStatus('idle');
						}}
						className="relative flex-1 py-3 px-4 rounded-lg border-2 font-black uppercase text-sm transition-all hover:brightness-110 active:translate-y-px"
						style={buttonBaseStyle(theme.palette.silver)}
					>
						<span className="relative z-10">Try Again</span>
					</button>
				)}
			</div>
		</div>
	);
}
