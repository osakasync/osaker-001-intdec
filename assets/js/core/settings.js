import { hexToRgb } from './utils.js';

export const MAX_HISTORY_ENTRIES = 25;

export let VOLUME = 0.5;

export let ACCENT_COLOR = '#0f0';
export let ACCENT_RGB = hexToRgb(ACCENT_COLOR);
export let FATAL_ERROR_COLOR = '#f00';
export let WARNING_ERROR_COLOR = '#ff0';

export const TRANSITION_SPEED = '0.2s';
export const CURSOR_BLINK_DURATION = 500; // ms

export const AMBIENT_SETTINGS = {
	MAX_PARTICLES: 250,
	BASE_LIFESPAN: 250,
	PARTICLES_PER_FRAME: 2,
	PULSE_THICKNESS: 100,
	MAX_PULSE_RADIUS: 1000,
	PARALLAX_STRENGTH: 20,
};

export function applySettings() {
	const root = document.documentElement;
	root.style.setProperty('--accent-color', ACCENT_COLOR);
	root.style.setProperty('--accent-rgb', ACCENT_RGB);
	root.style.setProperty('--transition-speed', TRANSITION_SPEED);
}

export function setAccentColor(color) {
	ACCENT_COLOR = color;
	ACCENT_RGB = hexToRgb(color);
	applySettings();
}

export function setErrorColors({ fatal, warning } = {}) {
	if (fatal) FATAL_ERROR_COLOR = fatal;
	if (warning) WARNING_ERROR_COLOR = warning;
}
