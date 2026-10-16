import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { BatteryCharging, ChevronDown, Headset, MapPin, MessageCircle, ShieldCheck, Truck, Wrench, Zap } from "lucide-react";
import { products, storeFront, waLink } from "@/lib/catalog";
import { ProductSection } from "@/components/ProductSection";
import { TouchFx } from "@/components/TouchFx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Catálogo Vinicius Importados — Motos e Scooters Elétricas" },
      { name: "description", content: "Catálogo digital Vinicius Importados: scooters, triciclos e motos elétricas com frete grátis, garantia e a melhor assistência pós-venda do Brasil." },
      { property: "og:title", content: "Catálogo Vinicius Importados — Mobilidade Elétrica" },
      { property: "og:description", content: "Frete grátis, garantia e a melhor assistência pós-venda do Brasil. Conheça nossos modelos elétricos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalog,
});

const perks = [
  { icon: Truck, title: "Frete grátis", text: "A entrega é por nossa conta." },
  { icon: ShieldCheck, title: "Garantia", text: "Compre com total segurança." },
  { icon: Headset, title: "Pós-venda", text: "A melhor assistência do Brasil." },
  { icon: Wrench, title: "Assistência técnica", text: "Suporte de verdade, perto de você." },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Zap className="h-6 w-6" fill="currentColor" />
      </span>
      <div className="leading-none">
        <div className="font-display text-xl uppercase">Vinicius</div>
        <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">Importados</div>
      </div>
    </div>
  );
}

function Cover({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
      transition={{ duration: 0.7 }}
      className="grain fixed inset-0 z-50 flex cursor-pointer flex-col overflow-hidden bg-background"
      onClick={onEnter}
    >
      <img src={storeFront} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      <div className="stripes absolute left-0 right-0 top-0 h-3" />
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Logo className="justify-center" />
        </motion.div>
        <div style={{ perspective: 800 }} className="mt-8">
          <motion.h1
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9, type: "spring" }}
            className="font-display text-6xl uppercase leading-[0.9] md:text-8xl"
          >
            Catálogo <br />
            <span className="text-gold">Elétrico</span> 2026
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {["Frete grátis", "Garantia", "Melhor pós-venda do Brasil"].map((t) => (
            <span key={t} className="rounded-full border border-primary/50 bg-background/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur">
              {t}
            </span>
          ))}
        </motion.div>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.3, type: "spring" }}
          className="btn-shine animate-floaty mt-10 rounded-full px-10 py-5 font-extrabold uppercase tracking-widest text-primary-foreground shadow-glow"
        >
          Toque para entrar
        </motion.button>
      </div>
      <div className="stripes relative h-3" />
    </motion.div>
  );
}

function Catalog() {
  const [entered, setEntered] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const heroY = useTransform(scrollYProgress, [0, 0.15], ["0%", "40%"]);
  const heroRot = useTransform(scrollYProgress, [0, 0.15], [0, 25]);

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
  }, [entered]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TouchFx />
      <AnimatePresence>{!entered && <Cover key="cover" onEnter={() => setEntered(true)} />}</AnimatePresence>

      <motion.div style={{ scaleX: progress }} className="bg-gold fixed left-0 right-0 top-0 z-40 h-1 origin-left" />

      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Logo />
          <a href={waLink("Olá! Vim pelo catálogo digital.")} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground">
            WhatsApp
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="grain relative overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={storeFront} alt="Loja Vinicius Importados" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </motion.div>
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-24 md:pt-32" style={{ perspective: 1000 }}>
          <motion.div style={{ rotateX: heroRot }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-primary-foreground">
              <BatteryCharging className="h-4 w-4" /> Mobilidade 100% elétrica
            </p>
            <h1 className="font-display mt-6 text-6xl uppercase leading-[0.9] md:text-8xl">
              Economize <span className="text-gold">gasolina.</span>
              <br /> Ganhe liberdade.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-foreground/80">
              6 modelos escolhidos a dedo para o seu dia a dia. Entregamos na sua porta com <b className="text-primary">frete grátis</b>, garantia e a <b className="text-primary">melhor assistência pós-venda do Brasil</b>.
            </p>
            <a href="#modelos" className="mt-8 inline-flex items-center gap-2 font-bold text-primary">
              Ver modelos <ChevronDown className="h-5 w-5 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y-2 border-primary bg-primary py-3 text-primary-foreground">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl uppercase">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Frete grátis", "⚡", "Garantia", "⚡", "Melhor pós-venda do Brasil", "⚡", "Marcha ré", "⚡", "Até 70 km", "⚡"].map((t, i) => <span key={`${k}-${i}`}>{t}</span>),
          )}
        </div>
      </div>

      {/* Perks */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4" style={{ perspective: 1000 }}>
          {perks.map((pk, i) => (
            <motion.div
              key={pk.title}
              initial={{ opacity: 0, rotateY: -90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="rounded-3xl border border-primary/30 bg-card p-5"
            >
              <pk.icon className="h-8 w-8 text-primary" />
              <h3 className="font-display mt-3 text-xl uppercase">{pk.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{pk.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div id="modelos">
        {products.map((p, i) => (
          <ProductSection key={p.id} p={p} index={i} />
        ))}
      </div>

      {/* Garantia destaque */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <motion.div initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring" }}>
            <ShieldCheck className="mx-auto h-16 w-16" />
            <h2 className="font-display mt-4 text-5xl uppercase leading-none md:text-7xl">A melhor assistência do Brasil</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold">
              Aqui você não compra e fica sozinho. Garantia, assistência técnica e suporte pós-venda de verdade — e o frete é por nossa conta.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <h2 className="font-display text-5xl uppercase md:text-6xl">
          Escolheu o seu? <span className="text-gold">Fale com a gente.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">Condições especiais e estoque limitado. Responda agora e garanta a sua cor preferida.</p>
        <a
          href={waLink("Olá! Vi o catálogo e quero aproveitar as condições especiais.")}
          target="_blank"
          rel="noreferrer"
          className="btn-shine mt-8 inline-flex items-center gap-2 rounded-full px-10 py-5 font-extrabold uppercase tracking-wide text-primary-foreground shadow-glow"
        >
          <MessageCircle className="h-5 w-5" /> Chamar no WhatsApp
        </a>
        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" /> Parnaíba e Piracuruca — PI • @viniciusimportados_pi
        </p>
      </section>
      <div className="stripes h-3" />

      <a
        href={waLink("Olá! Vim pelo catálogo digital.")}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="animate-floaty fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-success text-primary-foreground shadow-glow"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
