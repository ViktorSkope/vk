import { popIn, popOut } from "./motion.js";

export function initNav() {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");

  const path = window.location.pathname;
  links.querySelectorAll("a").forEach((link) => {
    if (path.startsWith(link.getAttribute("href"))) link.setAttribute("aria-current", "page");
  });

  // The menu is a dropdown only while the toggle is showing (small screens)
  const isDropdown = () => getComputedStyle(toggle).display !== "none";

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) {
      links.classList.add("is-open");
      if (isDropdown()) popIn(links, { trigger: toggle, rows: links.children });
    } else if (isDropdown()) {
      popOut(links, { trigger: toggle }).then(() => {
        if (toggle.getAttribute("aria-expanded") === "false") links.classList.remove("is-open");
      });
    } else {
      links.classList.remove("is-open");
    }
  }

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });
}
