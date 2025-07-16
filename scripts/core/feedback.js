let overflowResetTimeout;

export function triggerOverflowFeedback() {
  const windowEl = document.querySelector(".window");
  const keyboardEl = document.querySelector("#keyboard");
  const triggerEl = document.querySelector("#keyboard-trigger");
  const accents = document.querySelectorAll("#prompt, #cursor");

  windowEl.classList.remove("shake");
  keyboardEl.classList.remove("shake");
  triggerEl.classList.remove("shake");
  void windowEl.offsetWidth;
  windowEl.classList.add("shake");
  keyboardEl.classList.add("shake");
  triggerEl.classList.add("shake");

  accents.forEach(el => el.style.color = "#f00");
  document.documentElement.style.setProperty("--accent-color", "#f00");
  document.documentElement.style.setProperty("--accent-rgb", "255, 0, 0");


  clearTimeout(overflowResetTimeout);
  overflowResetTimeout = setTimeout(() => {
    windowEl.classList.remove("shake");
    keyboardEl.classList.remove("shake");
    triggerEl.classList.remove("shake");
    accents.forEach(el => el.style.color = "");
    document.documentElement.style.setProperty("--accent-color", "#0f0");
    document.documentElement.style.setProperty("--accent-rgb", "0, 255, 0");
  }, 600);
}
