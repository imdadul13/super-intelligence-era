import { useEffect, useRef } from 'react';

type Mode = 'initializing' | 'connected' | 'online' | 'observation' | 'indexing' | 'active' | 'watching' | 'locked';
type NodePoint = { x: number; y: number; phase: number; speed: number; radius: number; cluster: number };

const modeSettings: Record<Mode, { strength: number; range: number; packets: number; core: number }> = {
  initializing: { strength: 0.35, range: 0.13, packets: 1, core: 0 },
  connected: { strength: 0.58, range: 0.16, packets: 2, core: 0.12 },
  online: { strength: 0.72, range: 0.18, packets: 3, core: 0.18 },
  observation: { strength: 0.24, range: 0.13, packets: 0, core: 0.12 },
  indexing: { strength: 0.62, range: 0.15, packets: 2, core: 0.16 },
  active: { strength: 0.78, range: 0.19, packets: 4, core: 0.22 },
  watching: { strength: 0.92, range: 0.22, packets: 6, core: 0.44 },
  locked: { strength: 0.52, range: 0.16, packets: 3, core: 0.36 },
};

export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<Mode>('initializing');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = motionQuery.matches;
    let visible = document.visibilityState === 'visible';
    let width = 0;
    let height = 0;
    let points: NodePoint[] = [];
    let frame = 0;
    let lastDraw = 0;

    const gaussian = () => {
      const a = Math.max(Math.random(), 0.00001);
      return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * Math.random());
    };

    const createPoints = () => {
      const count = width < 600 ? 36 : width < 1100 ? 72 : width >= 1700 ? 132 : 104;
      const clusterCount = width < 600 ? 4 : 6;
      const clusters = Array.from({ length: clusterCount }, () => ({ x: 0.1 + Math.random() * 0.8, y: 0.1 + Math.random() * 0.8 }));
      points = Array.from({ length: count }, (_, index) => {
        const cluster = index % clusterCount;
        const center = clusters[cluster];
        const sparse = index % 5 === 0;
        return {
          x: sparse ? Math.random() : Math.max(0.025, Math.min(0.975, center.x + gaussian() * 0.12)),
          y: sparse ? Math.random() : Math.max(0.025, Math.min(0.975, center.y + gaussian() * 0.15)),
          phase: Math.random() * Math.PI * 2,
          speed: 0.1 + Math.random() * 0.2,
          radius: 0.6 + Math.random() * 1.1,
          cluster,
        };
      });
    };

    const draw = (time: number) => {
      if (!visible) return;
      if (!reduced) frame = requestAnimationFrame(draw);
      if (!reduced && time - lastDraw < 32) return;
      lastDraw = time;
      ctx.clearRect(0, 0, width, height);

      const settings = modeSettings[modeRef.current];
      const seconds = reduced ? 0 : time / 1000;
      const movement = reduced ? 0 : 1;
      const convergence = modeRef.current === 'locked' ? 0.2 : 0;
      const current = points.map(point => ({
        x: (point.x * (1 - convergence) + 0.75 * convergence + Math.sin(seconds * point.speed + point.phase) * 0.0035 * movement) * width,
        y: (point.y * (1 - convergence) + 0.52 * convergence + Math.cos(seconds * point.speed * 0.8 + point.phase) * 0.0045 * movement) * height,
        point,
      }));
      const edges: Array<[number, number]> = [];
      const maxDistance = Math.min(width, height) * settings.range;

      for (let i = 0; i < current.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < current.length && connections < 4; j++) {
          const dx = current[i].x - current[j].x;
          const dy = current[i].y - current[j].y;
          const distance = Math.hypot(dx, dy);
          const clustered = current[i].point.cluster === current[j].point.cluster;
          const limit = maxDistance * (clustered ? 1.15 : 0.68);
          if (distance >= limit) continue;

          ctx.strokeStyle = 'rgba(156,201,230,' + ((1 - distance / limit) * settings.strength * (clustered ? 0.10 : 0.045)) + ')';
          ctx.lineWidth = clustered ? 0.7 : 0.5;
          ctx.beginPath();
          ctx.moveTo(current[i].x, current[i].y);
          ctx.lineTo(current[j].x, current[j].y);
          ctx.stroke();
          edges.push([i, j]);
          connections++;
        }
      }

      if (!reduced && edges.length) {
        const amount = Math.min(settings.packets, edges.length);
        for (let index = 0; index < amount; index++) {
          const edge = edges[(index * 23 + Math.floor(seconds * 0.35 + index * 9)) % edges.length];
          const from = current[edge[0]];
          const to = current[edge[1]];
          const progress = (seconds * (0.045 + index * 0.004) + index * 0.193) % 1;
          ctx.fillStyle = 'rgba(190,222,235,0.66)';
          ctx.beginPath();
          ctx.arc(from.x + (to.x - from.x) * progress, from.y + (to.y - from.y) * progress, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      current.forEach(({ x, y, point }, index) => {
        const breath = reduced ? 0.32 : 0.28 + (Math.sin(seconds * 0.5 + point.phase) + 1) * 0.1;
        const color = index % 7 === 0 ? '181,218,233' : '222,232,234';
        ctx.fillStyle = 'rgba(' + color + ',' + breath * settings.strength + ')';
        ctx.beginPath();
        ctx.arc(x, y, point.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduced && settings.strength > 0.6 && current.length) {
        for (let burst = 0; burst < 3; burst++) {
          const point = current[(burst * 19 + Math.floor(seconds * 0.08)) % current.length];
          const phase = (seconds * 0.045 + burst * 0.36) % 1;
          ctx.strokeStyle = 'rgba(156,201,230,' + (0.075 * (1 - phase) * settings.strength) + ')';
          ctx.lineWidth = 0.65;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2 + phase * 9, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (settings.core > 0) {
        const centerX = width * (modeRef.current === 'watching' ? 0.72 : 0.75);
        const centerY = height * 0.52;
        const radius = Math.min(width, height) * 0.04;
        ctx.strokeStyle = 'rgba(156,201,230,' + settings.core * 0.29 + ')';
        ctx.lineWidth = 0.65;
        [radius, radius * 1.55, radius * 2.1].forEach((ring, index) => {
          ctx.beginPath();
          ctx.arc(centerX, centerY, ring, 0, Math.PI * 2);
          ctx.stroke();
          if (!reduced && index === 2) {
            const angle = seconds * 0.11;
            ctx.beginPath();
            ctx.moveTo(centerX + Math.cos(angle) * ring, centerY + Math.sin(angle) * ring);
            ctx.lineTo(centerX + Math.cos(angle) * (ring + 7), centerY + Math.sin(angle) * (ring + 7));
            ctx.stroke();
          }
        });
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(224,240,244,' + settings.core * 0.78 + ')';
        ctx.font = '500 10px "DM Mono", monospace';
        ctx.fillText('SIE', centerX, centerY + 3);
        ctx.fillStyle = 'rgba(173,199,207,' + settings.core * 0.62 + ')';
        ctx.font = '7px "DM Mono", monospace';
        ctx.fillText(modeRef.current === 'watching' ? 'SIE-01 · OBSERVATION' : modeRef.current === 'locked' ? 'SIGNAL · LOCKED' : 'NODE · SYNC', centerX, centerY + radius * 2.55);
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createPoints();
      if (reduced) draw(performance.now());
    };

    const modes = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        const value = entry.target.getAttribute('data-neural-state') as Mode | null;
        if (value && value in modeSettings) {
          modeRef.current = value;
          if (reduced) draw(performance.now());
        }
      }
    }), { rootMargin: '-38% 0px -38% 0px' });
    document.querySelectorAll('[data-neural-state]').forEach(section => modes.observe(section));

    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
      if (!visible) cancelAnimationFrame(frame);
      else if (!reduced) frame = requestAnimationFrame(draw);
      else draw(performance.now());
    };
    const onMotionChange = () => {
      reduced = motionQuery.matches;
      cancelAnimationFrame(frame);
      if (reduced) draw(performance.now());
      else if (visible) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    motionQuery.addEventListener('change', onMotionChange);
    if (!reduced && visible) frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      modes.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  return <canvas className="neural-field" ref={canvasRef} aria-hidden="true" />;
}
