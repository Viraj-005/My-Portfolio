import { useEffect, useRef, useCallback } from "react";

/**
 * NeuralNetworkBackground
 * ─────────────────────────────────────────────────────────────────
 * A canvas-based animated neural network background featuring:
 *   • Glowing pulsing nodes with colour variation
 *   • Animated beam connections between nearby nodes
 *   • Travelling "data-pulse" particles along connections
 *   • Soft aurora blobs drifting in the background
 *   • Subtle floating geometric hex particles
 *
 * Usage:
 *   import { NeuralNetworkBackground } from './NeuralNetworkBackground';
 *   <NeuralNetworkBackground />
 */

const COLORS = {
  nodeGlow: [
    "rgba(139, 92, 246,",   // violet (primary)
    "rgba(59, 130, 246,",   // blue
    "rgba(6, 182, 212,",    // cyan
    "rgba(16, 185, 129,",   // emerald
    "rgba(236, 72, 153,",   // pink
  ],
  connection: "rgba(139, 92, 246,",
  pulse: [
    "rgba(200, 180, 255,",
    "rgba(130, 200, 255,",
    "rgba(100, 240, 220,",
  ],
};

const MAX_LINK_DIST = 180; // px
const NODE_COUNT_BASE = 55;
const PULSE_SPAWN_INTERVAL = 40; // frames

function resize(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function initNodes(w, h) {
  const count = Math.floor((w * h) / 18000) + NODE_COUNT_BASE;
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: Math.random() * w,
    y: Math.random() * h,
    vx: randomBetween(-0.25, 0.25),
    vy: randomBetween(-0.25, 0.25),
    radius: randomBetween(2, 5),
    baseRadius: randomBetween(2, 5),
    pulsePhase: Math.random() * Math.PI * 2,
    pulseSpeed: randomBetween(0.02, 0.05),
    colorIdx: Math.floor(Math.random() * COLORS.nodeGlow.length),
    opacity: randomBetween(0.6, 1),
  }));
}

function initAuroraBlobs(w, h) {
  const blobColors = [
    { r: 139, g: 92, b: 246 },   // violet
    { r: 59, g: 130, b: 246 },   // blue
    { r: 6, g: 182, b: 212 },    // cyan
    { r: 16, g: 185, b: 129 },   // emerald
    { r: 236, g: 72, b: 153 },   // pink
  ];

  return Array.from({ length: 5 }, (_, i) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: randomBetween(-0.15, 0.15),
    vy: randomBetween(-0.1, 0.1),
    radius: randomBetween(200, 380),
    color: blobColors[i % blobColors.length],
    opacity: randomBetween(0.04, 0.09),
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: randomBetween(0.005, 0.012),
  }));
}

function initHexParticles(w, h) {
  return Array.from({ length: 18 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: randomBetween(-0.15, 0.15),
    vy: randomBetween(-0.15, 0.15),
    size: randomBetween(8, 22),
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: randomBetween(-0.005, 0.005),
    opacity: randomBetween(0.04, 0.12),
    colorIdx: Math.floor(Math.random() * COLORS.nodeGlow.length),
  }));
}

function drawHex(ctx, x, y, size, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const px = size * Math.cos(angle);
    const py = size * Math.sin(angle);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.restore();
}

