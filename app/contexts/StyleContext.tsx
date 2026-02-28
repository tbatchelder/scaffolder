'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

// ─── TYPE DEFINITIONS ───────────────────────────────────────────────────────

export interface TypographyState {
	fontFamily: string;
	fontSize: number;
	fontWeight: number;
	lineHeight: number;
	color: string;
	textDecoration: string;
	textAlign: string;
}

export interface ColorsState {
	primary: string;
	secondary: string;
	background: string;
	surface: string;
	accent: string;
}

export interface BordersState {
	width: number;
	radius: number;
	color: string;
	style: string;
}

export interface SpacingState {
	density: 'tight' | 'normal' | 'spacious';
	base: number;
}

export interface ShadowsState {
	intensity: number;
	blur: number;
	spread: number;
	color: string;
}

export interface BackgroundsState {
	page: string;
	surface: string;
	accent: string;
	useGradient: boolean;
	gradientFrom: string;
	gradientTo: string;
	gradientDirection: string;
	pattern: 'none' | 'noise' | 'grid' | 'dots';
}

export interface LayoutState {
	contentWidth: 'narrow' | 'normal' | 'wide';
	layoutStyle: 'single' | 'two' | 'three';
	alignment: 'left' | 'center' | 'justify';
	sectionSpacing: 'compact' | 'comfortable' | 'generous';
	gridGap: number;
	containerPadding: number;
}

export interface EffectsState {
	blur: number;
	saturation: number;
	contrast: number;
	brightness: number;
	transition: number;
}

export interface ControlsState {
	buttonStyle: 'filled' | 'outline' | 'ghost';
	inputStyle: 'filled' | 'outline' | 'underline';
	cornerStyle: 'sharp' | 'rounded' | 'pill';
	focusColor: string;
	focusThickness: number;
	focusGlow: boolean;
	hoverEffect: 'lift' | 'darken' | 'lighten' | 'none';
}

export type StyleTab =
	| 'Typography'
	| 'Color'
	| 'Borders'
	| 'Spacing'
	| 'Shadows'
	| 'Backgrounds'
	| 'Layout'
	| 'Effects'
	| 'Form Controls';

export const STYLE_TABS: StyleTab[] = [
	'Typography',
	'Color',
	'Borders',
	'Spacing',
	'Shadows',
	'Backgrounds',
	'Layout',
	'Effects',
	'Form Controls',
];

// ─── DEFAULTS ───────────────────────────────────────────────────────────────

const defaultTypography: TypographyState = {
	fontFamily: 'sans-serif',
	fontSize: 16,
	fontWeight: 400,
	lineHeight: 1.6,
	color: '#ffffff', // white — preview lives on dark ember2 background
	textDecoration: 'none',
	textAlign: 'left',
};

const defaultColors: ColorsState = {
	primary: '#e07b39', // dragonOrange
	secondary: '#64748b',
	background: '#2a2a2a', // ember2 — dark so text shows on dark preview bg
	surface: '#1a1a1a', // emberBlack
	accent: '#f5c842', // dragonYellow
};

const defaultBorders: BordersState = {
	width: 2,
	radius: 8,
	color: '#ffffff', // white — border cards sit on dark ember2 background
	style: 'solid',
};

const defaultSpacing: SpacingState = {
	density: 'normal',
	base: 8,
};

const defaultShadows: ShadowsState = {
	intensity: 0.5,
	blur: 20,
	spread: 0,
	color: '#ffffff', // white shadows — cards on dark bg need light shadows to show
};

const defaultBackgrounds: BackgroundsState = {
	page: '#2a2a2a', // ember2 — dark default so text is readable
	surface: '#1a1a1a', // emberBlack
	accent: '#3a3a3a',
	useGradient: false,
	gradientFrom: '#1a1a1a',
	gradientTo: '#2a2a2a',
	gradientDirection: 'to bottom',
	pattern: 'none',
};

const defaultLayout: LayoutState = {
	contentWidth: 'normal',
	layoutStyle: 'single',
	alignment: 'left',
	sectionSpacing: 'comfortable',
	gridGap: 16,
	containerPadding: 24,
};

const defaultEffects: EffectsState = {
	blur: 0,
	saturation: 1,
	contrast: 1,
	brightness: 1,
	transition: 200,
};

