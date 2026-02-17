'use client';

import React from 'react';
import Image from 'next/image';

interface HeroStageProps {
	children: React.ReactNode;
	onOpen: () => void;
	isOpen: boolean;
}

export default function HeroStage({ children, onOpen, isOpen }: HeroStageProps) {
	return (
		<div className="relative w-152.5 h-152.5 mx-auto rounded-xl shadow-2xl border-2 border-(--ember-black) overflow-hidden">
			{/* ─── LAYER 1 (bottom): Panel content ───────────────────────────────
			    Always in the DOM. pointer-events disabled while doors are closed
			    so nothing fires prematurely through the door layer above. */}
			<div
				className="absolute inset-0 z-10 flex items-center justify-center p-8"
				style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
			>
				{children}
			</div>

			{/* ─── LAYER 2 (top): The sliding doors ──────────────────────────────
			    Clicking anywhere on the closed doors fires onOpen.
			    Once isOpen=true, pointer-events are removed from this layer so
			    all clicks fall through to the panel content beneath.

			    overflow-hidden is on the STAGE (parent above), not here — so the
			    doors can translateX freely and get clipped by the container edge,
			    producing a clean slide rather than an instant vanish. */}
			<div
				className="absolute inset-0 z-20 flex"
				onClick={!isOpen ? onOpen : undefined}
				style={{ cursor: isOpen ? 'default' : 'pointer', pointerEvents: isOpen ? 'none' : 'auto' }}
			>
				{/* LEFT DOOR */}
				<div
					className="relative w-1/2 h-full transition-transform duration-700 ease-in-out"
					style={{ transform: isOpen ? 'translateX(-101%)' : 'translateX(0)' }}
				>
					<Image src="/hero-left.png" alt="" fill className="object-cover" draggable={false} />
				</div>

				{/* RIGHT DOOR */}
				<div
					className="relative w-1/2 h-full transition-transform duration-700 ease-in-out"
					style={{ transform: isOpen ? 'translateX(101%)' : 'translateX(0)' }}
				>
					<Image src="/hero-right.png" alt="" fill className="object-cover" draggable={false} />
				</div>
			</div>
		</div>
	);
}
