'use client';

import React from 'react';
import {
	TypographyState,
	ColorsState,
	BordersState,
	SpacingState,
	ShadowsState,
	BackgroundsState,
	LayoutState,
	EffectsState,
	ControlsState,
} from '../../contexts/StyleContext';

// ─── SHARED HELPERS ──────────────────────────────────────────────────────────

function PreviewSection({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="space-y-3">
			<h3
				style={{
					color: 'var(--color-silver2)',
					fontSize: '11px',
					fontWeight: 700,
					letterSpacing: '0.1em',
					textTransform: 'uppercase',
					borderBottom: '1px solid var(--color-ember2)',
					paddingBottom: '4px',
				}}
			>
				{title}
			</h3>
			{children}
		</div>
	);
}

// ─── TYPOGRAPHY PREVIEW ──────────────────────────────────────────────────────

export function TypographyPreview({ typography }: { typography: TypographyState }) {
	const style: React.CSSProperties = {
		fontFamily: typography.fontFamily,
		fontSize: typography.fontSize + 'px',
		fontWeight: typography.fontWeight,
		lineHeight: typography.lineHeight,
		color: typography.color,
		textDecoration: typography.textDecoration,
		textAlign: typography.textAlign as React.CSSProperties['textAlign'],
	};

	return (
		<div className="space-y-8" style={style}>
			<PreviewSection title="Headings">
				<h1 style={{ fontSize: '2.25em', fontWeight: 700, marginBottom: '0.25em' }}>
					Heading Level One
				</h1>
				<h2 style={{ fontSize: '1.5em', fontWeight: 600, marginBottom: '0.25em' }}>
					Subheading Level Two
				</h2>
				<h3 style={{ fontSize: '1.25em', fontWeight: 500 }}>Section Title Three</h3>
			</PreviewSection>

			<PreviewSection title="Body Text">
				<p style={{ marginBottom: '0.75em' }}>
					This is a single sentence demonstrating the global typography settings.
				</p>
				<p>
					This is a full paragraph of text intended to show how line height, spacing, and color
					interact with one another. Adjusting the typography controls will update all text elements
					in this preview simultaneously, giving you an immediate sense of how the combination
					reads.
				</p>
			</PreviewSection>

			<PreviewSection title="Blockquote">
				<blockquote
					style={{
						borderLeft: '4px solid var(--color-dragonOrange)',
						paddingLeft: '1em',
						opacity: 0.85,
						fontStyle: 'italic',
					}}
				>
					This is a blockquote example. It helps demonstrate how typography affects more stylized
					text elements across the interface.
				</blockquote>
			</PreviewSection>

			<PreviewSection title="Inline Styles">
				<p>
					Text can be <strong>bold</strong>, <em>italic</em>, or{' '}
					<span style={{ textDecoration: 'underline' }}>underlined</span> inline.
				</p>
			</PreviewSection>
		</div>
	);
}

// ─── COLOR PREVIEW ───────────────────────────────────────────────────────────