const defaultControls: ControlsState = {
	buttonStyle: 'filled',
	inputStyle: 'outline',
	cornerStyle: 'rounded',
	focusColor: '#e07b39',
	focusThickness: 2,
	focusGlow: true,
	hoverEffect: 'lift',
};

// ─── CONTEXT VALUE TYPE ──────────────────────────────────────────────────────

interface StyleContextValue {
	typography: TypographyState;
	setTypography: React.Dispatch<React.SetStateAction<TypographyState>>;
	colors: ColorsState;
	setColors: React.Dispatch<React.SetStateAction<ColorsState>>;
	borders: BordersState;
	setBorders: React.Dispatch<React.SetStateAction<BordersState>>;
	spacing: SpacingState;
	setSpacing: React.Dispatch<React.SetStateAction<SpacingState>>;
	shadows: ShadowsState;
	setShadows: React.Dispatch<React.SetStateAction<ShadowsState>>;
	backgrounds: BackgroundsState;
	setBackgrounds: React.Dispatch<React.SetStateAction<BackgroundsState>>;
	layout: LayoutState;
	setLayout: React.Dispatch<React.SetStateAction<LayoutState>>;
	effects: EffectsState;
	setEffects: React.Dispatch<React.SetStateAction<EffectsState>>;
	controls: ControlsState;
	setControls: React.Dispatch<React.SetStateAction<ControlsState>>;
	resetTab: (tab: StyleTab) => void;
	resetAll: () => void;
	activeTab: StyleTab;
	setActiveTab: React.Dispatch<React.SetStateAction<StyleTab>>;
	showFullPreview: boolean;
	setShowFullPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

// ─── CONTEXT ─────────────────────────────────────────────────────────────────

const StyleContext = createContext<StyleContextValue | null>(null);

export function StyleProvider({ children }: { children: React.ReactNode }) {
	const [typography, setTypography] = useState<TypographyState>(defaultTypography);
	const [colors, setColors] = useState<ColorsState>(defaultColors);
	const [borders, setBorders] = useState<BordersState>(defaultBorders);
	const [spacing, setSpacing] = useState<SpacingState>(defaultSpacing);
	const [shadows, setShadows] = useState<ShadowsState>(defaultShadows);
	const [backgrounds, setBackgrounds] = useState<BackgroundsState>(defaultBackgrounds);
	const [layout, setLayout] = useState<LayoutState>(defaultLayout);
	const [effects, setEffects] = useState<EffectsState>(defaultEffects);
	const [controls, setControls] = useState<ControlsState>(defaultControls);
	const [activeTab, setActiveTab] = useState<StyleTab>('Typography');
	const [showFullPreview, setShowFullPreview] = useState<boolean>(false);

	const resetTab = useCallback((tab: StyleTab): void => {
		switch (tab) {
			case 'Typography':
				setTypography(defaultTypography);
				break;
			case 'Color':
				setColors(defaultColors);
				break;
			case 'Borders':
				setBorders(defaultBorders);
				break;
			case 'Spacing':
				setSpacing(defaultSpacing);
				break;
			case 'Shadows':
				setShadows(defaultShadows);
				break;
			case 'Backgrounds':
				setBackgrounds(defaultBackgrounds);
				break;
			case 'Layout':
				setLayout(defaultLayout);
				break;
			case 'Effects':
				setEffects(defaultEffects);
				break;
			case 'Form Controls':
				setControls(defaultControls);
				break;
		}
	}, []);

	const resetAll = useCallback((): void => {
		setTypography(defaultTypography);
		setColors(defaultColors);
		setBorders(defaultBorders);
		setSpacing(defaultSpacing);
		setShadows(defaultShadows);
		setBackgrounds(defaultBackgrounds);
		setLayout(defaultLayout);
		setEffects(defaultEffects);
		setControls(defaultControls);
	}, []);

	return (
		<StyleContext.Provider
			value={{
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
				resetTab,
				resetAll,
				activeTab,
				setActiveTab,
				showFullPreview,
				setShowFullPreview,
			}}
		>
			{children}
		</StyleContext.Provider>
	);
}

export function useStyle(): StyleContextValue {
	const ctx = useContext(StyleContext);
	if (!ctx) throw new Error('useStyle must be used within a StyleProvider');
	return ctx;
}
