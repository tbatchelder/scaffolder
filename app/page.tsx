// export default function Home() {
// 	return (
// 		<>
// 			<header className="gradient-diagonal">
// 				<Image src="/beam-logo.svg" className="logo" alt="Logo" width={30} height={30} />
// 				<Image src="/logo.png" className="logo" alt="Logo" width={30} height={30} />
// 				<h1>Scaffolder</h1>
// 			</header>
// 			<Image src="/hero.png" alt="Hero Image" width={600} height={600} />
// 		</>
// 	);
// }

'use client';

import { useState } from 'react';
import HeroLogin from './components/HeroLogin';
import ProjectDropdown from './components/Header/ProjectDropdown';
import GlobalSettings from './components/Header/Settings';
import UserProfile from './components/Header/UserProfile';
import Image from 'next/image';

export default function ScaffolderPage() {
	// Always starts as null. No memory, no unauthorized access.
	const [currentUser, setCurrentUser] = useState<string | null>(null);

	/**
	 * Handles folder verification and session start.
	 * This runs every time the user enters their name.
	 */
	const handleLogin = async (username: string) => {
		try {
			if (!username.trim()) return;

			// Tell Electron to find or create the workshop folder for this specific user
			const success = await window.electronAPI.createUserID(username);

			if (success) {
				// Log them in for this session only
				setCurrentUser(username);
			} else {
				// Slightly humorous error handling for the user
				alert("The workshop door is jammed. Couldn't verify your user folder.");
			}
		} catch (error) {
			console.error('Login sequence failed:', error);
		}
	};

	const handleLogout = () => {
		// Immediate wipe of session state
		setCurrentUser(null);
	};

	return (
		<>
			{!currentUser ? (
				<HeroLogin onLogin={handleLogin} />
			) : (
				<div className="flex flex-col h-screen bg-stone-50 text-stone-900">
					{/* --- HEADER --- */}
					<header className="flex items-center justify-between gradient-diagonal">
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								{/* Visual "Branding" baked in */}
								<Image src="/beam-logo.svg" className="logo" alt="Logo" width={30} height={30} />
								<Image src="/logo.png" className="logo" alt="Logo" width={30} height={30} />
								<h1 className="headerTitle">Scaffolder</h1>
							</div>
							<div className="h-6 w-px bg-stone-300 mx-2" />
							<ProjectDropdown currentUser={currentUser} />
						</div>

						<div className="flex items-center gap-4">
							<GlobalSettings />
							<UserProfile username={currentUser} onLogout={handleLogout} />
						</div>
					</header>

					{/* --- MAIN WORKSHOP AREA --- */}
					<main className="flex flex-1 overflow-hidden">
						{/* Nav and Work Area go here in the next phase */}
						<div className="flex-1 flex flex-col items-center justify-center text-stone-400">
							<p className="italic">Workshop is open, {currentUser}.</p>
							<p className="text-sm">Select a project above to get to work.</p>
						</div>
					</main>
				</div>
			)}
		</>
	);
}
