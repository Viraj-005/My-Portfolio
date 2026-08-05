import { useEffect, useRef } from 'react';

/**
 * Reveals `[data-reveal]` descendants once as they scroll into view.
 *
 * Content is visible by default. The hidden state lives behind the `.js-motion`
 * class that the boot script in index.html only adds when IntersectionObserver
 * exists and reduced-motion is off, so a failed script, an old browser, or a
 * headless render all ship visible content instead of a blank section.
 *
 * A MutationObserver watches for nodes added after mount. Without it, anything
 * rendered later (the "Show all projects" and "Show all certifications"
 * expansions) never gets observed, so it keeps the hidden state forever and the
 * button appears to do nothing.
 *
 * Usage:
 *   const ref = useReveal();
 *   <section ref={ref}>
 *     <h2 data-reveal>…</h2>
 *     <div data-reveal style={{ '--reveal-delay': '80ms' }}>…</div>
 *   </section>
 */
export function useReveal(options) {
  const ref = useRef(null);
  const rootMargin = options?.rootMargin ?? '0px 0px -12% 0px';
  const threshold = options?.threshold ?? 0.05;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Mirrors the boot script's guard. If motion is off, nothing was hidden.
    if (!document.documentElement.classList.contains('js-motion')) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          intersectionObserver.unobserve(entry.target);
        });
      },
      { rootMargin, threshold }
    );

    const tracked = new WeakSet();

    const observeNew = () => {
      root.querySelectorAll('[data-reveal]').forEach((el) => {
        if (tracked.has(el) || el.classList.contains('is-revealed')) return;
        tracked.add(el);
        intersectionObserver.observe(el);
      });
    };

    observeNew();

    const mutationObserver = new MutationObserver(observeNew);
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [rootMargin, threshold]);

  return ref;
}

/**
 * Inline style helper for staggering siblings.
 * Cap the multiplier so a long list never leaves the last item waiting seconds.
 */
export function stagger(index, step = 55, max = 8) {
  return { '--reveal-delay': `${Math.min(index, max) * step}ms` };
}
