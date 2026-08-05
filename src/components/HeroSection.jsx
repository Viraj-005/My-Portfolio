import { useState } from 'react';
import { ArrowDown, Download, Check, Github, Linkedin } from 'lucide-react';
import profileImage from '@/assets/viraj-profile2.webp';
import resumePDF from '@/assets/Viraj_Induruwa.pdf';
import { useReveal, stagger } from '@/hooks/use-reveal';

/**
 * A monospace readout instead of the usual three-big-numbers hero strip.
 * Same proof, but it reads as a system status line rather than a SaaS metric row.
 */
const readout = [
  { key: 'now', value: 'Freelance Software Engineer · Sri Lanka Telecom' },
  { key: 'focus', value: 'Backend systems, enterprise automation, applied ML' },
  { key: 'models', value: '98% lung · 93% skin · 88% leukemia detection' },
];

export const HeroSection = () => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const revealRef = useReveal();

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Viraj_Induruwa_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2400);
  };

  return (
    <section
      id="hero"
      ref={revealRef}
      className="relative flex min-h-[100svh] items-center pt-28 pb-20"
    >
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          {/* ── Content ─────────────────────────────────────────── */}
          <div>
            <p
              data-reveal="fade"
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 py-1.5 pl-2.5 pr-3.5 font-mono text-xs text-muted backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for freelance work
            </p>

            <h1 data-reveal style={stagger(1)} className="display mb-6">
              Viraj Induruwa
            </h1>

            <p
              data-reveal
              style={stagger(2)}
              className="prose-body mb-10 text-lg md:text-xl"
            >
              I build backend systems and AI-powered applications, turning manual
              enterprise workflows into automated ones and medical imaging into
              diagnostic tools.
            </p>

            {/* System readout */}
            <dl
              data-reveal
              style={stagger(3)}
              className="mb-10 space-y-2.5 border-l border-border pl-5"
            >
              {readout.map((row) => (
                <div key={row.key} className="flex flex-col gap-x-4 sm:flex-row">
                  <dt className="label-mono w-20 shrink-0 pt-px">{row.key}</dt>
                  <dd className="text-sm text-muted tabular">{row.value}</dd>
                </div>
              ))}
            </dl>

            {/* ── Actions ─────────────────────────────────────── */}
            <div
              data-reveal
              style={stagger(4)}
              className="flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  document
                    .getElementById('projects')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                View my work
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleDownloadCV}
              >
                {isDownloaded ? (
                  <>
                    <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                    Downloaded
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download CV
                  </>
                )}
              </button>

              <span className="mx-1 hidden h-6 w-px bg-border sm:block" aria-hidden="true" />

              <a
                href="https://github.com/Viraj-005"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="btn btn-ghost !px-3"
              >
                <Github className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/in/viraj-induruwa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="btn btn-ghost !px-3"
              >
                <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* ── Portrait ────────────────────────────────────────── */}
          <div data-reveal style={stagger(2)} className="order-first lg:order-last">
            {/* Capped at every breakpoint: unbounded, the 5:6 portrait grows
                tall enough on desktop to push the CTAs off the first screen. */}
            <div className="relative mx-auto w-full max-w-[200px] sm:max-w-[240px] lg:mx-0 lg:ml-auto lg:max-w-[400px]">
              <div className="panel overflow-hidden">
                <img
                  src={profileImage}
                  alt="Viraj Induruwa"
                  width={520}
                  height={620}
                  fetchPriority="high"
                  className="aspect-[5/6] w-full object-cover"
                />
              </div>
              {/* Corner ticks: a quiet nod to the grid behind everything */}
              <span
                className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-primary"
                aria-hidden="true"
              />
              <span
                className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-primary"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* ── Scroll cue ────────────────────────────────────────── */}
        <div className="mt-16 hidden lg:block">
          <a
            href="#about"
            className="group inline-flex items-center gap-2 font-mono text-xs text-subtle transition-colors duration-[--duration-fast] hover:text-foreground"
          >
            <ArrowDown
              className="h-3.5 w-3.5 transition-transform duration-[--duration-base] ease-[--ease-out-expo] group-hover:translate-y-0.5"
              aria-hidden="true"
            />
            Scroll
          </a>
        </div>
      </div>
    </section>
  );
};
