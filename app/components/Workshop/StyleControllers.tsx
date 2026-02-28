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

// ─── SHARED CONTROL PRIMITIVES ───────────────────────────────────────────────

function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
			<label
				style={{
					fontSize: '12px',
					fontWeight: 600,
					color: '#bfbfbf',
					textTransform: 'uppercase',
					letterSpacing: '0.06em',
				}}
			>
				{label}
			</label>
			{children}
		</div>
	);
}

// ─── CONTROLLER PANEL INPUT STYLES ───────────────────────────────────────────
// Hardcoded values — the controller panel is always dark (emberBlack bg),
// so inputs must always be white bg + black text regardless of user's theme
// selections. Never use CSS variables here or the theme state bleeds in.

const CTRL_BG = '#ffffff'; // always white input background
const CTRL_TEXT = '#1a1a1a'; // always black text
const CTRL_BORDER = '2px solid #1a1a1a';

const selectStyle: React.CSSProperties = {
	width: '100%',
	backgroundColor: CTRL_BG,
	border: CTRL_BORDER,
	borderRadius: '4px',
	padding: '6px 8px',
	color: CTRL_TEXT,
	fontSize: '13px',
	fontWeight: 500,
	cursor: 'pointer',
	colorScheme: 'light', // forces OS dropdown popup to use light colors too
};

const colorPickerStyle: React.CSSProperties = {
	width: '100%',
	height: '36px',
	padding: '2px',
	borderRadius: '4px',
	border: CTRL_BORDER,
	backgroundColor: CTRL_BG,
	cursor: 'pointer',
};

const hexInputStyle: React.CSSProperties = {
	width: '100%',
	backgroundColor: CTRL_BG,
	border: CTRL_BORDER,
	borderRadius: '4px',
	padding: '5px 8px',
	color: CTRL_TEXT,
	fontSize: '12px',
	fontFamily: 'monospace',
};

function RangeControl({
	label,
	value,
	min,
	max,
	step = 1,
	onChange,
	unit = '',
}: {
	label: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	onChange: (v: number) => void;
	unit?: string;
}) {
	return (
		<ControlGroup label={`${label} (${value}${unit})`}>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={e => onChange(Number(e.target.value))}
				style={{ width: '100%', accentColor: 'var(--color-dragonOrange)', cursor: 'pointer' }}
			/>
		</ControlGroup>
	);
}

function ColorControl({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
}) {
	return (
		<ControlGroup label={label}>
			<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
				<input
					type="color"
					value={value}
					onChange={e => onChange(e.target.value)}
					style={{ ...colorPickerStyle, width: '48px', flex: 'none' }}
				/>
				<input
					type="text"
					value={value}
					onChange={e => onChange(e.target.value)}
					style={{ ...hexInputStyle, flex: 1 }}
				/>
			</div>
		</ControlGroup>
	);
}

function SelectControl({
	label,
	value,
	options,
	onChange,
}: {
	label: string;
	value: string;
	options: { value: string; label: string }[];
	onChange: (v: string) => void;
}) {
	return (
		<ControlGroup label={label}>
			<select value={value} onChange={e => onChange(e.target.value)} style={selectStyle}>
				{options.map(o => (
					<option key={o.value} value={o.value}>
						{o.label}
					</option>
				))}
			</select>
		</ControlGroup>
	);
}

function CheckboxControl({
	label,
	checked,
	onChange,
}: {
	label: string;
	checked: boolean;
	onChange: (v: boolean) => void;
}) {
	return (
		<div
			style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
			onClick={() => onChange(!checked)}
		>
			<div
				style={{
					width: '18px',
					height: '18px',
					flexShrink: 0,
					border: '2px solid var(--color-emberBlack)',
					borderRadius: '3px',
					backgroundColor: checked ? 'var(--color-dragonOrange)' : 'var(--color-silver)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transition: 'background-color 150ms ease',
				}}
			>
				{checked && (
					<span
						style={{
							color: 'var(--color-emberBlack)',
							fontSize: '12px',
							fontWeight: 900,
							lineHeight: 1,
						}}
					>
						✓
					</span>
				)}
			</div>
			<label style={{ fontSize: '13px', color: '#d8d8d8', cursor: 'pointer', userSelect: 'none' }}>
				{label}
			</label>
		</div>
	);
}

function Divider() {
	return <div style={{ height: '1px', backgroundColor: 'var(--color-ember2)', margin: '4px 0' }} />;
}

// ─── TYPOGRAPHY CONTROLLER ───────────────────────────────────────────────────

