const img = (n: number) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (modules[`/src/assets/cat/IMG_${n}.jpg.asset.json`] as any).default.url as string;

const modules = import.meta.glob("/src/assets/cat/*.asset.json", { eager: true });

export const WHATSAPP = "5586999005401";
export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export const storeFront = img(7559);

export type Product = {
  id: string;
  tag: string;
  name: string;
  kicker: string;
  quote: string;
  pitch: string;
  specs: { label: string; value: string }[];
  features: string[];
  colors: string[];
  photos: string[];
  badge?: string;
};

export const products: Product[] = [
  {
    id: "triciclo",
    tag: "01",
    name: "Triciclo Elétrico",
    kicker: "O mais completo da categoria",
    badge: "Mais vendido p/ família",
    quote: "“Leva a família inteira e ainda sobra espaço pras compras.”",
    pitch:
      "Três lugares — 2 adultos + 1 criança — e até 3 compartimentos para seus volumes. Estabilidade de 3 rodas e a melhor bateria do mercado.",
    specs: [
      { label: "Autonomia", value: "60 km" },
      { label: "Carga", value: "200 kg" },
      { label: "Lugares", value: "3" },
    ],
    features: ["100% elétrico", "Marcha ré", "Alarme e trava", "3 compartimentos", "Melhor bateria do mercado"],
    colors: ["Azul", "Vermelho"],
    photos: [img(7558), img(7560)],
  },
  {
    id: "scooter-1000",
    tag: "02",
    name: "Scooter 1000W com Baú",
    kicker: "Potência e praticidade no dia a dia",
    quote: "“Capacete no baú, chave na mão e zero gasto com gasolina.”",
    pitch:
      "Motor de 1.000 W, baú externo de série e freio a disco. Banco costurado confortável e visual elegante em várias cores.",
    specs: [
      { label: "Motor", value: "1000 W" },
      { label: "Autonomia", value: "60 km" },
      { label: "Freio", value: "Disco" },
    ],
    features: ["Baú externo incluso", "Marcha ré", "Freio a disco", "Painel digital", "Várias cores"],
    colors: ["Verde-água", "Lilás", "Vermelho", "Verde sálvia", "Prata"],
    photos: [img(7565), img(7563), img(7561), img(7566), img(7562), img(7564)],
  },
  {
    id: "brilstar",
    tag: "03",
    name: "BRILSTAR Alta Performance",
    kicker: "Presença de moto grande",
    badge: "Com Bluetooth",
    quote: "“Pneus largos, som no Bluetooth e todo mundo olhando quando você passa.”",
    pitch:
      "Modelo de alta performance com pneus largos estilo custom, Bluetooth integrado e sistema de alarme. Para quem quer chamar atenção.",
    specs: [
      { label: "Autonomia", value: "60 km" },
      { label: "Carga", value: "200 kg" },
      { label: "Som", value: "Bluetooth" },
    ],
    features: ["Sistema Bluetooth", "Marcha ré", "Alarme e trava", "Freio a disco", "Encosto de garupa"],
    colors: ["Preto", "Vermelho bordô", "Prata", "Branco"],
    photos: [img(7569), img(7568), img(7567), img(7570), img(7571)],
  },
  {
    id: "zuboo-paris",
    tag: "04",
    name: "Retrô Zuboo Paris",
    kicker: "Estilo europeu, charme atemporal",
    quote: "“Elegância de Paris nas ruas do Piauí.”",
    pitch:
      "Design retrô com parabrisa alto, retrovisores cromados e bancos de couro. Baú super espaçoso para levar tudo com estilo.",
    specs: [
      { label: "Autonomia", value: "~50 km" },
      { label: "Carga", value: "200 kg" },
      { label: "Bancos", value: "Couro" },
    ],
    features: ["Bancos de couro", "Baú super espaçoso", "Parabrisa alto", "Freio a disco", "Painel digital"],
    colors: ["Laranja/creme", "Branco marfim", "Preto/branco", "Rosa"],
    photos: [img(7578), img(7572), img(7573), img(7575), img(7576), img(7577), img(7574)],
  },
  {
    id: "flash",
    tag: "05",
    name: "FLASH Esportiva",
    kicker: "Mais conforto e liberdade",
    badge: "Maior autonomia",
    quote: "“70 km de liberdade: vá mais longe sem pensar na tomada.”",
    pitch:
      "A maior autonomia da linha. Visual esportivo com dois faróis, motor de 1.000 W e banco duplo para você e sua garupa.",
    specs: [
      { label: "Motor", value: "1000 W" },
      { label: "Autonomia", value: "70 km" },
      { label: "Carga", value: "200 kg" },
    ],
    features: ["Marcha ré", "Trava e alarme", "Dois faróis", "Freio a disco", "E muito mais"],
    colors: ["Azul/lima", "Branco/ciano"],
    photos: [img(7580), img(7579), img(7582), img(7583), img(7581)],
  },
  {
    id: "compacta",
    tag: "06",
    name: "Compacta 500W",
    kicker: "Ideal para rotas curtas do dia a dia",
    badge: "Melhor custo-benefício",
    quote: "“Leve, charmosa e econômica: perfeita pra ir ao trabalho, à escola e ao mercado.”",
    pitch:
      "Leve e fácil de pilotar, com cestinha frontal e garupa com encosto. A escolha certa para quem roda pouco e quer economizar muito.",
    specs: [
      { label: "Motor", value: "500 W" },
      { label: "Carga", value: "120 kg" },
      { label: "Peso", value: "Leve" },
    ],
    features: ["Cesta frontal", "Garupa com encosto", "Suspensão dupla", "Fácil de pilotar"],
    colors: ["Verde menta", "Lilás", "Rosa"],
    photos: [img(7584), img(7586), img(7585)],
  },
];
