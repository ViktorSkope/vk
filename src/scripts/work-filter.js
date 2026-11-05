export function initWorkFilter() {
  const buttons = document.querySelectorAll("[data-filter]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
      document.querySelectorAll("[data-category]").forEach((item) => {
        item.classList.toggle("is-filtered-out", filter !== "all" && item.dataset.category !== filter);
      });
    });
  });
}
