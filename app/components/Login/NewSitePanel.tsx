'use client';

import { theme } from '../../lib/theme';

export default function NewSitePanel({ onBack }: { onBack: () => void }) {
	return (
		<div className="relative flex flex-col gap-4 animate-in fade-in">
			{/* Back Arrow */}
			<button
				onClick={onBack}
				className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full border-2 font-black hover:bg-black/10"
				style={{ borderColor: theme.palette.emberBlack, color: theme.palette.emberBlack }}
			>
				✕
			</button>

			<div className="flex flex-row gap-2">
				<label className="text-[10px] font-black uppercase opacity-60">Foreman Name</label>
				<input
					type="text"
					className="p-3 rounded-lg border-2 bg-white/10 focus:outline-none focus:ring-2 focus:ring-(--dragon-orange)"
					placeholder="Enter Username..."
				/>

				<label className="text-[10px] font-black uppercase opacity-60">Site Path</label>
				<input
					type="text"
					className="p-3 rounded-lg border-2 bg-white/10 focus:outline-none"
					placeholder="C:/Projects/..."
				/>
			</div>

			<button
				className="mt-2 py-4 rounded-xl border-2 font-black uppercase shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
				style={{ backgroundColor: theme.palette.dragonOrange, color: theme.palette.emberBlack }}
			>
				Initialize BEAM
			</button>
		</div>
	);
}
