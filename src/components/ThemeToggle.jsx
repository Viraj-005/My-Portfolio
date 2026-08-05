import { useCallback, useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Initial state is read from the class the boot script already applied, so this
 * never fights it and never causes a flash. It also no longer forces "light" on
 * first visit. An unset preference follows the OS.
 */
export const ThemeToggle = ({ className }) => {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : false
  );

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch {
        /* storage unavailable, the class still applies for this session */
      }
      return next;
    });
  }, []);

  // Follow the OS while the user has never made an explicit choice.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => {
      let stored = null;
      try {
        stored = localStorage.getItem('theme');
      } catch {
        /* ignore */
      }
      if (stored) return;
      document.documentElement.classList.toggle('dark', event.matches);
      setIsDark(event.matches);
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={cn(
        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
        'cursor-pointer text-muted transition-colors duration-[--duration-fast]',
        'hover:bg-surface-2 hover:text-foreground',
        className
      )}
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );
};
