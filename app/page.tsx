'use client';

import { useState, useEffect } from 'react';
import { theme } from './lib/theme';
import { MOCK_USERS } from './lib/mockData';
import HeroStage from './components/Login/HeroStage';
import ViewContainer from './components/Login/ViewContainer';
import FirstRunPanel from './components/Login/FirstRunPanel';
import NewSitePanel from './components/Login/NewSitePanel';
import GPSPanel from './components/Login/GPSPanel';
import ClockInPanel from './components/Login/ClockInPanel';

export default function Home() {
	const [isOpened, setIsOpened] = useState(false);
	const [showHero, setShowHero] = useState(true);
	const [currentUser, setCurrentUser] = useState<string | null>(null);
	const [hasPersistentData, setHasPersistentData] = useState(false);

	const [currentView, setCurrentView] = useState<
		'gate' | 'first-run' | 'new-site' | 'gps' | 'clock-in' | 'workshop'
	>('gate');

	// ─── ONE-WAY GATE FLOW ───────────────────────────────────────────────────
	// Once the hero doors open, we transition away from the gate forever (until restart).
	// Timeline:
	//   0ms: User clicks → isOpened = true → doors slide open
	//   700ms: Doors fully open → fade out hero
	//   1000ms: Hero gone → fade in the next view (FirstRun or ClockIn)
	// ─────────────────────────────────────────────────────────────────────────

	useEffect(() => {
		if (isOpened) {
			// Wait for door animation to finish (700ms) + breathing room (200ms)
			const heroFadeTimer = setTimeout(() => {
				setShowHero(false);
				// Determine where the user goes after passing through the gate
				setCurrentView(hasPersistentData ? 'clock-in' : 'first-run');
			}, 900);

			return () => clearTimeout(heroFadeTimer);
		}
	}, [isOpened, hasPersistentData]);

	// ─── MAIN RENDER ────────────────────────────────────────────────────────
	return (
		<main
			className="min-h-screen flex items-center justify-center gradient-diagonal relative"
			style={{
				backgroundColor: theme.layout.background,
				color: theme.palette.silver,
			}}
		>
			{/* ═══ THE GATE (ONE-WAY) ════════════════════════════════════════ */}
			{showHero && (
				<div
					className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
					style={{ opacity: isOpened && !showHero ? 0 : 1 }}
				>
					<HeroStage isOpen={isOpened} onOpen={() => setIsOpened(true)}>
						{/* Content behind the doors (not visible until open due to door images covering) */}
						<div className="opacity-0">Placeholder</div>
					</HeroStage>

					{/* Instruction text */}
					{!isOpened && (
						<div className="fixed bottom-10 animate-bounce text-white font-bold uppercase tracking-widest opacity-50">
							Click to Start Scaffolding
						</div>
					)}
				</div>
			)}

			{/* ═══ POST-GATE VIEWS (FADE IN AFTER HERO EXITS) ════════════════ */}
			{!showHero && (
				<div className="animate-in fade-in duration-500" style={{ animationDelay: '100ms' }}>
					{currentView === 'first-run' && (
						<ViewContainer backgroundImage="/first-gps.png">
							<FirstRunPanel
								onNew={() => setCurrentView('new-site')}
								onGPS={() => setCurrentView('gps')}
							/>
						</ViewContainer>
					)}

					{currentView === 'new-site' && (
						<ViewContainer backgroundImage="/new-site.png">
							<div className="text-center">
								<h2 className="text-3xl font-black uppercase text-white mb-4">
									Welcome to your new construction site
								</h2>
								<p className="text-sm opacity-70 text-white mb-6">
									Tell us your name and were to start building
								</p>
								<button
									className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors border border-white/30 text-white font-bold uppercase text-sm"
									onClick={() => setCurrentView('first-run')}
								>
									← Back
								</button>
							</div>
						</ViewContainer>
					)}

					{currentView === 'gps' && (
						<ViewContainer backgroundImage="/gps.png">
							<div className="text-center">
								<h2 className="text-3xl font-black uppercase text-white mb-4">
									GPS — Locate Existing Site
								</h2>
								<p className="text-sm opacity-70 text-white mb-6">
									Point us to your project folder
								</p>
								<button
									className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors border border-white/30 text-white font-bold uppercase text-sm"
									onClick={() => setCurrentView('first-run')}
								>
									← Back
								</button>
							</div>
						</ViewContainer>
					)}

					{currentView === 'clock-in' && (
						<ViewContainer backgroundImage="/clock-in-background.png">
							<div className="text-center">
								<h2 className="text-3xl font-black uppercase text-white mb-4">
									Clock In Personnel
								</h2>
								<p className="text-sm opacity-70 text-white mb-6">
									Select your user to enter the workshop
								</p>
								{/* User selection cards would go here */}
								<button
									className="mt-4 px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors border border-white/30 text-white font-bold uppercase text-sm"
									onClick={() => setCurrentView('workshop')}
								>
									Enter Workshop
								</button>
							</div>
						</ViewContainer>
					)}

					{currentView === 'workshop' && (
						<div className="absolute inset-0 w-screen h-screen">
							{/* Full app UI here - no ViewContainer */}
							<WorkshopApp currentUser={currentUser} />
						</div>
					)}
				</div>
			)}

			{/* ═══ DEBUG TOOLBELT ════════════════════════════════════════════ */}
			<div
				className="fixed bottom-4 left-4 p-4 border-2 border-dashed opacity-30 hover:opacity-100 transition-opacity bg-black text-[10px] font-mono z-50"
				style={{ borderColor: theme.palette.dragonYellow }}
			>
				<p className="mb-2 text-dragon-yellow uppercase font-bold text-center">Admin Debug</p>
				<div className="flex flex-col gap-2">
					<button onClick={() => setHasPersistentData(!hasPersistentData)}>
						TOGGLE DATA: {hasPersistentData ? 'YES' : 'NO'}
					</button>
					<button
						onClick={() => {
							if (currentUser) setCurrentUser(null);
							else setCurrentUser(MOCK_USERS[0].username);
						}}
					>
						USER: {currentUser ?? 'NONE'}
					</button>
					<button
						onClick={() => {
							setShowHero(true);
							setIsOpened(false);
							setCurrentView('gate');
						}}
					>
						RESET TO GATE
					</button>
					<button onClick={() => setCurrentView('first-run')}>VIEW: FIRST RUN</button>
					<button onClick={() => setCurrentView('gps')}>VIEW: GPS</button>
					<button onClick={() => setCurrentView('clock-in')}>VIEW: CLOCK IN</button>
					<button onClick={() => setCurrentView('workshop')}>VIEW: WORKSHOP</button>
					<button
						onClick={() => {
							localStorage.clear();
							window.location.reload();
						}}
					>
						FULL RESET
					</button>
				</div>
			</div>
		</main>
	);
}
