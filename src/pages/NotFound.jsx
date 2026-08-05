import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AmbientBackground } from '@/components/AmbientBackground';
import { ThemeToggle } from '@/components/ThemeToggle';

export const NotFound = () => {
  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <AmbientBackground />

      <div className="container flex h-16 shrink-0 items-center justify-between" style={{ zIndex: 'var(--z-raised)', position: 'relative' }}>
        <Link to="/" className="font-mono text-sm font-semibold">
          VRJ<span className="text-primary">.</span>
        </Link>
        <ThemeToggle />
      </div>

      <main
        className="container relative flex flex-1 items-center py-20"
        style={{ zIndex: 'var(--z-raised)' }}
      >
        <div className="max-w-xl">
          <p className="label-mono">error 404</p>

          <h1 className="display mt-3">Page not found</h1>

          <p className="prose-body mt-5">
            That URL doesn't match anything here. It may have moved, or the link
            may have been mistyped.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/" className="btn btn-primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
            <Link to="/#projects" className="btn btn-secondary">
              See the work
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
