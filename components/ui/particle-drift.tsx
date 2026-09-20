"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type ParticleDriftProps = {
  mode?: "dark" | "light" | "auto";
  speed?: number;
  size?: number;
  gap?: number;
  length?: number;
  density?: number;
  strokeWidth?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

type NodePoint = {
  x: number;
  y: number;
  drift: number;
  char: string;
  phase: number;
};

type Beam = {
  x: number;
  y: number;
  length: number;
  velocity: number;
  alpha: number;
};

const CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*";

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export default function ParticleDrift({
  mode = "dark",
  speed = 0.72,
  size = 1,
  gap = 1,
  length = 1,
  density = 1,
  strokeWidth = 1,
  opacity = 1,
  hue = 0,
  saturation = 1,
  brightness = 1,
  className,
  style,
}: ParticleDriftProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resolvedMode =
      mode === "auto"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : mode;
    const blue = resolvedMode === "dark" ? "96, 165, 250" : "37, 99, 235";
    const neutral = resolvedMode === "dark" ? "156, 163, 175" : "36, 48, 68";
    const safeSpeed = clamp(speed, 0, 3);
    const safeDensity = clamp(density, 0.25, 2.5);
    const safeLength = clamp(length, 0.35, 2.5);
    const safeSize = clamp(size, 0.5, 2.5);
    const safeGap = clamp(gap, 0.5, 2.5);
    const safeStroke = clamp(strokeWidth, 0.25, 3);
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let nodes: NodePoint[] = [];
    let beams: Beam[] = [];
    const pointer = { x: -1000, y: -1000 };

    const randomCharacter = () =>
      CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)] ?? "0";

    const initialize = () => {
      nodes = Array.from({ length: Math.max(24, Math.round(84 * safeDensity)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        drift: 0.08 + Math.random() * 0.3,
        char: randomCharacter(),
        phase: Math.random() * Math.PI * 2,
      }));
      beams = Array.from({ length: Math.max(5, Math.round(18 * safeDensity)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * (height + 140),
        length: (54 + Math.random() * 96) * safeLength,
        velocity: 1.4 + Math.random() * 3.2,
        alpha: 0.12 + Math.random() * 0.3,
      }));
    };

    const resize = () => {
      const rectangle = canvas.getBoundingClientRect();
      width = Math.max(1, rectangle.width);
      height = Math.max(1, rectangle.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      initialize();
    };

    const render = (time = 0) => {
      context.clearRect(0, 0, width, height);

      beams.forEach((beam) => {
        if (!reducedMotion) beam.y -= beam.velocity * safeSpeed;
        if (beam.y + beam.length < -10) {
          beam.y = height + beam.length;
          beam.x = Math.random() * width;
        }
        const gradient = context.createLinearGradient(
          beam.x,
          beam.y,
          beam.x,
          beam.y + beam.length,
        );
        gradient.addColorStop(0, `rgba(${blue}, ${beam.alpha})`);
        gradient.addColorStop(1, `rgba(${blue}, 0)`);
        context.strokeStyle = gradient;
        context.lineWidth = 1.2 * safeStroke;
        context.beginPath();
        context.moveTo(beam.x, beam.y);
        context.lineTo(beam.x, beam.y + beam.length);
        context.stroke();
      });

      const linkDistance = 112 * safeGap;
      context.lineWidth = 0.45 * safeStroke;
      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const a = nodes[first];
          const b = nodes[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < linkDistance) {
            context.strokeStyle = `rgba(${neutral}, ${0.12 * (1 - distance / linkDistance)})`;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      context.font = `${Math.round(10 * safeSize)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      nodes.forEach((node, index) => {
        if (!reducedMotion) {
          node.y += node.drift * safeSpeed;
          node.x += Math.sin(time * 0.00025 + node.phase) * 0.035 * safeSpeed;
        }
        if (node.y > height + 18) {
          node.y = -18;
          node.x = Math.random() * width;
        }

        const distance = Math.hypot(pointer.x - node.x, pointer.y - node.y);
        if (distance < 170 && index % 3 === 0 && Math.random() > 0.94) {
          node.char = randomCharacter();
        }
        if (distance < 170) {
          context.strokeStyle = `rgba(${blue}, ${0.28 * (1 - distance / 170)})`;
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(pointer.x, pointer.y);
          context.stroke();
        }
        context.fillStyle =
          distance < 170 ? `rgba(${blue}, 0.78)` : `rgba(${neutral}, 0.28)`;
        context.fillText(node.char, node.x, node.y);
      });

      if (!reducedMotion && visible) frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rectangle = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rectangle.left;
      pointer.y = event.clientY - rectangle.top;
    };
    const onPointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      const nextVisible = entry.isIntersecting;
      if (nextVisible && !visible && !reducedMotion) {
        visible = true;
        frame = requestAnimationFrame(render);
      } else if (!nextVisible) {
        visible = false;
        cancelAnimationFrame(frame);
      }
    });

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    resize();
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [density, gap, length, mode, size, speed, strokeWidth]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        opacity: clamp(opacity, 0.05, 1),
        filter: `hue-rotate(${clamp(hue, -180, 180)}deg) saturate(${clamp(saturation, 0, 2)}) brightness(${clamp(brightness, 0.35, 1.65)})`,
        ...style,
      }}
    />
  );
}
