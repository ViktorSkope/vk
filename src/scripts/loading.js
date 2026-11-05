// Placeholder delay. Replace with a real request when content comes from a CMS.
const LOAD_MORE_DELAY = 900;
const LOAD_MORE_STEP = 3;

export function initImageLoading() {
  document.querySelectorAll(".tile img").forEach((image) => {
    if (image.complete) return;
    const tile = image.closest(".tile");
    tile.classList.add("is-loading");
    const done = () => tile.classList.remove("is-loading");
    image.addEventListener("load", done, { once: true });
    image.addEventListener("error", done, { once: true });
  });
}

export function initPageProgress() {
  const bar = document.querySelector(".page-progress");

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target) return;

    const url = new URL(link.href);
    const samePage = url.pathname === window.location.pathname && url.search === window.location.search;
    if (url.origin !== window.location.origin || samePage) return;

    bar.classList.add("is-active");
  });

  // Back and forward can restore this page from memory with the bar still showing.
  window.addEventListener("pageshow", () => bar.classList.remove("is-active"));
}

function skeletonItem(type) {
  const item = document.createElement("li");
  item.className = `skeleton-${type}`;
  item.setAttribute("aria-hidden", "true");
  item.innerHTML =
    type === "card"
      ? '<div class="skeleton skeleton--media"></div><div class="skeleton skeleton--line"></div><div class="skeleton skeleton--line skeleton--short"></div>'
      : '<div class="skeleton skeleton--line skeleton--short"></div><div class="skeleton skeleton--title"></div><div class="skeleton skeleton--line"></div>';
  return item;
}

export function initLoadMore() {
  document.querySelectorAll("[data-load-more]").forEach((button) => {
    const list = document.querySelector(button.dataset.loadMore);
    const status = document.querySelector("[data-load-status]");

    button.addEventListener("click", () => {
      const next = [...list.querySelectorAll("[data-more][hidden]")].slice(0, LOAD_MORE_STEP);
      const skeletons = next.map(() => skeletonItem(list.dataset.skeleton));

      button.setAttribute("aria-busy", "true");
      list.append(...skeletons);

      setTimeout(() => {
        skeletons.forEach((skeleton) => skeleton.remove());
        next.forEach((item) => (item.hidden = false));
        button.removeAttribute("aria-busy");
        status.textContent = `${next.length} more items loaded.`;
        if (!list.querySelector("[data-more][hidden]")) button.hidden = true;
      }, LOAD_MORE_DELAY);
    });
  });
}
