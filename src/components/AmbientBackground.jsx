/**
 * AmbientBackground
 * ─────────────────────────────────────────────────────────────────
 * The page's base material. Four stacked layers, all pure CSS/SVG:
 *
 *   1. Grid       : a 72px engineering grid, radially masked so it dissolves
 *                   toward the edges instead of tiling to the viewport border.
 *   2. Light      : two soft radial fields in the brand hue. One drifts on a
 *                   50s cycle; slow enough that it reads as depth, not motion.
 *   3. Vignette   : pulls the corners down so content sits in a pool of light.
 *   4. Grain      : feTurbulence at 3.5 to 5%. Kills gradient banding and gives
 *                   flat fills a filmic surface rather than a plastic one.
 *
 * There is no canvas, no requestAnimationFrame, and no resize listener, so this
 * costs one compositor layer and nothing per frame. The single animation is
 * transform-only and is disabled under prefers-reduced-motion.
 */
export const AmbientBackground = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* 1. Engineering grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(ellipse 90% 70% at 50% 0%, #000 25%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 70% at 50% 0%, #000 25%, transparent 78%)',
        }}
      />

      {/* 2a. Primary light field: anchored behind the hero, drifts slowly */}
      <div
        className="ambient-drift absolute"
        style={{
          top: '-30vh',
          left: '50%',
          width: 'min(140vw, 1500px)',
          height: 'min(120vh, 1100px)',
          marginLeft: 'calc(min(140vw, 1500px) / -2)',
          background:
            'radial-gradient(ellipse at center, var(--glow-1) 0%, transparent 68%)',
        }}
      />

      {/* 2b. Secondary field: accent hue, off-axis, static */}
      <div
        className="absolute"
        style={{
          top: '55vh',
          right: '-20vw',
          width: 'min(90vw, 900px)',
          height: 'min(70vh, 700px)',
          background:
            'radial-gradient(ellipse at center, var(--glow-2) 0%, transparent 70%)',
        }}
      />

      {/* 3. Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 90% at 50% 35%, transparent 40%, var(--bg) 100%)',
        }}
      />

      {/* 4. Film grain */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 'var(--grain-opacity)',
          mixBlendMode: 'var(--grain-blend)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <style>{`
        .ambient-drift {
          animation: ambient-drift 50s ease-in-out infinite alternate;
          will-change: transform;
        }

        @keyframes ambient-drift {
          from { transform: translate3d(-4%, 0, 0) scale(1); }
          to   { transform: translate3d(4%, 3%, 0) scale(1.08); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ambient-drift {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};
