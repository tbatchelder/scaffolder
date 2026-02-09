'use client';

import { useState } from 'react';
import Image from 'next/image';
import { theme } from '../lib/theme'; // Adjust path based on your folder structure

interface HeroLoginProps {
	onLogin: (username: string) => void;
}

export default function HeroLogin({ onLogin }: HeroLoginProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [username, setUsername] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (username.trim()) {
			onLogin(username.trim());
		}
	};

	return (
		<div
			className="relative flex flex-col items-center justify-center min-h-screen gradient-diagonal overflow-hidden"
			style={{ backgroundColor: theme.layout.background }}
		>
			{/* --- HERO IMAGE --- */}
			<div
				className="relative z-10 mb-8 shadow-2xl rounded-xl overflow-hidden border"
				style={{ borderColor: theme.palette.silver2 }}
			>
				<Image
					src="/hero.png"
					alt="Scaffolder Hero"
					width={600}
					height={600}
					priority
					className="object-cover"
				/>
			</div>

			{/* --- CTA BUTTON --- */}
			<button
				onClick={() => setIsModalOpen(true)}
				className="z-10 px-8 py-3 font-black uppercase tracking-widest rounded shadow-lg transition-all duration-200 active:scale-95 border-2"
				style={{
					backgroundColor: theme.palette.dragonOrange,
					color: theme.layout.textOnGradient,
					borderColor: theme.palette.emberBlack,
				}}
			>
				Open Workshop
			</button>

			{/* --- HUMOROUS CAPTION --- */}
			<p className="mt-4 font-medium italic opacity-70" style={{ color: theme.palette.emberBlack }}>
				Measure twice, prompt once.
			</p>

			{/* --- LOGIN MODAL --- */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
					<div
						className="w-full max-w-md p-8 border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
						style={
							{
								backgroundColor: theme.palette.unicornBlue,
								borderColor: theme.palette.emberBlack,
								WebkitAppRegion: 'no-drag',
							} as React.CSSProperties
						}
					>
						<h2
							className="text-2xl font-black uppercase mb-2"
							style={{ color: theme.palette.emberBlack }}
						>
							Identify Yourself
						</h2>
						<p
							className="mb-6 font-bold text-sm opacity-80"
							style={{ color: theme.palette.emberBlack }}
						>
							We need to know which tool-belt to grab.
						</p>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									className="block font-bold mb-1 uppercase text-xs"
									style={{ color: theme.palette.emberBlack }}
								>
									Username
								</label>
								<input
									autoFocus
									type="text"
									value={username}
									onChange={e => setUsername(e.target.value)}
									placeholder="e.g. Master_Builder"
									className="w-full p-3 border-2 focus:outline-none font-bold"
									style={{
										backgroundColor: theme.palette.unicornWhite,
										borderColor: theme.palette.emberBlack,
										color: theme.palette.emberBlack,
									}}
								/>
							</div>

							<div className="flex gap-3 pt-2">
								<button
									type="submit"
									className="flex-1 py-3 font-bold uppercase border-2 hover:brightness-110 active:scale-95 transition-all"
									style={{
										backgroundColor: theme.palette.dragonRed,
										color: theme.palette.unicornWhite,
										borderColor: theme.palette.emberBlack,
									}}
								>
									Enter
								</button>
								<button
									type="button"
									onClick={() => setIsModalOpen(false)}
									className="px-4 py-3 font-bold uppercase border-2 transition-all"
									style={{
										backgroundColor: theme.palette.silver,
										color: theme.palette.emberBlack,
										borderColor: theme.palette.emberBlack,
									}}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