export function TypographyController({
	typography,
	setTypography,
}: {
	typography: TypographyState;
	setTypography: React.Dispatch<React.SetStateAction<TypographyState>>;
}) {
	const update = <K extends keyof TypographyState>(prop: K, value: TypographyState[K]): void =>
		setTypography(prev => ({ ...prev, [prop]: value }));

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<SelectControl
				label="Font Family"
				value={typography.fontFamily}
				options={[
					{ value: 'sans-serif', label: 'Sans Serif' },
					{ value: 'serif', label: 'Serif' },
					{ value: 'monospace', label: 'Monospace' },
					{ value: "'Georgia', serif", label: 'Georgia' },
					{ value: "'Courier New', monospace", label: 'Courier New' },
				]}
				onChange={v => update('fontFamily', v)}
			/>
			<Divider />
			<RangeControl
				label="Font Size"
				value={typography.fontSize}
				min={12}
				max={32}
				unit="px"
				onChange={v => update('fontSize', v)}
			/>
			<RangeControl
				label="Font Weight"
				value={typography.fontWeight}
				min={100}
				max={900}
				step={100}
				onChange={v => update('fontWeight', v)}
			/>
			<RangeControl
				label="Line Height"
				value={typography.lineHeight}
				min={1}
				max={2}
				step={0.1}
				onChange={v => update('lineHeight', v)}
			/>
			<Divider />
			<ColorControl
				label="Text Color"
				value={typography.color}
				onChange={v => update('color', v)}
			/>
			<Divider />
			<SelectControl
				label="Text Decoration"
				value={typography.textDecoration}
				options={[
					{ value: 'none', label: 'None' },
					{ value: 'underline', label: 'Underline' },
					{ value: 'line-through', label: 'Strikethrough' },
				]}
				onChange={v => update('textDecoration', v)}
			/>
			<SelectControl
				label="Text Alignment"
				value={typography.textAlign}
				options={[
					{ value: 'left', label: 'Left' },
					{ value: 'center', label: 'Center' },
					{ value: 'right', label: 'Right' },
					{ value: 'justify', label: 'Justify' },
				]}
				onChange={v => update('textAlign', v)}
			/>
		</div>
	);
}

// ─── COLOR CONTROLLER ────────────────────────────────────────────────────────

export function ColorController({
	colors,
	setColors,
}: {
	colors: ColorsState;
	setColors: React.Dispatch<React.SetStateAction<ColorsState>>;
}) {
	const update = <K extends keyof ColorsState>(prop: K, value: string): void =>
		setColors(prev => ({ ...prev, [prop]: value }));

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			{(Object.keys(colors) as (keyof ColorsState)[]).map((key, i) => (
				<React.Fragment key={key}>
					{i > 0 && <Divider />}
					<ColorControl
						label={key.charAt(0).toUpperCase() + key.slice(1) + ' Color'}
						value={colors[key]}
						onChange={v => update(key, v)}
					/>
				</React.Fragment>
			))}
		</div>
	);
}

// ─── BORDERS CONTROLLER ──────────────────────────────────────────────────────

export function BorderController({
	borders,
	setBorders,
}: {
	borders: BordersState;
	setBorders: React.Dispatch<React.SetStateAction<BordersState>>;
}) {
	const update = <K extends keyof BordersState>(prop: K, value: BordersState[K]): void =>
		setBorders(prev => ({ ...prev, [prop]: value }));

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<RangeControl
				label="Border Width"
				value={borders.width}
				min={0}
				max={20}
				unit="px"
				onChange={v => update('width', v)}
			/>
			<RangeControl
				label="Border Radius"
				value={borders.radius}
				min={0}
				max={50}
				unit="px"
				onChange={v => update('radius', v)}
			/>
			<Divider />
			<ColorControl label="Border Color" value={borders.color} onChange={v => update('color', v)} />
			<Divider />
			<SelectControl
				label="Default Border Style"
				value={borders.style}
				options={['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'].map(
					s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }),
				)}
				onChange={v => update('style', v)}
			/>
		</div>
	);
}

// ─── SPACING CONTROLLER ──────────────────────────────────────────────────────

export function SpacingController({
	spacing,
	setSpacing,
}: {
	spacing: SpacingState;
	setSpacing: React.Dispatch<React.SetStateAction<SpacingState>>;
}) {
	const update = <K extends keyof SpacingState>(prop: K, value: SpacingState[K]): void =>
		setSpacing(prev => ({ ...prev, [prop]: value }));

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<SelectControl
				label="Density"
				value={spacing.density}
				options={[
					{ value: 'tight', label: 'Tight' },
					{ value: 'normal', label: 'Normal' },
					{ value: 'spacious', label: 'Spacious' },
				]}
				onChange={v => update('density', v as SpacingState['density'])}
			/>
			<Divider />
			<RangeControl
				label="Base Spacing Unit"
				value={spacing.base}
				min={4}
				max={16}
				unit="px"
				onChange={v => update('base', v)}
			/>
		</div>
	);
}

