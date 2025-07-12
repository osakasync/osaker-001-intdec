export function animateKeyPress(btn, wasActive, isNowActive) {
  anime.remove(btn);

  if (isNowActive) {
    anime({
      targets: btn,
      scale: 0.94,
      duration: 100,
      easing: "easeOutCubic"
    });
  } else if (wasActive) {
    anime({
      targets: btn,
      scale: 1,
      duration: 150,
      easing: "easeOutElastic(1, 0.5)"
    });
  } else {
    anime({
      targets: btn,
      scale: [
        { value: 0.94, duration: 60, easing: "easeOutCubic" },
        { value: 1, duration: 140, easing: "easeOutElastic(1, 0.5)" }
      ]
    });
  }
}
