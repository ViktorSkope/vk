// Motion rules from design/DESIGN.md ("Motion"). Timings come from the CSS tokens,
// so the stylesheet and the scripts never disagree.

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

function token(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function ms(name, fallback) {
  return parseFloat(token(name, `${fallback}ms`)) || fallback;
}

const timing = () => ({
  open: ms("--motion-open", 200),
  close: ms("--motion-close", 160),
  stagger: ms("--motion-stagger", 30),
  ease: token("--ease-in-out", "cubic-bezier(0.45, 0, 0.55, 1)"),
  scale: parseFloat(token("--popover-scale", "0.95")),
});

// Grows from, and shrinks back into, the element that opened it
function originFrom(el, trigger) {
  if (!trigger) return null;
  const box = el.getBoundingClientRect();
  const from = trigger.getBoundingClientRect();
  const x = Math.min(Math.max(from.left + from.width / 2 - box.left, 0), box.width);
  const y = Math.min(Math.max(from.top + from.height / 2 - box.top, 0), box.height);
  return `${x}px ${y}px`;
}

function finished(animation) {
  return animation.finished.catch(() => {});
}

// Popovers and dropdowns: start at 0.95 and fade in, eased in and out
export function popIn(el, { trigger, origin, rows } = {}) {
  el.getAnimations().forEach((a) => a.cancel());
  if (reduced.matches) return Promise.resolve();
  const t = timing();
  el.style.transformOrigin = originFrom(el, trigger) || origin || "50% 0";
  const animation = el.animate(
    [
      { opacity: 0, transform: `scale(${t.scale})` },
      { opacity: 1, transform: "scale(1)" },
    ],
    { duration: t.open, easing: t.ease },
  );
  if (rows) staggerIn(rows, { delay: t.stagger });
  return finished(animation);
}

// Exits run 20% shorter than openings and shrink back towards the trigger
export function popOut(el, { trigger, origin } = {}) {
  el.getAnimations().forEach((a) => a.cancel());
  if (reduced.matches) return Promise.resolve();
  const t = timing();
  el.style.transformOrigin = originFrom(el, trigger) || origin || el.style.transformOrigin || "50% 0";
  const animation = el.animate(
    [
      { opacity: 1, transform: "scale(1)" },
      { opacity: 0, transform: `scale(${t.scale})` },
    ],
    { duration: t.close, easing: t.ease, fill: "forwards" },
  );
  return finished(animation).then(() => animation.cancel());
}

// List rows enter one after another, 30ms apart
export function staggerIn(items, { delay = 0, distance = 4 } = {}) {
  if (reduced.matches) return;
  const t = timing();
  [...items].forEach((item, i) => {
    item.animate(
      [
        { opacity: 0, transform: `translateY(${distance}px)` },
        { opacity: 1, transform: "none" },
      ],
      { duration: t.open, easing: t.ease, delay: delay + i * t.stagger, fill: "backwards" },
    );
  });
}

// Details settle into place like notifications: a slightly longer drop, staggered
export function settle(items) {
  staggerIn(items, { distance: 12 });
}

// Settle each group of details the first time it scrolls into view
export function initSettle() {
  const groups = document.querySelectorAll("[data-settle]");
  if (!groups.length || reduced.matches || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        settle(entry.target.children);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 },
  );
  groups.forEach((group) => observer.observe(group));

  // FAQ answers settle in when opened
  document.querySelectorAll(".faq details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (details.open) settle([...details.children].filter((child) => child.tagName !== "SUMMARY"));
    });
  });
}
