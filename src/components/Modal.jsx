import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Accessible dialog used by both Projects and Certificates.
 *
 * Handles what the previous hand-rolled overlays did not: role/aria wiring,
 * Escape to close, a real focus trap, focus restoration to the trigger, and
 * body scroll locking. Rendered through a portal so it can never be clipped by
 * an ancestor's overflow or stacking context.
 */
export const Modal = ({ open, onClose, labelledBy, children, className = '' }) => {
  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!focusable || focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the panel itself rather than the first control, so screen readers
    // announce the dialog before its actions.
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
      style={{ zIndex: 'var(--z-modal)' }}
      onKeyDown={handleKeyDown}
    >
      <div
        className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`modal-panel relative flex max-h-[88vh] w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl outline-none ${className}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface/90 text-muted backdrop-blur transition-colors duration-[--duration-fast] hover:bg-surface-2 hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {children}
      </div>

      <style>{`
        .modal-backdrop {
          animation: modal-fade var(--duration-base) var(--ease-out-quart);
        }
        .modal-panel {
          animation: modal-rise var(--duration-slow) var(--ease-out-expo);
        }
        @keyframes modal-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modal-rise {
          from { opacity: 0; transform: translateY(12px) scale(0.985); }
          to   { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .modal-backdrop, .modal-panel { animation: none; }
        }
      `}</style>
    </div>,
    document.body
  );
};
