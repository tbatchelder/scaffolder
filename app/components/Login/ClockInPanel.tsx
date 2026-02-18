'use client';

import React, { useState } from 'react';
import { theme } from '../../lib/theme';
import { useWorkshop, User } from '../../contexts/WorkshopContext';

interface ClockInPanelProps {
	onComplete: () => void; // Selected a user → go to workshop
}

// ─── PUNCH CARD CORNER ───────────────────────────────────────────────────────
// Native corner-shape: bevel — supported in Chromium 133+ (we're on 144, confirmed).
// border-radius sets the cut size; corner-shape makes it a straight diagonal
// instead of the default curve. Only the upper-right corner is beveled.
const BEVEL_SIZE = '22px';

export default function ClockInPanel({ onComplete }: ClockInPanelProps) {
	const { data, setCurrentUser } = useWorkshop();
	const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

	const users: User[] = data.users;

	// ─── BUTTON STYLING ──────────────────────────────────────────────────────
	const buttonBaseStyle = (color: string, disabled = false): React.CSSProperties => ({
		backgroundColor: disabled ? theme.palette.silver2 : color,
		borderColor: theme.palette.emberBlack,
		color: theme.palette.emberBlack,
		boxShadow: disabled
			? 'none'
			: `inset 2px 2px 3px rgba(255,255,255,0.3),
			   inset -2px -2px 5px rgba(0,0,0,0.4),
			   5px 5px 10px -2px rgba(0,0,0,0.5)`,
		cursor: disabled ? 'not-allowed' : 'pointer',
		opacity: disabled ? 0.5 : 1,
		position: 'relative',
		transition: 'all 0.1s ease-in-out',
	});

	// ─── PUNCH CARD STYLES ───────────────────────────────────────────────────
	// clip-path cuts the upper-right corner at BEVEL px to simulate a punched card.
	// calc() lets the right edge stay responsive while the cut stays fixed-size.
	const punchCardStyle = (isSelected: boolean): React.CSSProperties => ({
		// Standard rounding on all corners except upper-right
		borderRadius: `12px ${BEVEL_SIZE} 12px 12px`,
		// corner-shape: bevel turns the upper-right radius into a straight diagonal cut.
		// TypeScript doesn't know this property yet so we cast it.
		['cornerShape' as string]: 'bevel',
		backgroundColor: isSelected ? theme.palette.dragonOrange : 'rgba(255,255,255,0.82)',
		border: `2px solid ${isSelected ? theme.palette.emberBlack : theme.palette.ember2}`,
		boxShadow: isSelected
			? `inset 2px 2px 3px rgba(255,255,255,0.3),
			   inset -2px -2px 5px rgba(0,0,0,0.4),
			   5px 5px 10px -2px rgba(0,0,0,0.5)`
			: `3px 3px 8px rgba(0,0,0,0.3)`,
		cursor: 'pointer',
		transition: 'all 0.15s ease-in-out',
		transform: isSelected ? 'translateY(1px) translateX(0.5px)' : 'none',
	});

	// ─── HANDLERS ────────────────────────────────────────────────────────────

	const handleSelect = (username: string) => {
		setSelectedUsername(prev => (prev === username ? null : username));
	};

	const handleClockIn = () => {
		if (!selectedUsername) return;
		setCurrentUser(selectedUsername);
		onComplete();
	};

	// ─── RENDER ──────────────────────────────────────────────────────────────

	return (
		<div className="w-full flex flex-col items-center justify-center gap-5 px-4">
			{/* Title */}
			<div className="text-center">
				<h2 className="textOutline text-3xl font-black uppercase tracking-tight text-white mb-1">
					Clock In
				</h2>
				<p className="text-sm font-bold" style={{ color: theme.palette.dragonYellow }}>
					Select your card to enter the workshop
				</p>
			</div>

			{/* User Cards */}
			<div className="w-full max-w-md flex flex-col gap-3">
				{users.length === 0 && (
					<p className="text-center text-sm" style={{ color: theme.palette.silver }}>
						No users found. Something may have gone wrong loading your site data.
					</p>
				)}

				{users.map(user => {
					const isSelected = selectedUsername === user.username;

					return (
						<button
							key={user.username}
							onClick={() => handleSelect(user.username)}
							className="w-full text-left px-5 py-4 transition-all duration-150 hover:brightness-105"
							style={punchCardStyle(isSelected)}
						>
							{/* Card inner layout */}
							<div className="flex items-center justify-between">
								{/* Left: user info */}
								<div className="flex flex-col gap-0.5">
									<span
										className="font-black uppercase tracking-tight text-base leading-tight"
										style={{ color: theme.palette.emberBlack }}
									>
										{user.username}
									</span>
									<span
										className="text-xs font-semibold uppercase tracking-wider"
										style={{ color: theme.palette.ember2 }}
									>
										Last: {user.lastProject}
									</span>
									<span className="text-xs" style={{ color: theme.palette.ember2, opacity: 0.7 }}>
										{user.projects.length} project{user.projects.length !== 1 ? 's' : ''}
									</span>
								</div>

								{/* Right: selected indicator + bevel note area */}
								<div className="flex flex-col items-end justify-between self-stretch">
									{/* Selection pill */}
									<div
										className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full transition-all duration-150"
										style={{
											backgroundColor: isSelected ? theme.palette.emberBlack : 'rgba(0,0,0,0.08)',
											color: isSelected ? theme.palette.dragonOrange : theme.palette.ember2,
										}}
									>
										{isSelected ? '✓ Selected' : 'Tap to select'}
									</div>

									{/* Punch holes — decorative, bottom-right area */}
									<div className="flex gap-1.5 opacity-30 mt-2">
										{[...Array(4)].map((_, i) => (
											<div
												key={i}
												className="w-2 h-2 rounded-full"
												style={{ backgroundColor: theme.palette.emberBlack }}
											/>
										))}
									</div>
								</div>
							</div>

							{/* Card bottom stripe — like a punch card data band */}
							<div
								className="absolute bottom-0 left-0 right-0 h-1 rounded-b"
								style={{
									background: isSelected
										? `linear-gradient(to right, ${theme.palette.emberBlack}, ${theme.palette.ember2})`
										: `linear-gradient(to right, ${theme.palette.ember2}44, ${theme.palette.emberBlack}22)`,
								}}
							/>
						</button>
					);
				})}
			</div>

			{/* Clock In Button */}
			<div className="w-full max-w-md">
				<button
					onClick={handleClockIn}
					disabled={!selectedUsername}
					className="relative w-full py-3 px-6 rounded-xl border-2 font-black uppercase tracking-tighter text-sm transition-all duration-75 hover:brightness-110 disabled:hover:brightness-100 active:translate-y-px active:translate-x-0.5"
					style={buttonBaseStyle(theme.palette.dragonOrange, !selectedUsername)}
				>
					<div className="absolute inset-0 opacity-20 bg-[url('/carbon-fibre.png')] rounded-xl pointer-events-none" />
					<span className="relative z-10">
						{selectedUsername ? `Clock In as ${selectedUsername} →` : 'Select a user to clock in'}
					</span>
				</button>
			</div>
		</div>
	);
}
