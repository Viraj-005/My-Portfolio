import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

const navItems = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Certifications', href: '#certificates', id: 'certificates' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const menuButtonRef = useRef(null);
  const panelRef = useRef(null);

  // Was `window.screenY`, which is the browser window's screen position and
  // never changes on scroll, so the scrolled state could not fire.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight the section currently occupying the middle of the viewport.
  useEffect(() => {
    const sections = ['hero', ...navItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0 || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Escape closes the menu and returns focus to the trigger; scroll is locked
  // while it is open so the page behind cannot move under the overlay.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector('a')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 transition-colors duration-[--duration-base]',
        isScrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      )}
      style={{ zIndex: 'var(--z-nav)' }}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <a
          href="#hero"
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          VRJ<span className="text-primary">.</span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative rounded-lg px-3 py-2 text-sm transition-colors duration-[--duration-fast]',
                      isActive
                        ? 'text-foreground'
                        : 'text-muted hover:text-foreground'
                    )}
                  >
                    {item.name}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 -bottom-px h-px origin-left bg-primary transition-transform duration-[--duration-base] ease-[--ease-out-expo]',
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors duration-[--duration-fast] hover:bg-surface-2 hover:text-foreground md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!isMenuOpen}
        className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
      >
        <nav aria-label="Mobile" className="container py-4">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={activeId === item.id ? 'true' : undefined}
                  className={cn(
                    'flex min-h-[44px] items-center rounded-lg px-3 text-base transition-colors duration-[--duration-fast]',
                    activeId === item.id
                      ? 'text-foreground'
                      : 'text-muted hover:text-foreground'
                  )}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
