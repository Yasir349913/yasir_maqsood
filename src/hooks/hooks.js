import { useEffect, useRef } from "react";

/**
 * useScrollReveal
 * Attach ref to a container — children with [data-reveal] animate in on scroll.
 * @param {object} options
 * @param {number} options.threshold - 0-1, how much of element must be visible (default 0.15)
 * @param {number} options.staggerMs - delay between each child (default 100)
 * @param {string} options.translateY - initial vertical offset (default "28px")
 */
export function useScrollReveal({
  threshold = 0.15,
  staggerMs = 100,
  translateY = "28px",
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll("[data-reveal]");

    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = `translateY(${translateY})`;
      el.style.transition = "opacity 0.65s ease, transform 0.65s ease";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const els = entry.target.querySelectorAll("[data-reveal]");
          els.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, i * staggerMs);
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold, staggerMs, translateY]);

  return ref;
}

/**
 * useCountUp
 * Animates a number from 0 → target when element enters the viewport.
 * @param {number} target - the final number
 * @param {number} duration - animation duration in ms (default 1800)
 */
export function useCountUp(target, duration = 1800) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const numericTarget = parseFloat(target);

        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * numericTarget);
          el.textContent = current + (String(target).includes("+") ? "+" : "");
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return ref;
}
