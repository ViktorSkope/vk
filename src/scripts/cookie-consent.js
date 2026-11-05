const STORAGE_KEY = "vk-cookie-consent";

function readConsent() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function writeConsent(consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Storage can be blocked. The choice still applies to this page view.
  }
}

// Load analytics or marketing tools by listening for `vk:consent`, never before it fires.
function applyConsent(consent) {
  document.dispatchEvent(new CustomEvent("vk:consent", { detail: consent }));
}

export function initCookieConsent() {
  const banner = document.getElementById("cookie-banner");
  const prefs = document.getElementById("cookie-prefs");
  const manage = banner.querySelector("[data-cookie-manage]");
  const save = banner.querySelector("[data-cookie-save]");

  function showPrefs(show) {
    prefs.hidden = !show;
    manage.hidden = show;
    save.hidden = !show;
  }

  function open() {
    const saved = readConsent();
    prefs.elements.analytics.checked = Boolean(saved?.analytics);
    prefs.elements.marketing.checked = Boolean(saved?.marketing);
    showPrefs(false);
    banner.hidden = false;
  }

  function decide(analytics, marketing) {
    const consent = { essential: true, analytics, marketing, decidedAt: new Date().toISOString() };
    writeConsent(consent);
    applyConsent(consent);
    banner.hidden = true;
  }

  banner.querySelector("[data-cookie-accept]").addEventListener("click", () => decide(true, true));
  banner.querySelector("[data-cookie-reject]").addEventListener("click", () => decide(false, false));
  manage.addEventListener("click", () => showPrefs(true));
  save.addEventListener("click", () => decide(prefs.elements.analytics.checked, prefs.elements.marketing.checked));

  document.querySelectorAll("[data-cookie-settings]").forEach((button) => {
    button.addEventListener("click", () => {
      open();
      banner.querySelector("[data-cookie-accept]").focus();
    });
  });

  const saved = readConsent();
  if (saved) applyConsent(saved);
  else open();
}