// ─── SHADOWS CONTROLLER ──────────────────────────────────────────────────────

export function ShadowController({
	shadows,
	setShadows,
}: {
	shadows: ShadowsState;
	setShadows: React.Dispatch<React.SetStateAction<ShadowsState>>;
}) {
	const update = <K extends keyof ShadowsState>(prop: K, value: ShadowsState[K]): void =>
		setShadows(prev => ({ ...prev, [prop]: value }));

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<RangeControl
				label="Intensity"
				value={shadows.intensity}
				min={0}
				max={1}
				step={0.05}
				onChange={v => update('intensity', v)}
			/>
			<RangeControl
				label="Blur"
				value={shadows.blur}
				min={0}
				max={60}
				unit="px"
				onChange={v => update('blur', v)}
			/>
			<RangeControl
				label="Spread"
				value={shadows.spread}
				min={-10}
				max={20}
				unit="px"
				onChange={v => update('spread', v)}
			/>
			<Divider />
			<ColorControl label="Shadow Color" value={shadows.color} onChange={v => update('color', v)} />
		</div>
	);
}

// ─── BACKGROUNDS CONTROLLER ──────────────────────────────────────────────────

export function BackgroundController({
	backgrounds,
	setBackgrounds,
}: {
	backgrounds: BackgroundsState;
	setBackgrounds: React.Dispatch<React.SetStateAction<BackgroundsState>>;
}) {
	const update = <K extends keyof BackgroundsState>(prop: K, value: BackgroundsState[K]): void =>
		setBackgrounds(prev => ({ ...prev, [prop]: value }));

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<ColorControl
				label="Page Background"
				value={backgrounds.page}
				onChange={v => update('page', v)}
			/>
			<Divider />
			<ColorControl
				label="Surface Background"
				value={backgrounds.surface}
				onChange={v => update('surface', v)}
			/>
			<Divider />
			<ColorControl
				label="Accent Background"
				value={backgrounds.accent}
				onChange={v => update('accent', v)}
			/>
			<Divider />
			<CheckboxControl
				label="Use Gradient"
				checked={backgrounds.useGradient}
				onChange={v => update('useGradient', v)}
			/>
			{backgrounds.useGradient && (
				<>
					<ColorControl
						label="Gradient From"
						value={backgrounds.gradientFrom}
						onChange={v => update('gradientFrom', v)}
					/>
					<ColorControl
						label="Gradient To"
						value={backgrounds.gradientTo}
						onChange={v => update('gradientTo', v)}
					/>
					<SelectControl
						label="Direction"
						value={backgrounds.gradientDirection}
						options={[
							{ value: 'to bottom', label: 'Top → Bottom' },
							{ value: 'to right', label: 'Left → Right' },
							{ value: 'to bottom right', label: 'Diagonal ↘' },
							{ value: 'to top right', label: 'Diagonal ↗' },
						]}
						onChange={v => update('gradientDirection', v)}
					/>
				</>
			)}
			<Divider />
			<SelectControl
				label="Pattern Overlay"
				value={backgrounds.pattern}
				options={[
					{ value: 'none', label: 'None' },
					{ value: 'grid', label: 'Grid' },
					{ value: 'dots', label: 'Dots' },
					{ value: 'noise', label: 'Noise' },
				]}
				onChange={v => update('pattern', v as BackgroundsState['pattern'])}
			/>
		</div>
	);
}

// ─── LAYOUT CONTROLLER ───────────────────────────────────────────────────────

export function LayoutController({
	layout,
	setLayout,
}: {
	layout: LayoutState;
	setLayout: React.Dispatch<React.SetStateAction<LayoutState>>;
}) {
	const update = <K extends keyof LayoutState>(prop: K, value: LayoutState[K]): void =>
		setLayout(prev => ({ ...prev, [prop]: value }));

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<SelectControl
				label="Content Width"
				value={layout.contentWidth}
				options={[
					{ value: 'narrow', label: 'Narrow' },
					{ value: 'normal', label: 'Normal' },
					{ value: 'wide', label: 'Wide (Full)' },
				]}
				onChange={v => update('contentWidth', v as LayoutState['contentWidth'])}
			/>
			<SelectControl
				label="Alignment"
				value={layout.alignment}
				options={[
					{ value: 'left', label: 'Left' },
					{ value: 'center', label: 'Center' },
					{ value: 'justify', label: 'Justify' },
				]}
				onChange={v => update('alignment', v as LayoutState['alignment'])}
			/>
			<Divider />
			<SelectControl
				label="Section Spacing"
				value={layout.sectionSpacing}
				options={[
					{ value: 'compact', label: 'Compact' },
					{ value: 'comfortable', label: 'Comfortable' },
					{ value: 'generous', label: 'Generous' },
				]}
				onChange={v => update('sectionSpacing', v as LayoutState['sectionSpacing'])}
			/>
			<RangeControl
				label="Grid Gap"
				value={layout.gridGap}
				min={4}
				max={48}
				unit="px"
				onChange={v => update('gridGap', v)}
			/>
			<RangeControl
				label="Container Padding"
				value={layout.containerPadding}
				min={8}
				max={64}
				unit="px"
				onChange={v => update('containerPadding', v)}
			/>
		</div>
	);
}

