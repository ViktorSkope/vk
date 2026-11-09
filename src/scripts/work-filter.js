import { staggerIn } from "./motion.js";

export function initWorkFilter() {
  const buttons = document.querySelectorAll("[data-filter]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
      const shown = [];
      document.querySelectorAll("[data-category]").forEach((item) => {
        const out = filter !== "all" && item.dataset.category !== filter;
        item.classList.toggle("is-filtered-out", out);
        if (!out && !item.hidden) shown.push(item);
      });
      staggerIn(shown);
    });
  });
}
