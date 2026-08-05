import { Github, Linkedin, BookOpen, ArrowUp } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/Viraj-005' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/viraj-induruwa' },
  { name: 'Medium', icon: BookOpen, href: 'https://medium.com/@virajinduruwa2' },
];

const navigationLinks = [
  { name: 'About', href: '#about' },
  { name: 'Stack', href: '#skills' },
  { name: 'Work', href: '#projects' },
  { name: 'Certifications', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-8 border-t border-border bg-surface/40" style={{ zIndex: 'var(--z-raised)' }}>
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-mono text-sm font-semibold">
              VRJ<span className="text-primary">.</span>
            </p>
            <p className="prose-body mt-3 max-w-xs text-sm">
              Software engineer building backend systems, enterprise automation,
              and AI-powered applications.
            </p>

            <ul className="mt-6 flex gap-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors duration-[--duration-fast] hover:bg-surface-2 hover:text-foreground"
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="label-mono">navigate</h2>
            <ul className="mt-4 space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-[--duration-fast] hover:text-foreground"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label-mono">contact</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:virajinduruwa123@gmail.com"
                  className="text-muted transition-colors duration-[--duration-fast] hover:text-foreground"
                >
                  virajinduruwa123@gmail.com
                </a>
              </li>
              <li className="text-muted">Sri Lanka</li>
              <li className="text-subtle">Available for freelance work</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="label-mono">
            © {currentYear} Viraj Induruwa
          </p>

          <a
            href="#hero"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-subtle transition-colors duration-[--duration-fast] hover:text-foreground"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};
