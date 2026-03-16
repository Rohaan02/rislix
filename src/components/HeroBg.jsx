// Animated cybersecurity background - SVG canvas with moving elements
import { useEffect, useRef } from "react";

export default function HeroBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let w, h;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Nodes (circuit junctions) ──
    const NODE_COUNT = 55;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * 1920,
      y: Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
      color: Math.random() > 0.5 ? "#16a34a" : "#1e3a8a",
      bright: Math.random() > 0.75,
    }));

    // ── Packets travelling along edges ──
    const packets = Array.from({ length: 18 }, () => ({
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      nodeA: Math.floor(Math.random() * NODE_COUNT),
      nodeB: Math.floor(Math.random() * NODE_COUNT),
      color: Math.random() > 0.5 ? "#4ade80" : "#60a5fa",
      size: 2 + Math.random() * 2,
    }));

    // ── Scan line ──
    let scanY = 0;
    const SCAN_SPEED = 0.4;

    // ── Binary rain columns ──
    const COLS = 28;
    const cols = Array.from({ length: COLS }, (_, i) => ({
      x: (i / COLS) * 1920 + Math.random() * 30,
      y: Math.random() * 900,
      speed: 0.6 + Math.random() * 1.2,
      chars: Array.from({ length: 8 }, () => (Math.random() > 0.5 ? "1" : "0")),
      opacity: 0.04 + Math.random() * 0.06,
      green: Math.random() > 0.5,
    }));

    // ── Shield silhouette (faint center decoration) ──
    // drawn once as reference; redrawn each frame with low alpha

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Scale coords from 1920×900 design space to actual canvas
      const sx = w / 1920;
      const sy = h / 900;

      // ── 1. Binary rain ──
      cols.forEach((col) => {
        col.y += col.speed;
        if (col.y > 900) col.y = -80;
        col.chars.forEach((c, i) => {
          if (frame % 20 === 0) col.chars[i] = Math.random() > 0.5 ? "1" : "0";
          ctx.font = `${10 * Math.min(sx, sy)}px monospace`;
          ctx.fillStyle = col.green
            ? `rgba(74,222,128,${col.opacity * (1 - i / 8)})`
            : `rgba(96,165,250,${col.opacity * (1 - i / 8)})`;
          ctx.fillText(c, col.x * sx, (col.y + i * 14) * sy);
        });
      });

      // ── 2. Move nodes ──
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > 1920) n.vx *= -1;
        if (n.y < 0 || n.y > 900) n.vy *= -1;
      });

      // ── 3. Draw edges between close nodes ──
      const MAX_DIST = 220;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(a.x * sx, a.y * sy);
            ctx.lineTo(b.x * sx, b.y * sy);
            ctx.strokeStyle =
              a.color === "#16a34a"
                ? `rgba(22,163,74,${alpha})`
                : `rgba(30,58,138,${alpha * 1.5})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // ── 4. Draw nodes ──
      nodes.forEach((n) => {
        const glow = Math.sin(n.pulse) * 0.5 + 0.5;
        const r = n.r + (n.bright ? glow * 2 : 0);
        const alpha = n.bright ? 0.5 + glow * 0.5 : 0.25 + glow * 0.15;

        // outer glow
        if (n.bright) {
          const grad = ctx.createRadialGradient(
            n.x * sx,
            n.y * sy,
            0,
            n.x * sx,
            n.y * sy,
            r * 6
          );
          grad.addColorStop(
            0,
            n.color === "#16a34a"
              ? `rgba(74,222,128,${alpha * 0.4})`
              : `rgba(96,165,250,${alpha * 0.4})`
          );
          grad.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(n.x * sx, n.y * sy, r * 6, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // core
        ctx.beginPath();
        ctx.arc(n.x * sx, n.y * sy, r * sx, 0, Math.PI * 2);
        ctx.fillStyle =
          n.color === "#16a34a"
            ? `rgba(74,222,128,${alpha})`
            : `rgba(96,165,250,${alpha})`;
        ctx.fill();
      });

      // ── 5. Draw travelling packets ──
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.nodeA = Math.floor(Math.random() * NODE_COUNT);
          p.nodeB = Math.floor(Math.random() * NODE_COUNT);
        }
        const a = nodes[p.nodeA],
          b = nodes[p.nodeB];
        const px = (a.x + (b.x - a.x) * p.progress) * sx;
        const py = (a.y + (b.y - a.y) * p.progress) * sy;

        // trail
        const trailLen = 0.08;
        const tp = Math.max(0, p.progress - trailLen);
        const tx = (a.x + (b.x - a.x) * tp) * sx;
        const ty = (a.y + (b.y - a.y) * tp) * sy;
        const grad = ctx.createLinearGradient(tx, ty, px, py);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(
          1,
          p.color === "#4ade80"
            ? "rgba(74,222,128,0.7)"
            : "rgba(96,165,250,0.7)"
        );
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.strokeStyle = grad;
        ctx.lineWidth = p.size * 0.6;
        ctx.stroke();

        // dot
        ctx.beginPath();
        ctx.arc(px, py, p.size * 0.7, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color === "#4ade80"
            ? "rgba(74,222,128,0.9)"
            : "rgba(96,165,250,0.9)";
        ctx.fill();
      });

      // ── 6. Horizontal scan line ──
      scanY = (scanY + SCAN_SPEED) % h;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, "transparent");
      scanGrad.addColorStop(0.5, "rgba(22,163,74,0.06)");
      scanGrad.addColorStop(1, "transparent");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, w, 120);

      // thin bright line
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(w, scanY);
      ctx.strokeStyle = "rgba(74,222,128,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // ── 7. Corner HUD brackets ──
      const bSize = Math.min(w, h) * 0.06;
      const bAlpha = 0.18;
      // const corners = [
      //   [bSize, bSize, 1, 1],
      //   [w - bSize, bSize, -1, 1],
      //   [bSize, h - bSize, 1, -1],
      //   [w - bSize, h - bSize, -1, -1],
      // ];
      // corners.forEach(([cx, cy, dx, dy]) => {
      //   ctx.beginPath();
      //   ctx.moveTo(cx + dx * bSize, cy);
      //   ctx.lineTo(cx, cy);
      //   ctx.lineTo(cx, cy + dy * bSize);
      //   ctx.strokeStyle = `rgba(74,222,128,${bAlpha})`;
      //   ctx.lineWidth = 1.5;
      //   ctx.stroke();
      // });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 1 }}
    />
  );
}
