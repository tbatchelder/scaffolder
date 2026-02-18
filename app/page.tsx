'use client';

import { useState, useEffect } from 'react';
import { theme } from './lib/theme';
import { useWorkshop } from './contexts/WorkshopContext';
import HeroStage from './components/Login/HeroStage';
import FirstRunPanel from './components/Login/FirstRunPanel';
import ViewContainer from './components/Login/ViewContainer';
import NewSitePanel from './components/Login/NewSitePanel';
import GPSPanel from './components/Login/GPSPanel';
import ClockInPanel from './components/Login/ClockInPanel';

export default function Home() {
	// ─── WORKSHOP CONTEXT ────────────────────────────────────────────────────
	// const { hasPersistentData, isLoggedIn, getCurrentUserData } = useWorkshop();
	const { hasPersistentData, getCurrentUserData, reset, setRootPath, setUsers } = useWorkshop();

	// ─── LOCAL UI STATE ──────────────────────────────────────────────────────
	const [isOpened, setIsOpened] = useState(false);
	const [showHero, setShowHero] = useState(true);

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
	const currentUserData = getCurrentUserData();

	// ─── DEBUG HELPERS ───────────────────────────────────────────────────────
	// Jump directly to any view, bypassing the hero gate entirely
	const debugGoTo = (view: typeof currentView) => {
		setShowHero(false);
		setIsOpened(false);
		setCurrentView(view);
	};

	// Seed mock persistent data so clock-in can be tested without going through GPS
	const debugSeedData = () => {
		setRootPath('/mock/BEAM/Scaffolder');
		setUsers([
			{ username: 'Chief_Architect', lastProject: 'Block_A', projects: ['Block_A', 'Block_B'] },
			{ username: 'Site_Foreman', lastProject: 'Block_B', projects: ['Block_B'] },
			{ username: 'Apprentice', lastProject: 'Block_A', projects: ['Block_A'] },
		]);
	};

	// Full wipe — clears context + localStorage then reloads
	const debugFullReset = () => {
		reset();
		window.location.reload();
	};

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
							Click to Open Workshop
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
							<NewSitePanel
								onComplete={() => setCurrentView('workshop')}
								onBack={() => setCurrentView('first-run')}
							/>
						</ViewContainer>
					)}

					{currentView === 'gps' && (
						<ViewContainer backgroundImage="/gps.png">
							<GPSPanel
								onFound={() => setCurrentView('clock-in')}
								onNotFound={() => setCurrentView('new-site')}
								onBack={() => setCurrentView('first-run')}
							/>
						</ViewContainer>
					)}

					{currentView === 'clock-in' && (
						<ViewContainer backgroundImage="/clock-in.png">
							<ClockInPanel onComplete={() => setCurrentView('workshop')} />
						</ViewContainer>
					)}

					{/* WORKSHOP — FULLSCREEN, NO VIEWCONTAINER */}
					{currentView === 'workshop' && (
						<div className="absolute inset-0 w-screen h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
							<div className="w-full h-full flex items-center justify-center">
								<div className="text-center">
									<h1 className="text-5xl font-black uppercase text-white mb-4">Workshop Active</h1>
									{currentUserData && (
										<>
											<p className="text-xl text-white/70 mb-2">
												Logged in as{' '}
												<span className="text-white font-bold">{currentUserData.username}</span>
											</p>
											<p className="text-sm text-white/50">
												Last Project: {currentUserData.lastProject}
											</p>
										</>
									)}
									<p className="text-sm opacity-50 mt-8 italic text-white/30">
										Main app interface goes here
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			)}

			{/* ═══ DEBUG TOOLBELT ════════════════════════════════════════════ */}
			<div
				className="fixed bottom-4 left-4 p-4 border-2 border-dashed opacity-30 hover:opacity-100 transition-opacity bg-black text-[10px] font-mono z-50"
				style={{ borderColor: theme.palette.dragonYellow }}
			>
				<p
					className="mb-2 uppercase font-bold text-center"
					style={{ color: theme.palette.dragonYellow }}
				>
					Admin Debug
				</p>

				{/* Status readout */}
				<div className="mb-3 space-y-0.5 text-white/60 border-b border-white/10 pb-2">
					<p>
						HERO: {showHero ? 'VISIBLE' : 'GONE'} / OPENED: {isOpened ? 'YES' : 'NO'}
					</p>
					<p>VIEW: {currentView.toUpperCase()}</p>
					<p>DATA: {hasPersistentData ? 'YES' : 'NO'}</p>
					<p>USER: {getCurrentUserData()?.username ?? 'NONE'}</p>
				</div>

				{/* View jumping — bypasses hero gate entirely */}
				<div className="flex flex-col gap-1.5">
					<p className="text-white/40 uppercase text-[9px] tracking-wider">Jump to view</p>
					<button
						className="text-left px-2 py-1 hover:bg-white/10 rounded transition-colors text-white/70"
						onClick={() => {
							setShowHero(true);
							setIsOpened(false);
							setCurrentView('gate');
						}}
					>
						→ GATE (reset hero)
					</button>
					<button
						className="text-left px-2 py-1 hover:bg-white/10 rounded transition-colors text-white/70"
						onClick={() => debugGoTo('first-run')}
					>
						→ FIRST RUN
					</button>
					<button
						className="text-left px-2 py-1 hover:bg-white/10 rounded transition-colors text-white/70"
						onClick={() => debugGoTo('new-site')}
					>
						→ NEW SITE
					</button>
					<button
						className="text-left px-2 py-1 hover:bg-white/10 rounded transition-colors text-white/70"
						onClick={() => debugGoTo('gps')}
					>
						→ GPS
					</button>
					<button
						className="text-left px-2 py-1 hover:bg-white/10 rounded transition-colors text-white/70"
						onClick={() => debugGoTo('clock-in')}
					>
						→ CLOCK IN
					</button>
					<button
						className="text-left px-2 py-1 hover:bg-white/10 rounded transition-colors text-white/70"
						onClick={() => debugGoTo('workshop')}
					>
						→ WORKSHOP
					</button>

					{/* Data controls */}
					<p className="text-white/40 uppercase text-[9px] tracking-wider mt-2">Data controls</p>
					<button
						className="text-left px-2 py-1 hover:bg-white/10 rounded transition-colors"
						style={{ color: theme.palette.dragonYellow }}
						onClick={debugSeedData}
					>
						⚡ SEED MOCK USERS
					</button>
					<button
						className="text-left px-2 py-1 hover:bg-white/10 rounded transition-colors"
						style={{ color: theme.palette.dragonRed }}
						onClick={debugFullReset}
					>
						✕ FULL RESET
					</button>
				</div>
			</div>
		</main>
	);
}