export function ColorPreview({
	typography,
	colors,
}: {
	typography: TypographyState;
	colors: ColorsState;
}) {
	const textStyle: React.CSSProperties = {
		fontFamily: typography.fontFamily,
		fontSize: typography.fontSize + 'px',
		color: typography.color,
	};

	return (
		<div className="space-y-8">
			<PreviewSection title="Hero Section">
				<div style={{ backgroundColor: colors.background, padding: '2rem', borderRadius: '8px' }}>
					<h1 style={{ ...textStyle, fontSize: '2em', fontWeight: 700, marginBottom: '0.5em' }}>
						Hero Section Example
					</h1>
					<p style={{ ...textStyle, marginBottom: '1.5em' }}>
						This section demonstrates how your background and primary colors work together with
						typography.
					</p>
					<button
						style={{
							backgroundColor: colors.primary,
							color: '#fff',
							padding: '0.6em 1.4em',
							borderRadius: '6px',
							border: 'none',
							fontWeight: 600,
							cursor: 'pointer',
						}}
					>
						Primary Button
					</button>
				</div>
			</PreviewSection>

			<PreviewSection title="Surface Card">
				<div
					style={{
						backgroundColor: colors.surface,
						padding: '1.5rem',
						borderRadius: '8px',
						boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
					}}
				>
					<h2 style={{ ...textStyle, fontSize: '1.4em', fontWeight: 700, marginBottom: '0.5em' }}>
						Card Example
					</h2>
					<p style={textStyle}>
						This card uses your surface color. It helps visualize how text and accent colors
						interact with layered backgrounds.
					</p>
				</div>
			</PreviewSection>

			<PreviewSection title="Color Palette">
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
					{Object.entries(colors).map(([key, value]) => (
						<div
							key={key}
							style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
						>
							<div
								style={{
									width: '48px',
									height: '48px',
									backgroundColor: value,
									borderRadius: '8px',
									border: '2px solid var(--color-emberBlack)',
									boxShadow: '2px 2px 6px rgba(0,0,0,0.3)',
								}}
							/>
							<span
								style={{
									fontSize: '11px',
									color: 'var(--color-silver2)',
									textTransform: 'capitalize',
								}}
							>
								{key}
							</span>
							<span
								style={{
									fontSize: '10px',
									color: 'var(--color-silver2)',
									opacity: 0.7,
									fontFamily: 'monospace',
								}}
							>
								{value}
							</span>
						</div>
					))}
				</div>
			</PreviewSection>
		</div>
	);
}

// ─── BORDERS PREVIEW ─────────────────────────────────────────────────────────

export function BorderPreview({ borders }: { borders: BordersState }) {
	const borderStyles = [
		'solid',
		'dashed',
		'dotted',
		'double',
		'groove',
		'ridge',
		'inset',
		'outset',
	];

	return (
		<div className="space-y-8">
			<PreviewSection title="All Border Styles">
				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
					{borderStyles.map(style => (
						<div
							key={style}
							style={{
								padding: '1.25rem',
								borderRadius: borders.radius + 'px',
								borderWidth: borders.width + 'px',
								borderColor: borders.color,
								borderStyle: style,
								backgroundColor: 'var(--color-ember2)',
								textAlign: 'center',
								color: 'var(--color-silver)',
								fontSize: '13px',
								textTransform: 'capitalize',
							}}
						>
							{style}
						</div>
					))}
				</div>
			</PreviewSection>

			<PreviewSection title="Radius Scale">
				<div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
					{[0, borders.radius / 2, borders.radius, borders.radius * 2, 999].map((r, i) => (
						<div
							key={i}
							style={{
								width: '60px',
								height: '60px',
								backgroundColor: 'var(--color-dragonOrange)',
								borderRadius: r + 'px',
								border: '2px solid var(--color-emberBlack)',
							}}
						/>
					))}
				</div>
				<p style={{ color: 'var(--color-silver2)', fontSize: '12px' }}>
					From 0px → {borders.radius * 2}px → pill
				</p>
			</PreviewSection>
		</div>
	);
}

// ─── SPACING PREVIEW ─────────────────────────────────────────────────────────

export function SpacingPreview({ spacing }: { spacing: SpacingState }) {
	const densityMultiplier = { tight: 0.75, normal: 1, spacious: 1.5 }[spacing.density];
	const unit = spacing.base * densityMultiplier;

	return (
		<div className="space-y-8">
			<PreviewSection title="Vertical Rhythm">
				<div style={{ display: 'flex', flexDirection: 'column', gap: unit + 'px' }}>
					<div
						style={{
							backgroundColor: 'var(--color-ember2)',
							padding: unit + 'px',
							borderRadius: '4px',
							color: 'var(--color-silver)',
						}}
					>
						Element A — gap: {unit}px
					</div>
					<div
						style={{
							backgroundColor: 'var(--color-ember2)',
							padding: unit + 'px',
							borderRadius: '4px',
							color: 'var(--color-silver)',
						}}
					>
						Element B
					</div>
					<div
						style={{
							backgroundColor: 'var(--color-ember2)',
							padding: unit + 'px',
							borderRadius: '4px',
							color: 'var(--color-silver)',
						}}
					>
						Element C
					</div>
				</div>
			</PreviewSection>

			<PreviewSection title="Card Padding">
				<div
					style={{
						backgroundColor: 'var(--color-ember2)',
						padding: unit * 2 + 'px',
						borderRadius: '8px',
						border: '2px solid var(--color-emberBlack)',
					}}
				>
					<h3
						style={{
							color: 'var(--color-unicornWhite)',
							fontWeight: 700,
							marginBottom: unit + 'px',
						}}
					>
						Card with {unit * 2}px padding
					</h3>
					<p style={{ color: 'var(--color-silver)', fontSize: '14px' }}>
						Content spacing breathes with your density setting.
					</p>
				</div>
			</PreviewSection>

			<PreviewSection title="Grid Gap">
				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: unit + 'px' }}>
					{['Item 1', 'Item 2', 'Item 3', 'Item 4'].map(item => (
						<div
							key={item}
							style={{
								padding: unit + 'px',
								backgroundColor: 'var(--color-ember2)',
								borderRadius: '4px',
								color: 'var(--color-silver)',
								textAlign: 'center',
								border: '1px solid var(--color-emberBlack)',
							}}
						>
							{item}
						</div>
					))}
				</div>
			</PreviewSection>
		</div>
	);
}

