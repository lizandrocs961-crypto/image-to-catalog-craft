import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Check, MessageCircle, Quote, Truck, ShieldCheck } from "lucide-react";
import { type Product, waLink } from "@/lib/catalog";

function Tilt3D({ children }: { children: React.ReactNode }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });
  return (
    <motion.div
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 18);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 18);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function ProductSection({ p, index }: { p: Product; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [28, 0, 0, -20]);
  const rotateY = useTransform(scrollYProgress, [0, 0.35], [index % 2 ? 22 : -22, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.82, 1]);
  const bigY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const flip = index % 2 === 1;

  return (
    <section ref={ref} id={p.id} className="relative overflow-hidden py-20 md:py-28">
      <motion.span
        style={{ y: bigY }}
        className="font-display pointer-events-none absolute -top-6 select-none text-[38vw] leading-none text-primary/[0.06] md:text-[22vw]"
        aria-hidden
      >
        {p.tag}
      </motion.span>

      <div className={`relative mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2 md:gap-16 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div style={{ perspective: 1200 }}>
          <motion.div style={{ rotateX, rotateY, scale }}>
            <Tilt3D>
              <div className="relative">
                <div className="absolute -inset-3 rounded-[2rem] bg-gold opacity-80 blur-2xl" style={{ transform: "translateZ(-60px)" }} />
                <div className="relative overflow-hidden rounded-[1.75rem] border-2 border-primary bg-card shadow-glow">
                  <motion.img
                    key={active}
                    src={p.photos[active]}
                    alt={`${p.name} — Vinicius Importados`}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                  {p.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-primary-foreground" style={{ transform: "translateZ(40px)" }}>
                      {p.badge}
                    </span>
                  )}
                  <span className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-background/80 px-3 py-1 text-xs font-bold text-primary backdrop-blur">
                    <Truck className="h-3.5 w-3.5" /> Frete grátis
                  </span>
                </div>
              </div>
            </Tilt3D>
          </motion.div>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {p.photos.map((ph, i) => (
              <button
                key={ph}
                onClick={() => setActive(i)}
                className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition ${i === active ? "border-primary scale-105" : "border-border opacity-60"}`}
                aria-label={`Foto ${i + 1}`}
              >
                <img src={ph} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: flip ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Modelo {p.tag}</p>
          <h2 className="font-display mt-2 text-5xl uppercase leading-[0.95] md:text-6xl">{p.name}</h2>
          <p className="mt-2 text-lg font-semibold text-muted-foreground">{p.kicker}</p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {p.specs.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20, rotateX: -60 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i + 0.2 }}
                className="rounded-2xl border border-primary/30 bg-card p-3 text-center"
              >
                <div className="font-display text-2xl text-primary md:text-3xl">{s.value}</div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <p className="mt-6 text-base leading-relaxed text-foreground/85">{p.pitch}</p>

          <ul className="mt-5 grid grid-cols-2 gap-2">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm font-medium">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" strokeWidth={4} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-sm text-muted-foreground">
            <span className="font-bold text-foreground">Cores:</span> {p.colors.join(" • ")}
          </p>

          <blockquote className="relative mt-6 rounded-2xl border-l-4 border-primary bg-secondary p-4 pl-10 text-base font-semibold italic">
            <Quote className="absolute left-3 top-4 h-5 w-5 text-primary" />
            {p.quote}
          </blockquote>

          <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" /> Garantia + assistência pós-venda • Frete por nossa conta
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            href={waLink(`Olá! Vi o catálogo e quero saber mais sobre o modelo ${p.name}.`)}
            target="_blank"
            rel="noreferrer"
            className="btn-shine mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-extrabold uppercase tracking-wide text-primary-foreground shadow-glow"
          >
            <MessageCircle className="h-5 w-5" /> Quero esse! Falar no WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
