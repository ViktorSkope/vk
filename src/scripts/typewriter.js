// Types the document inside [data-typewriter] as if someone were writing it, following the
// caret as it goes. Tokens and colour codes change colour the moment they are finished.

const INLINE = /(\/\*.*?\*\/)|(#[0-9a-fA-F]{6}\b)|(--[a-z][a-z0-9-]*)|(\*\*|\||-{3})/g;
const INLINE_KINDS = ["comment", "hex", "token", "mark"];
const MAP_LUMINANCE = 0.012;

function tokenize(text, plainKind) {
  const segments = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    if (match.index > last) segments.push({ text: text.slice(last, match.index), kind: plainKind });
    const group = match.slice(1).findIndex(Boolean);
    segments.push({ text: match[0], kind: INLINE_KINDS[group] });
    last = match.index + match[0].length;
  }
  if (last < text.length) segments.push({ text: text.slice(last), kind: plainKind });
  return segments;
}

function parseLine(line) {
  const heading = line.match(/^(#{1,3} )(.*)$/);
  if (heading) {
    return [
      { text: heading[1], kind: "mark" },
      { text: heading[2], kind: "heading" },
    ];
  }
  const segments = [];
  const bullet = line.startsWith("- ");
  if (bullet) segments.push({ text: "- ", kind: "mark" });
  // Odd parts sit between backticks, so they are inline code
  (bullet ? line.slice(2) : line).split("`").forEach((part, index) => {
    if (index > 0) segments.push({ text: "`", kind: "mark" });
    if (part) segments.push(...tokenize(part, index % 2 ? "code" : "plain"));
  });
  return segments;
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((start) => {
    const channel = parseInt(hex.slice(start, start + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// A colour too close to the background keeps the light text. Its swatch still shows the value
function readable(hex) {
  return (luminance(hex) + 0.05) / (MAP_LUMINANCE + 0.05) >= 2;
}

function createLine() {
  const line = document.createElement("div");
  line.className = "typewriter__line";
  return line;
}

function createSegment(kind) {
  const span = document.createElement("span");
  span.className = `typewriter__segment typewriter__segment--${kind}`;
  return span;
}

// Runs when a segment's last character lands. `row` remembers the token a colour code belongs to
function finishSegment(span, segment, row) {
  span.classList.add("is-done");
  if (segment.kind === "token") row.token = span;
  if (segment.kind !== "hex") return;

  const swatch = document.createElement("span");
  swatch.className = "typewriter__swatch";
  swatch.style.background = segment.text;
  span.after(swatch);
  if (readable(segment.text)) {
    span.style.color = segment.text;
    if (row.token) row.token.style.color = segment.text;
  }
}

function renderStatic(text, lines) {
  lines.forEach((segments) => {
    const line = createLine();
    const row = {};
    text.append(line);
    segments.forEach((segment) => {
      const span = createSegment(segment.kind);
      span.textContent = segment.text;
      line.append(span);
      finishSegment(span, segment, row);
    });
  });
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const between = (min, max) => min + Math.random() * (max - min);

function characterDelay(character) {
  if (character === " ") return between(20, 50);
  if (".,:;".includes(character)) return between(70, 150);
  return between(14, 38);
}

async function play(root, text, lines) {
  const caret = document.createElement("span");
  caret.className = "typewriter__caret";

  let onScreen = false;
  let resume = null;
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen && resume) {
      resume();
      resume = null;
    }
  }).observe(root);
  const whenOnScreen = () => (onScreen ? null : new Promise((resolve) => (resume = resolve)));

  const padding = parseFloat(getComputedStyle(text).paddingBottom);
  const follow = () => {
    const bottom = caret.offsetTop + caret.offsetHeight + padding;
    const offset = Math.max(0, bottom - root.clientHeight);
    text.style.transform = `translateY(${-offset}px)`;
  };

  for (;;) {
    text.replaceChildren();
    text.style.transform = "";
    root.classList.remove("is-fading");

    for (const segments of lines) {
      const line = createLine();
      const row = {};
      text.append(line);
      line.append(caret);
      follow();

      for (const segment of segments) {
        const span = createSegment(segment.kind);
        const typed = document.createTextNode("");
        span.append(typed);
        caret.before(span);

        for (const character of segment.text) {
          await whenOnScreen();
          await wait(characterDelay(character));
          typed.appendData(character);
          follow();
        }

        finishSegment(span, segment, row);
        if (segment.kind === "hex") await wait(160);
      }

      await wait(segments.length ? between(90, 220) : 60);
    }

    await wait(2600);
    root.classList.add("is-fading");
    await wait(300);
  }
}

export function initTypewriter() {
  document.querySelectorAll("[data-typewriter]").forEach((root) => {
    const lines = root.textContent.trim().split("\n").map(parseLine);
    const text = document.createElement("div");
    text.className = "typewriter__text";
    root.replaceChildren(text);
    root.classList.add("is-ready");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      renderStatic(text, lines);
    } else {
      play(root, text, lines);
    }
  });
}