// ─── SHADOWS PREVIEW ─────────────────────────────────────────────────────────

export function ShadowPreview({ shadows }: { shadows: ShadowsState }) {
	const alphaHex = Math.round(shadows.intensity * 255)
		.toString(16)
		.padStart(2, '0');
	const shadowColor = `${shadows.color}${alphaHex}`;
	const makeShadow = (m: number): string =>
		`0 ${m * 4}px ${shadows.blur * m}px ${shadows.spread}px ${shadowColor}`;

	const levels = [
		{ label: 'Low', multiplier: 0.5 },
		{ label: 'Medium', multiplier: 1 },
		{ label: 'High', multiplier: 1.5 },
	];

	return (
		<div className="space-y-8">
			<PreviewSection title="Elevation Levels">
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(3, 1fr)',
						gap: '20px',
						padding: '20px 0',
					}}
				>
					{levels.map(({ label, multiplier }) => (
						<div
							key={label}
							style={{
								padding: '1.5rem',
								backgroundColor: 'var(--color-unicornWhite)',
								borderRadius: '8px',
								boxShadow: makeShadow(multiplier),
								textAlign: 'center',
								color: 'var(--color-emberBlack)',
								fontWeight: 600,
							}}
						>
							{label}
						</div>
					))}
				</div>
			</PreviewSection>

			<PreviewSection title="Shadow on Dark Surface">
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(3, 1fr)',
						gap: '20px',
						padding: '20px',
						backgroundColor: 'var(--color-emberBlack)',
						borderRadius: '8px',
					}}
				>
					{levels.map(({ label, multiplier }) => (
						<div
							key={label}
							style={{
								padding: '1.5rem',
								backgroundColor: 'var(--color-ember2)',
								borderRadius: '8px',
								boxShadow: makeShadow(multiplier),
								textAlign: 'center',
								color: 'var(--color-silver)',
								fontWeight: 600,
							}}
						>
							{label}
						</div>
					))}
				</div>
			</PreviewSection>
		</div>
	);
}

// ─── BACKGROUNDS PREVIEW ─────────────────────────────────────────────────────