// ─── EFFECTS CONTROLLER ──────────────────────────────────────────────────────

export function EffectsController({
	effects,
	setEffects,
}: {
	effects: EffectsState;
	setEffects: React.Dispatch<React.SetStateAction<EffectsState>>;
}) {
	const update = <K extends keyof EffectsState>(prop: K, value: EffectsState[K]): void =>
		setEffects(prev => ({ ...prev, [prop]: value }));

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<RangeControl
				label="Backdrop Blur"
				value={effects.blur}
				min={0}
				max={20}
				unit="px"
				onChange={v => update('blur', v)}
			/>
			<Divider />
			<RangeControl
				label="Saturation"
				value={effects.saturation}
				min={0}
				max={2}
				step={0.1}
				onChange={v => update('saturation', v)}
			/>
			<RangeControl
				label="Contrast"
				value={effects.contrast}
				min={0}
				max={2}
				step={0.1}
				onChange={v => update('contrast', v)}
			/>
			<RangeControl
				label="Brightness"
				value={effects.brightness}
				min={0}
				max={2}
				step={0.1}
				onChange={v => update('brightness', v)}
			/>
			<Divider />
			<RangeControl
				label="Transition Speed"
				value={effects.transition}
				min={50}
				max={1000}
				step={50}
				unit="ms"
				onChange={v => update('transition', v)}
			/>
		</div>
	);
}

// ─── FORM CONTROLS CONTROLLER ────────────────────────────────────────────────

export function FormControlsController({
	controls,
	setControls,
}: {
	controls: ControlsState;
	setControls: React.Dispatch<React.SetStateAction<ControlsState>>;
}) {
	const update = <K extends keyof ControlsState>(prop: K, value: ControlsState[K]): void =>
		setControls(prev => ({ ...prev, [prop]: value }));

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<SelectControl
				label="Button Style"
				value={controls.buttonStyle}
				options={[
					{ value: 'filled', label: 'Filled' },
					{ value: 'outline', label: 'Outline' },
					{ value: 'ghost', label: 'Ghost' },
				]}
				onChange={v => update('buttonStyle', v as ControlsState['buttonStyle'])}
			/>
			<SelectControl
				label="Input Style"
				value={controls.inputStyle}
				options={[
					{ value: 'filled', label: 'Filled' },
					{ value: 'outline', label: 'Outline' },
					{ value: 'underline', label: 'Underline' },
				]}
				onChange={v => update('inputStyle', v as ControlsState['inputStyle'])}
			/>
			<SelectControl
				label="Corner Style"
				value={controls.cornerStyle}
				options={[
					{ value: 'sharp', label: 'Sharp' },
					{ value: 'rounded', label: 'Rounded' },
					{ value: 'pill', label: 'Pill' },
				]}
				onChange={v => update('cornerStyle', v as ControlsState['cornerStyle'])}
			/>
			<Divider />
			<SelectControl
				label="Hover Effect"
				value={controls.hoverEffect}
				options={[
					{ value: 'lift', label: 'Lift' },
					{ value: 'darken', label: 'Darken' },
					{ value: 'lighten', label: 'Lighten' },
					{ value: 'none', label: 'None' },
				]}
				onChange={v => update('hoverEffect', v as ControlsState['hoverEffect'])}
			/>
			<Divider />
			<ColorControl
				label="Focus Ring Color"
				value={controls.focusColor}
				onChange={v => update('focusColor', v)}
			/>
			<RangeControl
				label="Focus Ring Thickness"
				value={controls.focusThickness}
				min={1}
				max={8}
				unit="px"
				onChange={v => update('focusThickness', v)}
			/>
			<CheckboxControl
				label="Focus Glow Effect"
				checked={controls.focusGlow}
				onChange={v => update('focusGlow', v)}
			/>
		</div>
	);
}
