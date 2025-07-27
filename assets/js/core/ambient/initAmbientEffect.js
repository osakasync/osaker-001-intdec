import { createAmbientParticles } from './ambientParticles.js';
import { createPulseManager } from './ambientPulses.js';

export function initAmbientEffect() {
	let canvas = document.getElementById('pixels');
	let ctx = canvas.getContext('2d');

	let width = (canvas.width = window.innerWidth);
	let height = (canvas.height = window.innerHeight);

	const settings = {
		MAX_PARTICLES: 250,
		BASE_LIFESPAN: 250,
		PARTICLES_PER_FRAME: 2,
		PULSE_THICKNESS: 100,
		MAX_PULSE_RADIUS: 1000,
	};

	const { pulses, drawPulses, triggerPulse } = createPulseManager(
		ctx,
		settings
	);
	const [drawParticles, resetParticles] = createAmbientParticles(
		ctx,
		width,
		height,
		pulses,
		settings
	);

	function drawFrame() {
		ctx.clearRect(0, 0, width, height);
		drawPulses();
		drawParticles();
		requestAnimationFrame(drawFrame);
	}

	drawFrame();

	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		width = canvas.width;
		height = canvas.height;

		resetParticles(width, height);
	});

	const parallaxStrength = 20;
	let targetX = 0,
		targetY = 0;
	let currentX = 0,
		currentY = 0;

	window.addEventListener('mousemove', (e) => {
		const percentX = (e.clientX / window.innerWidth - 0.5) * -2;
		const percentY = (e.clientY / window.innerHeight - 0.5) * -2;
		targetX = percentX * parallaxStrength;
		targetY = percentY * parallaxStrength;
	});

	function animateParallax() {
		currentX += (targetX - currentX) * 0.0095;
		currentY += (targetY - currentY) * 0.0095;
		canvas.style.transform = `translate(${currentX}px, ${currentY}px)`;
		requestAnimationFrame(animateParallax);
	}

	animateParallax();

	window.triggerRadialPulse = () => triggerPulse(width / 2, height / 2);
}
