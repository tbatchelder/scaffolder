'use client';

import React from 'react';
import { useStyle, STYLE_TABS, StyleTab } from '../../contexts/StyleContext';
import {
	TypographyPreview,
	ColorPreview,
	BorderPreview,
	SpacingPreview,
	ShadowPreview,
	BackgroundPreview,
	LayoutPreview,
	EffectsPreview,
	FormControlsPreview,
} from './StylePreviews';
import {
	TypographyController,
	ColorController,
	BorderController,
	SpacingController,
	ShadowController,
	BackgroundController,
	LayoutController,
	EffectsController,
	FormControlsController,
} from './StyleControllers';
import { StyleFullPreview } from './StyleFullPreview';

// ─── ACTION BAR BUTTON ───────────────────────────────────────────────────────

function ActionBarButton({
	label,
	onClick,
	variant = 'default',
	title,
}: {
	label: string;
	onClick: () => void;
	variant?: 'default' | 'danger' | 'accent';
	title?: string;
}) {
	const [hovered, setHovered] = React.useState(false);

	const bgColors = {
		default: hovered ? 'var(--color-silver)' : 'var(--color-silver2)',
		danger: hovered ? '#cc3322' : 'var(--color-dragonRed)',
		accent: hovered ? 'var(--color-dragonYellow)' : 'var(--color-dragonOrange)',
	};

	return (
		<button
			title={title}
			onClick={onClick}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				backgroundColor: bgColors[variant],
				border: '2px solid var(--color-emberBlack)',
				borderRadius: '4px',
				color: 'var(--color-emberBlack)',
				fontWeight: 700,
				fontSize: '11px',
				letterSpacing: '0.06em',
				textTransform: 'uppercase',
				padding: '4px 12px',
				cursor: 'pointer',
				transition: 'all 120ms ease',
				transform: hovered ? 'translateY(-1px)' : 'none',
				whiteSpace: 'nowrap',
				lineHeight: '1.4',
			}}
		>
			{label}
		</button>
	);
}

// ─── TAB BUTTON ──────────────────────────────────────────────────────────────

function TabButton({
	tab,
	active,
	onClick,
}: {
	tab: StyleTab;
	active: boolean;
	onClick: () => void;
}) {
	const [hovered, setHovered] = React.useState(false);

	return (
		<button
			onClick={onClick}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				padding: '8px 14px',
				fontSize: '12px',
				fontWeight: active ? 800 : 600,
				letterSpacing: '0.04em',
				whiteSpace: 'nowrap',
				cursor: 'pointer',
				border: 'none',
				borderBottom: active ? '3px solid var(--color-dragonOrange)' : '3px solid transparent',
				backgroundColor: active
					? 'var(--color-ember2)'
					: hovered
						? 'rgba(255,255,255,0.05)'
						: 'transparent',
				color: active
					? 'var(--color-dragonOrange)'
					: hovered
						? 'var(--color-unicornWhite)'
						: 'var(--color-silver2)',
				transition: 'all 120ms ease',
				flexShrink: 0,
			}}
		>
			{tab}
		</button>
	);
}

// ─── PREVIEW PANE ────────────────────────────────────────────────────────────

function PreviewPane() {
	const {
		activeTab,
		setActiveTab,
		typography,
		colors,
		borders,
		spacing,
		shadows,
		backgrounds,
		layout,
		effects,
		controls,
	} = useStyle();

	return (
		<div
			style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}
		>
			{/* TABS ROW */}
			<div
				style={{
					display: 'flex',
					overflowX: 'auto',
					borderBottom: '2px solid var(--color-emberBlack)',
					backgroundColor: 'var(--color-emberBlack)',
					flexShrink: 0,
					scrollbarWidth: 'none',
				}}
			>
				{STYLE_TABS.map(tab => (
					<TabButton
						key={tab}
						tab={tab}
						active={activeTab === tab}
						onClick={() => setActiveTab(tab)}
					/>
				))}
			</div>

			{/* SCROLLABLE PREVIEW */}
			<div
				style={{ flex: 1, overflowY: 'auto', padding: '24px', backgroundColor: 'rgba(0,0,0,0.2)' }}
			>
				{activeTab === 'Typography' && <TypographyPreview typography={typography} />}
				{activeTab === 'Color' && <ColorPreview typography={typography} colors={colors} />}
				{activeTab === 'Borders' && <BorderPreview borders={borders} />}
				{activeTab === 'Spacing' && <SpacingPreview spacing={spacing} />}
				{activeTab === 'Shadows' && <ShadowPreview shadows={shadows} />}
				{activeTab === 'Backgrounds' && <BackgroundPreview backgrounds={backgrounds} />}
				{activeTab === 'Layout' && <LayoutPreview layout={layout} />}
				{activeTab === 'Effects' && <EffectsPreview effects={effects} />}
				{activeTab === 'Form Controls' && (
					<FormControlsPreview
						controls={controls}
						colors={colors}
						typography={typography}
						spacing={spacing}
						effects={effects}
					/>
				)}
			</div>
		</div>
	);
}

// ─── CONTROLLER PANE ─────────────────────────────────────────────────────────

