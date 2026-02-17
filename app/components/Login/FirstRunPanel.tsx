'use client';

import React from 'react';
import { theme } from '../../lib/theme';

interface FirstRunPanelProps {
	onNew: () => void;
	onGPS: () => void;
}

export default function FirstRunPanel({ onNew, onGPS }: FirstRunPanelProps) {
	// --- BUTTON STYLING ---
	const buttonBaseStyle = (color: string): React.CSSProperties => ({
		backgroundColor: color,
		borderColor: theme.palette.emberBlack,
		color: theme.palette.emberBlack,
		// Layer 1: The "Bevel" (inner light/dark)
		// Layer 2: The "Grit" (inner darker bottom)
		// Layer 3: The "Physical Depth" (outer bottom-right)
		boxShadow: `
    inset 2px 2px 3px rgba(255,255,255,0.3),
    inset -2px -2px 5px rgba(0,0,0,0.4),
    5px 5px 10px -2px rgba(0,0,0,0.5)
  `,
		cursor: 'pointer',
		position: 'relative',
		transition: 'all 0.1s ease-in-out',
	});

	return (
		<div className="w-full flex flex-col items-center justify-center gap-6">
			{/* Optional title or instructions */}
			<div className="text-center mt-72 mb-4">
				<h2 className="text-4xl font-black uppercase tracking-tight text-white mb-2 textOutline">
					Welcome to Scaffolder
				</h2>
				<h4
					className="text-lg font-black uppercase italic tracking-tight textOutline"
					style={{ color: theme.layout.textOnBackground }}
				>
					Before you build, you Scaffold.
				</h4>
			</div>

			{/* Button row */}
			<div className="flex flex-row gap-8 w-full max-w-md">
				{/* NEW CONSTRUCTION BUTTON */}
				<button
					onClick={onNew}
					className="group relative flex-1 py-3 px-4 rounded-xl border-2 font-black uppercase tracking-tighter text-sm transition-all duration-75 hover:brightness-110 hover:translate-y-px active:translate-y-1 active:translate-x-0.5 active:shadow-none"
					style={buttonBaseStyle(theme.palette.dragonOrange)}
				>
					{/* Gritty Texture Overlay */}
					<div className="absolute inset-0 opacity-20 bg-[url('/carbon-fibre.png')] rounded-xl pointer-events-none" />
					<span className="relative z-10 block">New Construction Site</span>
				</button>

				{/* GPS LOCATION BUTTON */}
				<button
					onClick={onGPS}
					className="group relative flex-1 py-3 px-4 rounded-xl border-2 font-black uppercase tracking-tighter text-sm transition-all duration-75 hover:brightness-110 hover:translate-y-px active:translate-y-1 active:translate-x-0.5 active:shadow-none"
					style={buttonBaseStyle(theme.palette.silver)}
				>
					{/* Scratched Metal Texture Overlay */}
					<div className="absolute inset-0 opacity-20 bg-[url('/carbon-fibre.png')] rounded-xl pointer-events-none" />
					<span className="relative z-10 block">GPS Your Lost Site</span>
				</button>
			</div>
		</div>
	);
}
