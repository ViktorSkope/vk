const bento = document.querySelector(".bento");
const cols = [...bento.querySelectorAll(".bento__col")];
const narrow = window.matchMedia("(max-width: 760px)");

function setActive(index) {
  if (index === null) {
    delete bento.dataset.active;
  } else {
    bento.dataset.active = String(index);
  }
  cols.forEach((col, i) => col.classList.toggle("is-active", i === index));
}

cols.forEach((col, i) => {
  // Mouse: hover expands; touch/keyboard: tap or focus expands.
  col.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "mouse") setActive(i);
  });
  col.addEventListener("click", (e) => {
    if (e.target.closest(".tile__cta")) return;
    setActive(i);
  });
  col.addEventListener("focus", () => setActive(i));
});

// Desktop returns to the overview when the pointer leaves the grid.
// On small screens one image is always open, since there is no hover.
bento.addEventListener("pointerleave", (e) => {
  if (e.pointerType === "mouse" && !narrow.matches) setActive(null);
});

// Read More links are placeholders until real project pages exist.
bento.querySelectorAll(".tile__cta").forEach((a) =>
  a.addEventListener("click", (e) => e.preventDefault())
);

function sync() {
  if (narrow.matches && bento.dataset.active === undefined) setActive(0);
  if (!narrow.matches && !bento.matches(":hover")) setActive(null);
}
narrow.addEventListener("change", sync);
sync();
