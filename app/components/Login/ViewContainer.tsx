'use client';

import React from 'react';
import { theme } from '../../lib/theme';

interface ViewContainerProps {
	children: React.ReactNode;
	backgroundImage?: string; // optional background for each view
}

/**
 * ViewContainer
 * Matches the HeroStage dimensions exactly so post-gate views appear
 * in the same "doorway" space with consistent styling.
 */
export default function ViewContainer({ children, backgroundImage }: ViewContainerProps) {
	return (
		<div
			className="relative w-152.5 h-152.5 mx-auto rounded-xl shadow-2xl border-2 overflow-hidden"
			style={{ borderColor: theme.palette.emberBlack }}
		>
			{/* Optional background image layer */}
			{backgroundImage && (
				<div
					className="absolute inset-0 z-0"
					style={{
						backgroundImage: `url(${backgroundImage})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
			)}

			{/* Content layer */}
			<div className="relative z-10 w-full h-full flex items-center justify-center p-8">
				{children}
			</div>
		</div>
	);
}
