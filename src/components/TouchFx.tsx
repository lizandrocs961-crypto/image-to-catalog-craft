import { useEffect, useRef } from "react";

/** Mostra o "toque" na tela: ondas no clique/toque e rastro amarelo ao rolar. */
export function TouchFx() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layer.current;
    if (!el) return;
    let last = { x: window.innerWidth / 2, y: window.innerHeight * 0.6 };
    let lastSpawn = 0;

    const spawn = (x: number, y: number, size: number, dur: number) => {
      const d = document.createElement("span");
      d.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;border-radius:9999px;border:2px solid var(--primary);background:color-mix(in oklab,var(--primary) 18%,transparent);animation:ripple ${dur}ms ease-out forwards;pointer-events:none`;
      el.appendChild(d);
      setTimeout(() => d.remove(), dur);
    };
    const dot = (x: number, y: number) => {
      const d = document.createElement("span");
      const s = 8 + Math.random() * 10;
      d.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${s}px;height:${s}px;border-radius:9999px;background:var(--primary);box-shadow:0 0 18px var(--primary);transform:translate(-50%,-50%);transition:all 700ms ease-out;pointer-events:none`;
      el.appendChild(d);
      requestAnimationFrame(() => {
        d.style.opacity = "0";
        d.style.transform = `translate(${-50 + (Math.random() - 0.5) * 300}%, ${-50 + (Math.random() - 0.5) * 300}%) scale(0.2)`;
      });
      setTimeout(() => d.remove(), 720);
    };

    const down = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY };
      spawn(e.clientX, e.clientY, 120, 650);
      spawn(e.clientX, e.clientY, 60, 450);
    };
    const move = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY };
      const now = performance.now();
      if (e.pointerType === "touch" && now - lastSpawn > 40) {
        lastSpawn = now;
        dot(e.clientX, e.clientY);
      }
    };
    const scroll = () => {
      const now = performance.now();
      if (now - lastSpawn > 70) {
        lastSpawn = now;
        dot(last.x, last.y);
      }
    };
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return <div ref={layer} aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" />;
}