export function BackgroundPreview({ backgrounds }: { backgrounds: BackgroundsState }) {
	const heroStyle: React.CSSProperties = backgrounds.useGradient
		? {
				background: `linear-gradient(${backgrounds.gradientDirection}, ${backgrounds.gradientFrom}, ${backgrounds.gradientTo})`,
			}
		: { backgroundColor: backgrounds.page };

	const patternOverlay: Record<string, React.CSSProperties> = {
		none: {},
		grid: {
			backgroundImage:
				'linear-gradient(#ffffff18 1px, transparent 1px), linear-gradient(90deg, #ffffff18 1px, transparent 1px)',
			backgroundSize: '20px 20px',
		},
		dots: {
			backgroundImage: 'radial-gradient(#ffffff20 1px, transparent 1px)',
			backgroundSize: '12px 12px',
		},
		noise: {},
	};

	return (
		<div className="space-y-8">
			<PreviewSection title="Page Background">
				<div
					style={{
						...heroStyle,
						...patternOverlay[backgrounds.pattern],
						padding: '2rem',
						borderRadius: '8px',
						border: '2px solid var(--color-emberBlack)',
					}}
				>
					<h1
						style={{
							fontWeight: 700,
							fontSize: '1.75em',
							marginBottom: '0.5em',
							color: '#fff',
							textShadow: '0 1px 4px rgba(0,0,0,0.5)',
						}}
					>
						Hero Section
					</h1>
					<p style={{ color: '#ffffffcc' }}>
						This demonstrates your page background setting
						{backgrounds.useGradient ? ' with gradient' : ''}
						{backgrounds.pattern !== 'none' ? ` + ${backgrounds.pattern} pattern` : ''}.
					</p>
				</div>
			</PreviewSection>

			<PreviewSection title="Surface Card">
				<div
					style={{
						backgroundColor: backgrounds.surface,
						padding: '1.5rem',
						borderRadius: '8px',
						border: '2px solid var(--color-emberBlack)',
						boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
					}}
				>
					<h2 style={{ fontWeight: 700, color: 'var(--color-emberBlack)', marginBottom: '0.5em' }}>
						Surface Background
					</h2>
					<p style={{ color: 'var(--color-ember2)' }}>Cards and panels use your surface color.</p>
				</div>
			</PreviewSection>

			<PreviewSection title="Accent Background">
				<div
					style={{
						backgroundColor: backgrounds.accent,
						padding: '1.25rem',
						borderRadius: '8px',
						border: '2px solid var(--color-emberBlack)',
					}}
				>
					<h3 style={{ fontWeight: 600, color: 'var(--color-emberBlack)' }}>Accent Background</h3>
				</div>
			</PreviewSection>
		</div>
	);
}

// ─── LAYOUT PREVIEW ──────────────────────────────────────────────────────────

export function LayoutPreview({ layout }: { layout: LayoutState }) {
	const widthMap: Record<string, string> = { narrow: '500px', normal: '700px', wide: '100%' };
	const spacingMap: Record<string, number> = { compact: 16, comfortable: 32, generous: 56 };

	const containerStyle: React.CSSProperties = {
		maxWidth: widthMap[layout.contentWidth],
		margin: layout.alignment === 'center' ? '0 auto' : '0',
		textAlign: layout.alignment as React.CSSProperties['textAlign'],
		padding: layout.containerPadding + 'px',
	};

	return (
		<div className="space-y-8">
			<PreviewSection title="Content Container">
				<div
					style={{ border: '2px dashed var(--color-silver2)', borderRadius: '8px', padding: '8px' }}
				>
					<div
						style={{
							...containerStyle,
							backgroundColor: 'var(--color-ember2)',
							borderRadius: '6px',
						}}
					>
						<h2
							style={{ color: 'var(--color-unicornWhite)', fontWeight: 700, marginBottom: '8px' }}
						>
							Content Container
						</h2>
						<p style={{ color: 'var(--color-silver)', fontSize: '14px' }}>
							Width:{' '}
							<strong style={{ color: 'var(--color-dragonOrange)' }}>{layout.contentWidth}</strong>{' '}
							· Alignment:{' '}
							<strong style={{ color: 'var(--color-dragonOrange)' }}>{layout.alignment}</strong> ·
							Padding:{' '}
							<strong style={{ color: 'var(--color-dragonOrange)' }}>
								{layout.containerPadding}px
							</strong>
						</p>
					</div>
				</div>
			</PreviewSection>

			<PreviewSection title="Two-Column Layout">
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 2fr',
						gap: layout.gridGap + 'px',
						marginTop: spacingMap[layout.sectionSpacing] + 'px',
					}}
				>
					<div
						style={{
							padding: '1rem',
							backgroundColor: 'var(--color-ember2)',
							borderRadius: '6px',
							color: 'var(--color-silver)',
							border: '1px solid var(--color-emberBlack)',
						}}
					>
						Sidebar
					</div>
					<div
						style={{
							padding: '1rem',
							backgroundColor: 'var(--color-ember2)',
							borderRadius: '6px',
							color: 'var(--color-silver)',
							border: '1px solid var(--color-emberBlack)',
						}}
					>
						Main Content
					</div>
				</div>
			</PreviewSection>

			<PreviewSection title="Three-Column Layout">
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr',
						gap: layout.gridGap + 'px',
					}}
				>
					{['Left', 'Center', 'Right'].map(col => (
						<div
							key={col}
							style={{
								padding: '1rem',
								backgroundColor: 'var(--color-ember2)',
								borderRadius: '6px',
								color: 'var(--color-silver)',
								border: '1px solid var(--color-emberBlack)',
								textAlign: 'center',
							}}
						>
							{col}
						</div>
					))}
				</div>
			</PreviewSection>
		</div>
	);
}

