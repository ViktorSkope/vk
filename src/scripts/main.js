import { initNav } from "./nav.js";
import { initCookieConsent } from "./cookie-consent.js";
import { initImageLoading, initPageProgress, initLoadMore } from "./loading.js";
import { initWorkFilter } from "./work-filter.js";
import { initContactForm } from "./contact-form.js";
import { initMedia } from "./media.js";
import { initTypewriter } from "./typewriter.js";
import { initSettle } from "./motion.js";

initNav();
initCookieConsent();
initImageLoading();
initPageProgress();
initLoadMore();
initWorkFilter();
initContactForm();
initMedia();
initTypewriter();
initSettle();

// Arriving from another page's "Lets Talk" (/#contact): make sure the form is in view,
// even when the browser skips its own jump because the page is still settling.
function scrollToHash() {
  if (!location.hash) return;
  let target = null;
  try {
    target = document.querySelector(location.hash);
  } catch {
    return;
  }
  if (target && Math.abs(target.getBoundingClientRect().top) > 80) target.scrollIntoView({ behavior: "instant" });
}
if (document.readyState === "complete") scrollToHash();
else window.addEventListener("load", scrollToHash, { once: true });