export const NeuralNetworkBackground = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    nodes: [],
    auroraBlobs: [],
    hexParticles: [],
    pulses: [],       // { fromNode, toNode, t, speed, colorIdx }
    frameCount: 0,
    animId: null,
  });

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    resize(canvas);
    const { width: w, height: h } = canvas;
    const s = stateRef.current;
    s.nodes = initNodes(w, h);
    s.auroraBlobs = initAuroraBlobs(w, h);
    s.hexParticles = initHexParticles(w, h);
    s.pulses = [];
    s.frameCount = 0;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width: w, height: h } = canvas;
    const s = stateRef.current;
    s.frameCount++;

    // ── Clear ────────────────────────────────────────────────────
    ctx.clearRect(0, 0, w, h);

    // ── Aurora blobs ─────────────────────────────────────────────
    s.auroraBlobs.forEach((blob) => {
      blob.phase += blob.phaseSpeed;
      blob.x += blob.vx;
      blob.y += blob.vy;
      if (blob.x < -blob.radius) blob.x = w + blob.radius;
      if (blob.x > w + blob.radius) blob.x = -blob.radius;
      if (blob.y < -blob.radius) blob.y = h + blob.radius;
      if (blob.y > h + blob.radius) blob.y = -blob.radius;

      const pulse = Math.sin(blob.phase) * 0.25 + 1;
      const grad = ctx.createRadialGradient(
        blob.x, blob.y, 0,
        blob.x, blob.y, blob.radius * pulse
      );
      const { r, g, b } = blob.color;
      grad.addColorStop(0, `rgba(${r},${g},${b},${blob.opacity})`);
      grad.addColorStop(0.5, `rgba(${r},${g},${b},${blob.opacity * 0.4})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, blob.radius * pulse, 0, Math.PI * 2);
      ctx.fill();
    });

    // ── Hex particles ─────────────────────────────────────────────
    s.hexParticles.forEach((hex) => {
      hex.x += hex.vx;
      hex.y += hex.vy;
      hex.rotation += hex.rotSpeed;
      if (hex.x < -30) hex.x = w + 30;
      if (hex.x > w + 30) hex.x = -30;
      if (hex.y < -30) hex.y = h + 30;
      if (hex.y > h + 30) hex.y = -30;

      const colorBase = COLORS.nodeGlow[hex.colorIdx];
      ctx.strokeStyle = `${colorBase}${hex.opacity})`;
      ctx.lineWidth = 1;
      drawHex(ctx, hex.x, hex.y, hex.size, hex.rotation);
      ctx.stroke();
    });

    // ── Move nodes ───────────────────────────────────────────────
    s.nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > w) node.vx *= -1;
      if (node.y < 0 || node.y > h) node.vy *= -1;
      node.pulsePhase += node.pulseSpeed;
    });

    // ── Build adjacency & draw connections ───────────────────────
    const links = []; // { a, b, dist }
    for (let i = 0; i < s.nodes.length; i++) {
      const a = s.nodes[i];
      for (let j = i + 1; j < s.nodes.length; j++) {
        const b = s.nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_LINK_DIST) {
          links.push({ a, b, dist });
          const alpha = (1 - dist / MAX_LINK_DIST) * 0.18;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `${COLORS.nodeGlow[a.colorIdx]}${alpha})`);
          grad.addColorStop(1, `${COLORS.nodeGlow[b.colorIdx]}${alpha})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // ── Spawn new data pulses ─────────────────────────────────────
    if (s.frameCount % PULSE_SPAWN_INTERVAL === 0 && links.length > 0) {
      const link = links[Math.floor(Math.random() * links.length)];
      s.pulses.push({
        a: link.a,
        b: link.b,
        t: 0,
        speed: randomBetween(0.008, 0.022),
        colorIdx: Math.floor(Math.random() * COLORS.pulse.length),
        size: randomBetween(2.5, 5),
      });
    }

    // ── Draw & advance data pulses ────────────────────────────────
    s.pulses = s.pulses.filter((pulse) => {
      pulse.t += pulse.speed;
      if (pulse.t > 1) return false;

      const px = pulse.a.x + (pulse.b.x - pulse.a.x) * pulse.t;
      const py = pulse.a.y + (pulse.b.y - pulse.a.y) * pulse.t;

      // Glow halo
      const glow = ctx.createRadialGradient(px, py, 0, px, py, pulse.size * 4);
      glow.addColorStop(0, `${COLORS.pulse[pulse.colorIdx]}0.9)`);
      glow.addColorStop(0.4, `${COLORS.pulse[pulse.colorIdx]}0.4)`);
      glow.addColorStop(1, `${COLORS.pulse[pulse.colorIdx]}0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(px, py, pulse.size * 4, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.fillStyle = `${COLORS.pulse[pulse.colorIdx]}1)`;
      ctx.beginPath();
      ctx.arc(px, py, pulse.size, 0, Math.PI * 2);
      ctx.fill();

      return true;
    });

    // ── Draw nodes ───────────────────────────────────────────────
    s.nodes.forEach((node) => {
      const pulse = Math.sin(node.pulsePhase);
      const r = node.baseRadius + pulse * 1.2;
      const colorBase = COLORS.nodeGlow[node.colorIdx];

      // Outer glow ring
      const outerGrad = ctx.createRadialGradient(
        node.x, node.y, r,
        node.x, node.y, r * 5
      );
      outerGrad.addColorStop(0, `${colorBase}${0.12 + pulse * 0.06})`);
      outerGrad.addColorStop(1, `${colorBase}0)`);
      ctx.fillStyle = outerGrad;
      ctx.beginPath();
      ctx.arc(node.x, node.y, r * 5, 0, Math.PI * 2);
      ctx.fill();

      // Core node
      const coreGrad = ctx.createRadialGradient(
        node.x - r * 0.3, node.y - r * 0.3, 0,
        node.x, node.y, r
      );
      coreGrad.addColorStop(0, `${colorBase}${node.opacity})`);
      coreGrad.addColorStop(1, `${colorBase}${node.opacity * 0.5})`);
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fill();
    });

    s.animId = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    init();
    draw();

    const handleResize = () => {
      resize(canvas);
      init();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (stateRef.current.animId) {
        cancelAnimationFrame(stateRef.current.animId);
      }
    };
  }, [init, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
