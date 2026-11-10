import { memo, useEffect, useRef } from 'react';
import profileImage from '@/assets/viraj-profile2.webp';

export const PortraitStage = memo(function PortraitStage() {
  const stage = useRef(null);
  const plane = useRef(null);
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const node = stage.current;
    const move = (event) => {
      if (!media.matches) return;
      const box = node.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      plane.current.style.transform = `rotateX(${-y * 10}deg) rotateY(${x * 12}deg)`;
    };
    const reset = () => { plane.current.style.transform = ''; };
    node.addEventListener('pointermove', move);
    node.addEventListener('pointerleave', reset);
    media.addEventListener('change', reset);
    return () => {
      node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerleave', reset);
      media.removeEventListener('change', reset);
    };
  }, []);
  return (
    <div className="portrait-stage" ref={stage}>
      <div className="stage-orbit orbit-one" aria-hidden="true" />
      <div className="stage-orbit orbit-two" aria-hidden="true" />
      <span className="stage-coordinate label-mono" aria-hidden="true">ENGINEERING / INTELLIGENCE</span>
      <div className="portrait-plane" ref={plane}>
        <div className="portrait-backplate" aria-hidden="true" />
        <div className="portrait-frame">
          <div className="portrait-topline"><span>VI / PERSONAL PORTFOLIO</span><span>01</span></div>
          <img src={profileImage} alt="Viraj Induruwa" width={520} height={620} fetchPriority="high" />
          <div className="portrait-caption"><span>Viraj Induruwa</span><span>Software Engineer</span></div>
        </div>
        <div className="floating-note note-code" aria-hidden="true"><span className="text-primary">&lt;/&gt;</span><span>Built with purpose.<br /><strong>Designed to work.</strong></span></div>
        <div className="floating-note note-location"><span className="status-dot" />Based in Sri Lanka</div>
      </div>
    </div>
  );
});
