export function createAmbientParticles(ctx, width, height, pulses, settings) {
  const particles = [];

  function spawnParticle() {
    if (particles.length >= settings.MAX_PARTICLES) return;

    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent-rgb')
      .trim();

    const lifespan = settings.BASE_LIFESPAN * (0.5 + Math.random());

    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      age: 0,
      lifespan,
      color: accentColor,
    });
  }

  function draw() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      const t = p.age / p.lifespan;
      const opacity = Math.sin(Math.PI * t);

      let size = 1.5;
      let finalOpacity = opacity * 0.6;

      for (const pulse of pulses) {
        const dist = Math.hypot(p.x - pulse.x, p.y - pulse.y);
        const diff = Math.abs(dist - pulse.radius);
        if (diff < settings.PULSE_THICKNESS / 2) {
          const strength = Math.cos((diff / (settings.PULSE_THICKNESS / 2)) * Math.PI);
          finalOpacity = Math.min(finalOpacity + strength * 0.8, 1);
          size = 3.5;
          break;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${finalOpacity})`;
      ctx.fill();

      p.age++;
      if (p.age >= p.lifespan) particles.splice(i, 1);
    }

    for (let i = 0; i < settings.PARTICLES_PER_FRAME; i++) {
      spawnParticle();
    }
  }

  return draw;
}
