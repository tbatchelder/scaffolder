'use client';

import React from 'react';
import { useStyle } from '../../contexts/StyleContext';

export function StyleFullPreview() {
	const {
		typography,
		colors,
		borders,
		spacing,
		shadows,
		backgrounds,
		layout,
		effects,
		controls,
		setShowFullPreview,
	} = useStyle();

	const densityMult = { tight: 0.75, normal: 1, spacious: 1.5 }[spacing.density];
	const unit = spacing.base * densityMult;

	const widthMap: Record<string, string> = { narrow: '560px', normal: '800px', wide: '100%' };
	const spacingMap: Record<string, number> = { compact: 16, comfortable: 32, generous: 56 };
	const radiusMap: Record<string, string> = { sharp: '0px', rounded: '8px', pill: '999px' };

	const alphaHex = Math.round(shadows.intensity * 255)
		.toString(16)
		.padStart(2, '0');
	const cardShadow = `0 ${8}px ${shadows.blur}px ${shadows.spread}px ${shadows.color}${alphaHex}`;

	const heroBackground: React.CSSProperties = backgrounds.useGradient
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

	const textBase: React.CSSProperties = {
		fontFamily: typography.fontFamily,
		fontSize: typography.fontSize + 'px',
		fontWeight: typography.fontWeight,
		lineHeight: typography.lineHeight,
		color: typography.color,
		textDecoration: typography.textDecoration,
		textAlign: typography.textAlign as React.CSSProperties['textAlign'],
	};

	const filterStyle: React.CSSProperties = {
		filter: `saturate(${effects.saturation}) contrast(${effects.contrast}) brightness(${effects.brightness})`,
	};

	const btnStyle: React.CSSProperties = {
		padding: `${unit * 0.75}px ${unit * 1.5}px`,
		borderRadius: radiusMap[controls.cornerStyle],
		fontFamily: typography.fontFamily,
		fontWeight: 700,
		fontSize: '14px',
		cursor: 'pointer',
		transition: `all ${effects.transition}ms ease`,
		border: `${borders.width}px ${borders.style} ${borders.color}`,
		backgroundColor: colors.primary,
		color: '#fff',
	};

	const inputStyle: React.CSSProperties = {
		padding: unit + 'px',
		borderRadius: radiusMap[controls.cornerStyle],
		fontFamily: typography.fontFamily,
		fontSize: '14px',
		backgroundColor: colors.surface,
		color: typography.color,
		border: controls.inputStyle === 'outline' ? `2px solid ${borders.color}` : 'none',
		borderBottom: controls.inputStyle === 'underline' ? `2px solid ${colors.primary}` : undefined,
		outline: 'none',
		width: '100%',
	};

	return (
		<div
			style={{
				position: 'fixed',
				inset: 0,
				zIndex: 200,
				backgroundColor: 'rgba(0,0,0,0.85)',
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'center',
				overflowY: 'auto',
				padding: '24px',
			}}
		>
			{/* CLOSE BUTTON */}
			<button
				onClick={() => setShowFullPreview(false)}
				style={{
					position: 'fixed',
					top: '16px',
					right: '16px',
					backgroundColor: 'var(--color-dragonRed)',
					border: '2px solid var(--color-emberBlack)',
					borderRadius: '6px',
					color: 'var(--color-unicornWhite)',
					fontWeight: 900,
					fontSize: '18px',
					width: '40px',
					height: '40px',
					cursor: 'pointer',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 201,
					lineHeight: 1,
				}}
				title="Close Full Preview"
			>
				✕
			</button>

			{/* PREVIEW CONTENT */}
			<div style={{ width: '100%', maxWidth: widthMap[layout.contentWidth], ...filterStyle }}>
				{/* LABEL */}
				<div style={{ marginBottom: '16px', textAlign: 'center' }}>
					<span
						style={{
							backgroundColor: 'var(--color-dragonOrange)',
							color: 'var(--color-emberBlack)',
							padding: '4px 14px',
							borderRadius: '999px',
							fontSize: '11px',
							fontWeight: 800,
							letterSpacing: '0.1em',
							textTransform: 'uppercase',
							border: '2px solid var(--color-emberBlack)',
						}}
					>
						Combined Preview — All Settings Applied
					</span>
				</div>

				{/* HERO SECTION */}
				<div
					style={{
						...heroBackground,
						...patternOverlay[backgrounds.pattern],
						padding: unit * 3 + 'px',
						borderRadius: borders.radius + 'px',
						border: `${borders.width}px ${borders.style} ${borders.color}`,
						marginBottom: spacingMap[layout.sectionSpacing] + 'px',
						boxShadow: cardShadow,
					}}
				>
					<h1
						style={{
							...textBase,
							fontSize: typography.fontSize * 2.25 + 'px',
							fontWeight: 700,
							marginBottom: unit + 'px',
							color: '#fff',
							textShadow: '0 2px 6px rgba(0,0,0,0.5)',
						}}
					>
						The Quick Brown Fox
					</h1>
					<p
						style={{
							...textBase,
							color: 'rgba(255,255,255,0.85)',
							marginBottom: unit * 1.5 + 'px',
						}}
					>
						This hero demonstrates your page background, typography, borders, and button styles all
						working together in context.
					</p>
					<div style={{ display: 'flex', gap: unit + 'px', flexWrap: 'wrap' }}>
						<button style={btnStyle}>Primary Action</button>
						<button
							style={{
								...btnStyle,
								backgroundColor: 'transparent',
								color: '#fff',
								border: `${borders.width}px ${borders.style} rgba(255,255,255,0.7)`,
							}}
						>
							Secondary
						</button>
					</div>
				</div>

				{/* MAIN CONTENT AREA */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 2fr',
						gap: layout.gridGap + 'px',
						marginBottom: spacingMap[layout.sectionSpacing] + 'px',
						alignItems: 'start',
					}}
				>
					{/* SIDEBAR */}
					<div
						style={{
							backgroundColor: backgrounds.accent,
							padding: unit * 1.5 + 'px',
							borderRadius: borders.radius + 'px',
							border: `${borders.width}px ${borders.style} ${borders.color}`,
							boxShadow: cardShadow,
						}}
					>
						<h3
							style={{
								...textBase,
								fontWeight: 700,
								fontSize: typography.fontSize * 1.1 + 'px',
								marginBottom: unit + 'px',
							}}
						>
							Navigation
						</h3>
						{['Overview', 'Components', 'Typography', 'Colors', 'Settings'].map((item, i) => (
							<div
								key={item}
								style={{
									padding: unit * 0.6 + 'px ' + unit + 'px',
									borderRadius: radiusMap[controls.cornerStyle],
									backgroundColor: i === 0 ? colors.primary : 'transparent',
									color: i === 0 ? '#fff' : typography.color,
									fontFamily: typography.fontFamily,
									fontSize: '13px',
									fontWeight: i === 0 ? 700 : 400,
									cursor: 'pointer',
									marginBottom: '2px',
								}}
							>
								{item}
							</div>
						))}
					</div>

					{/* MAIN CARD */}
					<div
						style={{
							backgroundColor: backgrounds.surface,
							padding: unit * 2 + 'px',
							borderRadius: borders.radius + 'px',
							border: `${borders.width}px ${borders.style} ${borders.color}`,
							boxShadow: cardShadow,
						}}
					>
						<h2
							style={{
								...textBase,
								fontWeight: 700,
								fontSize: typography.fontSize * 1.5 + 'px',
								marginBottom: unit + 'px',
							}}
						>
							Article Heading
						</h2>
						<p style={{ ...textBase, marginBottom: unit + 'px', opacity: 0.85 }}>
							This paragraph demonstrates how body text reads on your surface background. Line
							height, font size, font family, and text color are all applied simultaneously so you
							can judge the combination holistically.
						</p>
						<blockquote
							style={{
								borderLeft: `4px solid ${colors.primary}`,
								paddingLeft: unit + 'px',
								fontStyle: 'italic',
								opacity: 0.8,
								marginBottom: unit + 'px',
							}}
						>
							<p style={textBase}>
								A blockquote like this one shows how accent elements contrast against the main card
								surface. Italic styling interacts with your font family choice here.
							</p>
						</blockquote>
						<p style={{ ...textBase, opacity: 0.85 }}>
							A second paragraph follows with additional body copy to demonstrate paragraph spacing
							and overall reading rhythm at your chosen line height and density settings.
						</p>
					</div>
				</div>

				{/* FORM SECTION */}
				<div
					style={{
						backgroundColor: backgrounds.surface,
						padding: unit * 2 + 'px',
						borderRadius: borders.radius + 'px',
						border: `${borders.width}px ${borders.style} ${borders.color}`,
						boxShadow: cardShadow,
						marginBottom: spacingMap[layout.sectionSpacing] + 'px',
					}}
				>
					<h2
						style={{
							...textBase,
							fontWeight: 700,
							fontSize: typography.fontSize * 1.25 + 'px',
							marginBottom: unit * 1.5 + 'px',
						}}
					>
						Form Controls
					</h2>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: unit + 'px',
							marginBottom: unit * 1.5 + 'px',
						}}
					>
						<div>
							<label
								style={{
									display: 'block',
									fontSize: '12px',
									fontWeight: 600,
									color: typography.color,
									marginBottom: '6px',
									textTransform: 'uppercase',
									letterSpacing: '0.05em',
								}}
							>
								First Name
							</label>
							<input placeholder="Jane" style={inputStyle} />
						</div>
						<div>
							<label
								style={{
									display: 'block',
									fontSize: '12px',
									fontWeight: 600,
									color: typography.color,
									marginBottom: '6px',
									textTransform: 'uppercase',
									letterSpacing: '0.05em',
								}}
							>
								Last Name
							</label>
							<input placeholder="Doe" style={inputStyle} />
						</div>
					</div>
					<div style={{ marginBottom: unit * 1.5 + 'px' }}>
						<label
							style={{
								display: 'block',
								fontSize: '12px',
								fontWeight: 600,
								color: typography.color,
								marginBottom: '6px',
								textTransform: 'uppercase',
								letterSpacing: '0.05em',
							}}
						>
							Message
						</label>
						<textarea
							placeholder="Your message here..."
							rows={3}
							style={{ ...inputStyle, resize: 'vertical' }}
						/>
					</div>
					<div
						style={{ display: 'flex', gap: unit + 'px', alignItems: 'center', flexWrap: 'wrap' }}
					>
						<button style={btnStyle}>Submit Form</button>
						<button
							style={{
								...btnStyle,
								backgroundColor: 'transparent',
								color: colors.primary,
								border: `2px solid ${colors.primary}`,
							}}
						>
							Cancel
						</button>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '8px',
								fontFamily: typography.fontFamily,
								fontSize: '14px',
								color: typography.color,
								cursor: 'pointer',
							}}
						>
							<input
								type="checkbox"
								style={{ accentColor: colors.primary, width: '16px', height: '16px' }}
							/>
							I agree to the terms
						</label>
					</div>
				</div>

				{/* COLOR + SHADOW SWATCHES */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(5, 1fr)',
						gap: layout.gridGap + 'px',
						marginBottom: spacingMap[layout.sectionSpacing] + 'px',
					}}
				>
					{Object.entries(colors).map(([key, value]) => (
						<div
							key={key}
							style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
						>
							<div
								style={{
									width: '100%',
									height: '56px',
									backgroundColor: value,
									borderRadius: borders.radius + 'px',
									border: `${borders.width}px ${borders.style} ${borders.color}`,
									boxShadow: cardShadow,
								}}
							/>
							<span
								style={{
									fontSize: '11px',
									color: 'var(--color-silver2)',
									textTransform: 'capitalize',
									textAlign: 'center',
								}}
							>
								{key}
							</span>
						</div>
					))}
				</div>

				{/* SHADOW ELEVATION ROW */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(3, 1fr)',
						gap: layout.gridGap + 'px',
						padding: unit * 2 + 'px',
						backgroundColor: backgrounds.page,
						borderRadius: borders.radius + 'px',
						border: `${borders.width}px ${borders.style} ${borders.color}`,
					}}
				>
					{[0.5, 1, 1.5].map((m, i) => {
						const sh = `0 ${m * 4}px ${shadows.blur * m}px ${shadows.spread}px ${shadows.color}${alphaHex}`;
						return (
							<div
								key={i}
								style={{
									padding: unit * 1.5 + 'px',
									backgroundColor: backgrounds.surface,
									borderRadius: borders.radius + 'px',
									boxShadow: sh,
									textAlign: 'center',
									fontFamily: typography.fontFamily,
									color: typography.color,
									fontSize: '13px',
									fontWeight: 600,
								}}
							>
								{['Low', 'Medium', 'High'][i]} Elevation
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
