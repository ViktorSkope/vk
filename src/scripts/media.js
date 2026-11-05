// Product recordings download and play only while on screen, to save data.
// People who prefer reduced motion get the still poster and can press play.
export function initMedia() {
  const videos = document.querySelectorAll("video[data-autoplay]");
  if (!videos.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    videos.forEach((video) => (video.controls = true));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) target.play().catch(() => {});
      else target.pause();
    });
  });

  videos.forEach((video) => observer.observe(video));
}
