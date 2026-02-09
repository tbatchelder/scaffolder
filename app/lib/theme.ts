// theme.ts
export const theme = {
	palette: {
		unicornWhite: 'var(--unicorn-white)',
		unicornBlue: 'var(--unicorn-blue)',
		dragonYellow: 'var(--dragon-yellow)',
		dragonOrange: 'var(--dragon-orange)',
		dragonRed: 'var(--dragon-red)',

		emberBlack: 'var(--ember-black)',
		ember2: 'var(--ember-2)',
		silver: 'var(--silver)',
		silver2: 'var(--silver-2)',
	},

	semantic: {
		success: 'var(--success)',
		info: 'var(--info)',
		warning: 'var(--warning)',
		danger: 'var(--danger)',
	},

	layout: {
		background: 'var(--bg)',
		textOnBackground: 'var(--text-on-bg)',
		textOnGradient: 'var(--text-on-grad)',
		cardBorder: 'var(--card-border)',
		cardBackground: 'var(--card-bg)',
		focusRing: 'var(--focus-ring)',
	},

	fonts: {
		sans: 'var(--font-sans)',
		mono: 'var(--font-mono)',
	},
} as const;
