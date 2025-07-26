export function createPulseManager(ctx, settings) {
	const pulses = [];

	function drawPulses() {
		for (let i = pulses.length - 1; i >= 0; i--) {
			const p = pulses[i];
			const t = p.age / p.lifespan;
			const radius = (0.2 + 0.8 * t) * p.maxRadius;
			const opacity = 1 - t;

			ctx.beginPath();
			ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(${p.accentRGB}, ${opacity * 0.015})`;
			ctx.fill();

			ctx.save();
			ctx.shadowColor = `rgba(${p.accentRGB}, ${opacity * 0.2})`;
			ctx.shadowBlur = 20;
			ctx.strokeStyle = `rgba(${p.accentRGB}, ${opacity * 0.2})`;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
			ctx.stroke();
			ctx.restore();

			p.age++;
			if (p.age >= p.lifespan) {
				pulses.splice(i, 1);
			} else {
				p.radius = radius;
			}
		}
	}

	function triggerPulse(x, y) {
		const accentRGB = getComputedStyle(document.documentElement)
			.getPropertyValue('--accent-rgb')
			.trim();

		pulses.push({
			x,
			y,
			age: 0,
			lifespan: 120,
			maxRadius: settings.MAX_PULSE_RADIUS,
			accentRGB,
		});
	}

	return {
		pulses,
		drawPulses,
		triggerPulse,
	};
}