function ControllerPane() {
	const {
		activeTab,
		typography,
		setTypography,
		colors,
		setColors,
		borders,
		setBorders,
		spacing,
		setSpacing,
		shadows,
		setShadows,
		backgrounds,
		setBackgrounds,
		layout,
		setLayout,
		effects,
		setEffects,
		controls,
		setControls,
	} = useStyle();

	return (
		<div
			style={{
				width: '280px',
				flexShrink: 0,
				backgroundColor: 'var(--color-emberBlack)',
				borderLeft: '2px solid var(--color-ember2)',
				overflowY: 'auto',
				padding: '20px 16px',
			}}
		>
			{/* PANE HEADER */}
			<div
				style={{
					marginBottom: '20px',
					paddingBottom: '12px',
					borderBottom: '2px solid var(--color-ember2)',
				}}
			>
				<h3
					style={{
						color: 'var(--color-unicornWhite)',
						fontWeight: 800,
						fontSize: '13px',
						letterSpacing: '0.08em',
						textTransform: 'uppercase',
						margin: 0,
					}}
				>
					{activeTab} Controls
				</h3>
			</div>

			{activeTab === 'Typography' && (
				<TypographyController typography={typography} setTypography={setTypography} />
			)}
			{activeTab === 'Color' && <ColorController colors={colors} setColors={setColors} />}
			{activeTab === 'Borders' && <BorderController borders={borders} setBorders={setBorders} />}
			{activeTab === 'Spacing' && <SpacingController spacing={spacing} setSpacing={setSpacing} />}
			{activeTab === 'Shadows' && <ShadowController shadows={shadows} setShadows={setShadows} />}
			{activeTab === 'Backgrounds' && (
				<BackgroundController backgrounds={backgrounds} setBackgrounds={setBackgrounds} />
			)}
			{activeTab === 'Layout' && <LayoutController layout={layout} setLayout={setLayout} />}
			{activeTab === 'Effects' && <EffectsController effects={effects} setEffects={setEffects} />}
			{activeTab === 'Form Controls' && (
				<FormControlsController controls={controls} setControls={setControls} />
			)}
		</div>
	);
}

// ─── ACTION BAR ──────────────────────────────────────────────────────────────

function ActionBar() {
	const { activeTab, resetTab, resetAll, setShowFullPreview } = useStyle();
	const [confirmReset, setConfirmReset] = React.useState<'tab' | 'all' | null>(null);

	const handleResetTab = (): void => {
		if (confirmReset === 'tab') {
			resetTab(activeTab);
			setConfirmReset(null);
		} else {
			setConfirmReset('tab');
		}
	};

	const handleResetAll = (): void => {
		if (confirmReset === 'all') {
			resetAll();
			setConfirmReset(null);
		} else {
			setConfirmReset('all');
		}
	};

	// Dismiss confirm on outside click
	React.useEffect(() => {
		if (!confirmReset) return;
		const dismiss = (): void => setConfirmReset(null);
		const timer = setTimeout(dismiss, 3000);
		return () => clearTimeout(timer);
	}, [confirmReset]);

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '6px 16px',
				backgroundColor: 'var(--color-ember2)',
				borderBottom: '2px solid var(--color-emberBlack)',
				flexShrink: 0,
				gap: '12px',
			}}
		>
			{/* LEFT: RESET ACTIONS */}
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
				<span
					style={{
						fontSize: '11px',
						color: 'var(--color-silver2)',
						fontWeight: 600,
						letterSpacing: '0.06em',
						textTransform: 'uppercase',
						marginRight: '4px',
					}}
				>
					Reset:
				</span>

				{confirmReset === 'tab' ? (
					<div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
						<span style={{ fontSize: '11px', color: 'var(--color-dragonYellow)', fontWeight: 700 }}>
							Reset {activeTab}?
						</span>
						<ActionBarButton label="Yes" onClick={handleResetTab} variant="danger" />
						<ActionBarButton label="Cancel" onClick={() => setConfirmReset(null)} />
					</div>
				) : confirmReset === 'all' ? (
					<div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
						<span style={{ fontSize: '11px', color: 'var(--color-dragonYellow)', fontWeight: 700 }}>
							Reset ALL tabs?
						</span>
						<ActionBarButton label="Yes, Reset All" onClick={handleResetAll} variant="danger" />
						<ActionBarButton label="Cancel" onClick={() => setConfirmReset(null)} />
					</div>
				) : (
					<>
						<ActionBarButton
							label={`↺ Reset ${activeTab}`}
							onClick={handleResetTab}
							title={`Reset only the ${activeTab} tab to defaults`}
						/>
						<ActionBarButton
							label="↺ Reset All Tabs"
							onClick={handleResetAll}
							variant="danger"
							title="Reset all 9 tabs back to their defaults"
						/>
					</>
				)}
			</div>

			{/* RIGHT: FULL PREVIEW */}
			<ActionBarButton
				label="⊞ Full Preview"
				onClick={() => setShowFullPreview(true)}
				variant="accent"
				title="See all settings combined in one preview"
			/>
		</div>
	);
}

// ─── STYLE EDITOR (ROOT) ─────────────────────────────────────────────────────

export function StyleEditor() {
	const { showFullPreview } = useStyle();

	return (
		<>
			{/* FULL PREVIEW OVERLAY */}
			{showFullPreview && <StyleFullPreview />}

			{/* EDITOR SHELL */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					overflow: 'hidden',
					backgroundColor: 'var(--color-ember2)',
				}}
			>
				{/* TOP ACTION BAR */}
				<ActionBar />

				{/* SPLIT PANE: PREVIEW LEFT + CONTROLLER RIGHT */}
				<div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
					<PreviewPane />
					<ControllerPane />
				</div>
			</div>
		</>
	);
}
