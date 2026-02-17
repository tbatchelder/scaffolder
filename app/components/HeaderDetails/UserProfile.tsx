'use client';

import { theme } from '../../lib/theme';

interface UserProfileProps {
	username: string;
	onLogout: () => void;
}

export default function UserProfile({ username, onLogout }: UserProfileProps) {
	return (
		<div
			className="flex items-center gap-3 px-3 py-1 border-2 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
			style={{
				backgroundColor: theme.palette.silver,
				borderColor: theme.palette.emberBlack,
			}}
		>
			{/* Avatar Icon */}
			<div
				className="w-6 h-6 flex items-center justify-center border border-black text-[10px] font-black uppercase"
				style={{
					backgroundColor: theme.palette.dragonYellow,
					color: theme.palette.emberBlack,
				}}
			>
				{username.charAt(0)}
			</div>

			{/* Name and Logout */}
			<div className="flex flex-col leading-none">
				<span
					className="text-xs font-black uppercase tracking-tight"
					style={{ color: theme.palette.emberBlack }}
				>
					{username}
				</span>
				<button
					onClick={onLogout}
					className="text-[9px] font-bold uppercase text-left hover:text-red-600 transition-colors"
					style={{ color: theme.palette.ember2 }}
				>
					Clock Out
				</button>
			</div>
		</div>
	);
}
