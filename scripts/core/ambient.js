export function initAmbientEffect() {
  const canvas = document.getElementById("pixels");
  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  function drawPixels() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
    ctx.fillRect(0, 0, width, height);
    
    const count = 15;
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb');
      ctx.fillStyle = `rgba(${accentColor}, 0.6)`;
      ctx.fill();
    }
  }

  setInterval(drawPixels, 500);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const parallaxStrength = 20;

  window.addEventListener("mousemove", (e) => {
    const percentX = (e.clientX / window.innerWidth - 0.5) * -2;
    const percentY = (e.clientY / window.innerHeight - 0.5) * -2;

    anime({
      targets: canvas,
      translateX: percentX * parallaxStrength,
      translateY: percentY * parallaxStrength,
      duration: 600,
      easing: 'easeOutQuad'
    });
  });
}
