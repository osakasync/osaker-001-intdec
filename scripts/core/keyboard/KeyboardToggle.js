export function initKeyboardToggle() {
  const trigger = document.getElementById('keyboard-trigger');
  const arrow = trigger?.querySelector('.arrow');
  const keyboard = document.getElementById('keyboard');
  const terminalWindow = document.querySelector('.window');

  if (!trigger || !keyboard || !terminalWindow || !arrow) return;

  let keyboardOpen = false;

  const flicker = (el, times = 2, duration = 60) => {
    const tl = anime.timeline({
      targets: el,
      easing: 'steps(2)'
    });

    for (let i = 0; i < times; i++) {
      tl.add({ opacity: 0, duration });
      tl.add({ opacity: 1, duration });
    }

    return tl;
  };


  trigger.addEventListener('click', () => {
    trigger.style.pointerEvents = 'none';

    if (!keyboardOpen) {
      //showing the keyboard
      arrow.innerHTML = '&#x25B2;';
      flicker(trigger);

      anime({
        targets: terminalWindow,
        translateY: 0,
        duration: 100,
        easing: 'easeOutExpo'
      });

      keyboard.style.display = 'flex';
      keyboard.style.transform = 'translateY(-20px)';

      anime({
        targets: keyboard,
        translateY: ['-20px', '0px'],
        duration: 120,
        easing: 'easeOutCubic'
      });

      setTimeout(() => {
        keyboardOpen = true;
        trigger.style.pointerEvents = 'auto';
      }, 150);

    } else {
      //hiding the keyboard
      arrow.innerHTML = '&#x25BC;';
      flicker(trigger);

      anime({
        targets: terminalWindow,
        translateY: 0,
        duration: 100,
        easing: 'easeOutExpo'
      });

      anime({
        targets: keyboard,
        translateY: ['0px', '-20px'],
        duration: 120,
        easing: 'easeInCubic',
        complete: () => {
          keyboard.style.display = 'none';
        }
      });

      setTimeout(() => {
        keyboardOpen = false;
        trigger.style.pointerEvents = 'auto';
      }, 150);
    }
  });
}
