import { useCallback, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ThemeToggle = ({ className }) => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const activeTransition = useRef(null);
  const toggleTheme = useCallback((event) => {
    activeTransition.current?.skipTransition();
    const root = document.documentElement;
    const next = !root.classList.contains('dark');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const update = () => {
      root.classList.toggle('dark', next);
      flushSync(() => setIsDark(next));
      try { localStorage.setItem('portfolio-theme-v2', next ? 'dark' : 'light'); } catch { /* Keep the in-session preference. */ }
    };
    if (!document.startViewTransition || reduced) { update(); return; }
    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(update);
    activeTransition.current = transition;
    transition.ready.then(() => {
      root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] }, {
        duration: 650, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', pseudoElement: '::view-transition-new(root)',
      });
    }).catch(() => {});
    transition.finished.catch(() => {}).finally(() => {
      if (activeTransition.current === transition) activeTransition.current = null;
    });
  }, []);
  return <button type="button" onClick={toggleTheme} data-theme={isDark ? 'dark' : 'light'}
    aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'} aria-pressed={isDark}
    className={cn('theme-toggle', className)}>
    <span className="theme-icon" aria-hidden="true"><Sun className="theme-sun"/><Moon className="theme-moon"/></span>
  </button>;
};