// ─── EFFECTS PREVIEW ─────────────────────────────────────────────────────────

export function EffectsPreview({ effects }: { effects: EffectsState }) {
	const filterStyle: React.CSSProperties = {
		filter: `saturate(${effects.saturation}) contrast(${effects.contrast}) brightness(${effects.brightness})`,
	};

	return (
		<div className="space-y-8">
			<PreviewSection title="Frosted Glass">
				<div
					style={{
						position: 'relative',
						padding: '2px',
						borderRadius: '10px',
						overflow: 'hidden',
						background:
							'linear-gradient(135deg, var(--color-unicornBlue), var(--color-dragonOrange))',
					}}
				>
					<div
						style={{
							backdropFilter: `blur(${effects.blur}px)`,
							backgroundColor: 'rgba(255,255,255,0.1)',
							padding: '1.5rem',
							borderRadius: '8px',
						}}
					>
						<h2 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5em' }}>
							Frosted Glass Card
						</h2>
						<p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>
							Blur: {effects.blur}px applied to translucent surfaces.
						</p>
					</div>
				</div>
			</PreviewSection>

			<PreviewSection title="CSS Filters">
				<div
					style={{
						...filterStyle,
						backgroundColor: 'var(--color-ember2)',
						padding: '1.25rem',
						borderRadius: '8px',
						border: '2px solid var(--color-emberBlack)',
					}}
				>
					<p style={{ color: 'var(--color-silver)' }}>
						Saturation:{' '}
						<strong style={{ color: 'var(--color-dragonYellow)' }}>{effects.saturation}</strong> ·
						Contrast:{' '}
						<strong style={{ color: 'var(--color-dragonYellow)' }}>{effects.contrast}</strong> ·
						Brightness:{' '}
						<strong style={{ color: 'var(--color-dragonYellow)' }}>{effects.brightness}</strong>
					</p>
				</div>
			</PreviewSection>

			<PreviewSection title="Transition Speed">
				<button
					style={{
						padding: '0.6em 1.4em',
						backgroundColor: 'var(--color-dragonOrange)',
						border: '2px solid var(--color-emberBlack)',
						borderRadius: '6px',
						color: 'var(--color-emberBlack)',
						fontWeight: 700,
						cursor: 'pointer',
						transition: `all ${effects.transition}ms ease`,
					}}
					onMouseEnter={e => {
						(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)';
						(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
					}}
					onMouseLeave={e => {
						(e.currentTarget as HTMLButtonElement).style.transform = '';
						(e.currentTarget as HTMLButtonElement).style.boxShadow = '';
					}}
				>
					Hover Me — {effects.transition}ms
				</button>
			</PreviewSection>
		</div>
	);
}

// ─── FORM CONTROLS PREVIEW ───────────────────────────────────────────────────

export function FormControlsPreview({
	controls,
	colors,
	typography,
	spacing,
	effects,
}: {
	controls: ControlsState;
	colors: ColorsState;
	typography: TypographyState;
	spacing: SpacingState;
	effects: EffectsState;
}) {
	const [hovered, setHovered] = React.useState(false);
	const [focused, setFocused] = React.useState<string | null>(null);
	const [radioVal, setRadioVal] = React.useState('option-a');
	const [checked, setChecked] = React.useState(false);
	const [toggled, setToggled] = React.useState(false);

	const radiusMap: Record<string, string> = { sharp: '0px', rounded: '8px', pill: '999px' };
	const densityMult: Record<string, number> = { tight: 0.75, normal: 1, spacious: 1.5 };
	const unit = spacing.base * densityMult[spacing.density];

	const btnBase: React.CSSProperties = {
		padding: `${unit * 0.75}px ${unit * 1.5}px`,
		borderRadius: radiusMap[controls.cornerStyle],
		fontFamily: typography.fontFamily,
		fontSize: typography.fontSize + 'px',
		fontWeight: 700,
		transition: `all ${effects.transition}ms ease`,
		cursor: 'pointer',
		display: 'inline-block',
	};

	// Single button that reflects the currently-selected button style
	const btnStyles: Record<string, React.CSSProperties> = {
		filled: {
			backgroundColor: colors.primary,
			color: '#fff',
			border: `2px solid ${colors.primary}`,
		},
		outline: {
			backgroundColor: 'transparent',
			color: colors.primary,
			border: `2px solid ${colors.primary}`,
		},
		// Ghost: no bg, no border — underline makes it legible on any background
		ghost: {
			backgroundColor: 'transparent',
			color: 'var(--color-silver)',
			border: '2px solid transparent',
			textDecoration: 'underline',
		},
	};

	const hoverTransform: Record<string, React.CSSProperties> = {
		lift: { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.35)' },
		darken: { filter: 'brightness(0.85)' },
		lighten: { filter: 'brightness(1.15)' },
		none: {},
	};

	const inputBase: React.CSSProperties = {
		padding: unit + 'px',
		borderRadius: radiusMap[controls.cornerStyle],
		fontFamily: typography.fontFamily,
		fontSize: typography.fontSize + 'px',
		width: '100%',
		transition: `all ${effects.transition}ms ease`,
		backgroundColor: colors.surface,
		color: typography.color,
		outline: 'none',
		boxSizing: 'border-box' as const,
	};

	const inputStyles: Record<string, React.CSSProperties> = {
		filled: { border: 'none' },
		outline: { border: `2px solid var(--color-silver2)` },
		underline: {
			border: 'none',
			borderBottom: `2px solid ${colors.primary}`,
			borderRadius: 0,
			backgroundColor: 'transparent',
		},
	};

	const focusStyle: React.CSSProperties = {
		outline: `${controls.focusThickness}px solid ${controls.focusColor}`,
		outlineOffset: '1px',
		boxShadow: controls.focusGlow ? `0 0 8px ${controls.focusColor}55` : 'none',
	};

	const styleDescriptions: Record<string, string> = {
		filled: 'Solid background, high contrast. Best for primary actions.',
		outline: 'Transparent background with colored border. Secondary actions.',
		ghost: 'No background or border. Subtle actions, shown here with underline for visibility.',
	};

	const inputDescriptions: Record<string, string> = {
		filled: 'Surface-colored background, no border. Clean and minimal.',
		outline: 'Surface background with visible border. Classic form look.',
		underline: 'Transparent background, bottom border only. Modern/editorial style.',
	};

	// Custom toggle track + thumb
	const toggleTrackStyle: React.CSSProperties = {
		width: '44px',
		height: '24px',
		borderRadius: '12px',
		backgroundColor: toggled ? colors.primary : 'var(--color-silver2)',
		border: '2px solid var(--color-emberBlack)',
		position: 'relative',
		cursor: 'pointer',
		transition: `background-color ${effects.transition}ms ease`,
		flexShrink: 0,
	};

	const toggleThumbStyle: React.CSSProperties = {
		position: 'absolute',
		top: '2px',
		left: toggled ? '22px' : '2px',
		width: '16px',
		height: '16px',
		borderRadius: '50%',
		backgroundColor: '#fff',
		border: '1px solid rgba(0,0,0,0.2)',
		transition: `left ${effects.transition}ms ease`,
		boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
	};

	// Checkbox radius: pill → clamp to 4px (full-round checkbox looks odd), else use cornerStyle
	const checkRadius = controls.cornerStyle === 'pill' ? '4px' : radiusMap[controls.cornerStyle];

	return (
		<div className="space-y-8">
			{/* BUTTON — single button showing current style */}
			<PreviewSection title={`Button Style: ${controls.buttonStyle}`}>
				<p style={{ color: 'var(--color-silver2)', fontSize: '12px', marginBottom: '10px' }}>
					{styleDescriptions[controls.buttonStyle]}
				</p>
				<button
					style={{
						...btnBase,
						...btnStyles[controls.buttonStyle],
						...(hovered ? hoverTransform[controls.hoverEffect] : {}),
					}}
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
				>
					Example Button
				</button>
			</PreviewSection>

			{/* TEXT INPUT */}
			<PreviewSection title={`Input Style: ${controls.inputStyle}`}>
				<p style={{ color: 'var(--color-silver2)', fontSize: '12px', marginBottom: '10px' }}>
					{inputDescriptions[controls.inputStyle]} — click to see focus ring.
				</p>
				<input
					placeholder="Click to see focus ring behavior..."
					style={{
						...inputBase,
						...inputStyles[controls.inputStyle],
						...(focused === 'input' ? focusStyle : {}),
					}}
					onFocus={() => setFocused('input')}
					onBlur={() => setFocused(null)}
				/>
			</PreviewSection>

			{/* TEXTAREA */}
			<PreviewSection title="Textarea">
				<textarea
					placeholder="Multi-line input — same style as text input above..."
					rows={3}
					style={{
						...inputBase,
						...inputStyles[controls.inputStyle],
						...(focused === 'textarea' ? focusStyle : {}),
						resize: 'vertical',
					}}
					onFocus={() => setFocused('textarea')}
					onBlur={() => setFocused(null)}
				/>
			</PreviewSection>

			{/* RADIO BUTTONS — custom styled, respects cornerStyle */}
			<PreviewSection title="Radio Buttons">
				<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
					{['Option A', 'Option B', 'Option C'].map(opt => {
						const val = opt.toLowerCase().replace(' ', '-');
						const isSelected = radioVal === val;
						return (
							<label
								key={val}
								style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
								onClick={() => setRadioVal(val)}
							>
								<div
									style={{
										width: '18px',
										height: '18px',
										flexShrink: 0,
										// Radios are always circular — cornerStyle only applies to sharp vs rounded
										borderRadius: controls.cornerStyle === 'sharp' ? '2px' : '50%',
										border: `2px solid ${isSelected ? colors.primary : 'var(--color-silver2)'}`,
										backgroundColor: isSelected ? colors.primary : 'transparent',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										transition: `all ${effects.transition}ms ease`,
									}}
								>
									{isSelected && (
										<div
											style={{
												width: '6px',
												height: '6px',
												borderRadius: '50%',
												backgroundColor: '#fff',
											}}
										/>
									)}
								</div>
								<span
									style={{
										color: 'var(--color-silver)',
										fontSize: typography.fontSize + 'px',
										fontFamily: typography.fontFamily,
									}}
								>
									{opt}
								</span>
							</label>
						);
					})}
				</div>
			</PreviewSection>

			{/* CHECKBOX — square with checkmark, distinct from toggle */}
			<PreviewSection title="Checkbox">
				<label
					style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
					onClick={() => setChecked(c => !c)}
				>
					<div
						style={{
							width: '20px',
							height: '20px',
							flexShrink: 0,
							borderRadius: checkRadius,
							border: `2px solid ${checked ? colors.primary : 'var(--color-silver2)'}`,
							backgroundColor: checked ? colors.primary : 'transparent',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							transition: `all ${effects.transition}ms ease`,
						}}
					>
						{checked && (
							<span style={{ color: '#fff', fontSize: '13px', fontWeight: 900, lineHeight: 1 }}>
								✓
							</span>
						)}
					</div>
					<span
						style={{
							color: 'var(--color-silver)',
							fontSize: typography.fontSize + 'px',
							fontFamily: typography.fontFamily,
						}}
					>
						{checked ? 'Checked' : 'Unchecked'} — click to toggle
					</span>
				</label>
			</PreviewSection>

			{/* TOGGLE — pill track with sliding thumb, visually distinct from checkbox */}
			<PreviewSection title="Toggle Switch">
				<label
					style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
					onClick={() => setToggled(t => !t)}
				>
					<div style={toggleTrackStyle}>
						<div style={toggleThumbStyle} />
					</div>
					<span
						style={{
							color: 'var(--color-silver)',
							fontSize: typography.fontSize + 'px',
							fontFamily: typography.fontFamily,
						}}
					>
						{toggled ? 'On' : 'Off'} — click to toggle
					</span>
				</label>
			</PreviewSection>
		</div>
	);
}
