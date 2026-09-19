import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, Instagram, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/802503629_17966573148153104_5516428622665713317_n_1.jpg.asset.json";
import classicImage from "@/assets/475942782_17894026002153104_267748791669483891_n_1.jpg.asset.json";
import rootsLogo from "@/assets/482685051_623795050626260_3210924371191532665_n_-_Copia.jpg.asset.json";

import tableImage from "@/assets/566030978_17923373562153104_2081072187815283587_n_1.jpg.asset.json";
import platterImage from "@/assets/619242422_17933049402153104_3548552737511147774_n.jpg.asset.json";
import assemblyImage from "@/assets/788764544_17964568809153104_5616361839745189710_n.jpg.asset.json";
import blackBunImage from "@/assets/burger-pao-preto.jpg.asset.json";
import fondueVideo from "@/assets/video-fondue.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RAÍZES URUPEMA | Gastronomia da Serra" },
      { name: "description", content: "Hambúrgueres autorais, fondue e hospitalidade com identidade da Serra Catarinense, em Urupema." },
      { property: "og:title", content: "RAÍZES URUPEMA | Gastronomia da Serra" },
      { property: "og:description", content: "Uma experiência gastronômica feita de origem, fogo e afeto em Urupema." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const gallery = [
  { src: classicImage.url, alt: "Hambúrguer artesanal com queijo e batatas" },
  { src: tableImage.url, alt: "Hambúrgueres servidos em panela sobre crochês coloridos" },
  { src: platterImage.url, alt: "Hambúrguer com onion rings, bacon e batatas" },
  { src: assemblyImage.url, alt: "Montagem em camadas de hambúrguer com bacon e queijo" },
  { src: heroImage.url, alt: "Hambúrguer Raízes com batatas douradas" },
  { src: blackBunImage.url, alt: "Hambúrguer no pão preto com gergelim, molho roxo, queijo derretido e batatas" },
];

const nav = [
  ["História", "#restaurante"],
  ["Sabores", "#gastronomia"],
  ["Galeria", "#galeria"],
  ["Contato", "#contato"],
];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const activeImage = lightbox === null ? undefined : gallery[lightbox];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((lightbox + 1) % gallery.length);
      if (event.key === "ArrowLeft") setLightbox((lightbox - 1 + gallery.length) % gallery.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <main className="overflow-clip bg-background text-foreground">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || menuOpen ? "bg-deep/96 py-3 shadow-editorial backdrop-blur" : "bg-transparent py-5"}`}>
        <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:grid-cols-[auto_1fr_auto] md:px-10 lg:px-16">
          <a href="#inicio" className="flex min-w-0 items-center gap-3 text-warm-white" aria-label="RAÍZES URUPEMA — início">
            <img src={rootsLogo.url} alt="Símbolo oficial RAÍZES" className="size-11 shrink-0 rounded-full object-cover ring-1 ring-warm-white/30" />
            <span className="font-display text-lg font-semibold tracking-[0.14em]">RAÍZES <small className="block font-sans text-[0.5rem] font-medium tracking-[0.28em]">URUPEMA</small></span>
          </a>
          <nav className="hidden justify-center gap-8 md:flex" aria-label="Navegação principal">
            {nav.map(([label, href]) => <a key={href} href={href} className="nav-link text-warm-white/78">{label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="hidden border border-gold/50 bg-gold text-deep hover:bg-warm-white sm:inline-flex"><a href="#contato">Pedir / Reservar</a></Button>
            <Button variant="ghost" size="icon" className="text-warm-white md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && <nav className="flex animate-fade-in flex-col border-t border-warm-white/15 bg-deep px-5 py-7 md:hidden">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-warm-white/10 py-4 font-display text-2xl text-warm-white">{label}</a>)}<Button asChild className="mt-6 bg-gold text-deep"><a href="#contato" onClick={() => setMenuOpen(false)}>Pedir / Reservar</a></Button></nav>}
      </header>

      <section id="inicio" className="relative min-h-[94svh] overflow-hidden bg-deep">
        <img src={heroImage.url} alt="Hambúrguer artesanal RAÍZES em primeiro plano" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex min-h-[94svh] max-w-[1600px] flex-col justify-end px-5 pb-10 pt-36 md:px-10 md:pb-14 lg:px-16">
          <p className="eyebrow text-warm-white/75">Urupema · Serra Catarinense</p>
          <h1 className="mt-5 max-w-6xl font-display text-[clamp(4rem,12vw,10.5rem)] font-medium leading-[0.76] text-warm-white">RAÍZES<br /><span className="ml-[8vw] italic text-gold">URUPEMA</span></h1>
          <div className="mt-10 grid items-end gap-8 border-t border-warm-white/25 pt-5 md:grid-cols-[1fr_auto]">
            <p className="max-w-md font-display text-2xl leading-tight text-warm-white md:text-3xl">Gastronomia com identidade da Serra.</p>
            <a href="#restaurante" className="flex items-center gap-3 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-warm-white">Scroll <ArrowDown className="size-4 animate-bounce" /></a>
          </div>
        </div>
      </section>

      <section id="restaurante" className="section-shell bg-cream">
        <SectionHead number="01" label="O restaurante" />
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5 lg:pb-16"><p className="eyebrow text-moss">Origem, fogo e afeto</p><h2 className="title-display mt-5">Uma experiência<br /><em>com raízes.</em></h2><p className="body-copy mt-8 max-w-lg">Em Urupema, cada encontro à mesa carrega o ritmo da serra. Ingredientes honestos, preparo cuidadoso e uma hospitalidade que aquece — para comer sem pressa e guardar na memória.</p></div>
          <figure className="relative lg:col-span-7"><img src={classicImage.url} alt="Hambúrguer duplo RAÍZES com cheddar e batatas" className="aspect-[4/3] w-full object-cover" /><figcaption className="mt-3 flex justify-between border-t border-wood/25 pt-3 text-[0.62rem] uppercase tracking-[0.2em] text-wood/65"><span>RAÍZES Gastrôbar</span><span>Urupema, SC</span></figcaption></figure>
        </div>
      </section>

      <section className="relative flex min-h-[78svh] items-center overflow-hidden bg-deep px-5 py-24 text-warm-white md:px-10 lg:px-16">
        <div className="absolute -right-20 top-1/2 size-[36rem] -translate-y-1/2 rounded-full border border-gold/15" />
        <div className="relative mx-auto w-full max-w-[1600px]"><SectionHead number="02" label="Manifesto" dark /><p className="mt-20 max-w-[1280px] font-display text-[clamp(3.2rem,8.4vw,9rem)] font-medium leading-[0.88]">Não é apenas<br />um hambúrguer.<br /><em className="text-gold">É uma experiência.</em></p></div>
      </section>

      <section id="gastronomia" className="section-shell bg-background">
        <SectionHead number="03" label="Gastronomia" />
        <div className="mt-14 grid gap-8 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7"><img src={tableImage.url} alt="Hambúrgueres autorais servidos em panela" className="aspect-[5/6] w-full object-cover" /></div>
          <div className="md:col-span-5 md:pt-20"><h2 className="title-display">Da cozinha<br /><em>para a mesa.</em></h2><p className="body-copy mt-7 max-w-sm">Camadas de sabor, contrastes de textura e receitas que respeitam o produto. Uma cozinha direta, generosa e cheia de personalidade.</p><img src={platterImage.url} alt="Hambúrguer artesanal acompanhado de batatas e molhos" className="mt-16 aspect-[4/5] w-full object-cover" /></div>
        </div>
      </section>

      <section className="bg-moss py-20 text-warm-white md:py-28">
        <div className="section-inner"><SectionHead number="04" label="Hambúrgueres" dark /><div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-7"><p className="eyebrow text-gold">Assinatura da casa</p><h2 className="title-display mt-5">Os sabores<br /><em>do RAÍZES.</em></h2></div><p className="max-w-md text-base leading-8 text-warm-white/68 lg:col-span-5 lg:pb-3">Do pão ao molho, cada camada tem propósito. Clássicos intensos e criações que fazem da primeira mordida o começo de uma história.</p></div></div>
      </section>

      <section className="section-shell bg-cream">
        <SectionHead number="05" label="Bebidas & acompanhamentos" />
        <div className="mt-14 grid gap-12 md:grid-cols-2 md:items-center"><div className="relative aspect-[4/5] overflow-hidden bg-wood"><video src={fondueVideo.url} autoPlay muted loop playsInline className="h-full w-full object-cover" /><div className="absolute bottom-0 left-0 right-0 bg-video-caption p-5 text-warm-white"><p className="eyebrow">Fondue · Noites frias</p></div></div><div className="md:pl-[8vw]"><p className="eyebrow text-moss">À mesa, tudo conversa</p><h2 className="title-display mt-5">Para<br /><em>acompanhar.</em></h2><div className="mt-10 space-y-5 border-y border-wood/25 py-6 font-display text-2xl"><p className="flex justify-between"><span>Batatas douradas</span><span>01</span></p><p className="flex justify-between"><span>Molhos da casa</span><span>02</span></p><p className="flex justify-between"><span>Fondue na serra</span><span>03</span></p><p className="flex justify-between"><span>Bebidas selecionadas</span><span>04</span></p></div></div></div>
      </section>

      <section className="section-shell bg-wood text-warm-white">
        <SectionHead number="06" label="Ambiente" dark />
        <div className="mt-16 grid gap-10 lg:grid-cols-12"><div className="lg:col-span-7"><img src={assemblyImage.url} alt="Montagem em camadas do hambúrguer RAÍZES sobre fundo escuro, no ambiente acolhedor do restaurante" className="aspect-[3/4] w-full object-cover" /></div><div className="flex flex-col justify-between lg:col-span-5 lg:py-14"><h2 className="title-display">Entre madeira,<br />sabores e<br /><em className="text-gold">aconchego.</em></h2><p className="mt-10 max-w-sm text-base leading-8 text-warm-white/70">Uma casa que recebe como a serra: com calor, presença e histórias compartilhadas ao redor da mesa.</p></div></div>
      </section>

      <section id="galeria" className="section-shell bg-background">
        <SectionHead number="07" label="Galeria" />
        <div className="mt-14 flex items-end justify-between gap-6"><h2 className="title-display">Momentos<br /><em>RAÍZES.</em></h2><p className="hidden max-w-xs text-right text-sm leading-6 text-muted-foreground md:block">Clique para explorar sabores, encontros e detalhes da nossa cozinha.</p></div>
        <div className="gallery-grid mt-14">{gallery.map((image, index) => <button key={image.src} onClick={() => setLightbox(index)} className="gallery-item group relative overflow-hidden bg-warm-white text-left" aria-label={`Ampliar imagem ${index + 1}`}><img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-contain" /><span className="absolute inset-0 bg-gallery-hover opacity-0 transition-opacity duration-500 group-hover:opacity-100" /><span className="absolute bottom-4 left-4 font-sans text-[0.6rem] uppercase tracking-[0.22em] text-warm-white opacity-0 transition-opacity group-hover:opacity-100">Ver imagem · 0{index + 1}</span></button>)}</div>
      </section>

      <section className="relative overflow-hidden bg-deep py-24 text-warm-white md:py-36">
        <div className="absolute inset-0 opacity-10 wood-grain" />
        <div className="section-inner relative"><SectionHead number="08" label="Urupema" dark /><div className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.65fr]"><h2 className="font-display text-[clamp(4rem,9vw,9rem)] leading-[0.83]">Raízes em<br /><em className="text-gold">Urupema.</em></h2><div className="lg:pt-28"><p className="text-xl leading-9 text-warm-white/75">No frio mais intenso do Brasil, encontramos calor à mesa. A paisagem, o tempo e a gente da serra dão sabor ao que fazemos.</p><div className="mt-12 h-px w-full bg-gold/50" /><p className="eyebrow mt-5 text-gold">28° 00' S · 49° 35' W</p></div></div></div>
      </section>

      <section id="contato" className="section-shell bg-cream">
        <SectionHead number="09" label="Localização & contato" />
        <div className="mt-14 grid gap-14 lg:grid-cols-2"><div><p className="eyebrow text-moss">Venha para a serra</p><h2 className="title-display mt-5">Urupema<br /><em>Santa Catarina.</em></h2><p className="body-copy mt-8 max-w-md">Reserve um tempo para viver a experiência RAÍZES. Para pedidos, horários e localização exata, fale diretamente com a casa.</p><Button asChild className="mt-9 bg-moss text-warm-white hover:bg-deep"><a href="https://wa.me/" target="_blank" rel="noreferrer">Falar no WhatsApp <ArrowRight className="size-4" /></a></Button></div><dl className="divide-y divide-wood/25 border-y border-wood/25"><ContactRow label="Horário" value="Consulte o atendimento" /><ContactRow label="WhatsApp" value="Número a confirmar" /><ContactRow label="Instagram" value="@raizesurupema" /><ContactRow label="Endereço" value="Urupema — Santa Catarina" /></dl></div>
      </section>

      <section className="bg-gold px-5 py-20 text-deep md:px-10 md:py-28 lg:px-16"><div className="mx-auto grid max-w-[1600px] gap-8 md:grid-cols-[1fr_auto] md:items-end"><h2 className="font-display text-[clamp(3.2rem,8vw,8rem)] leading-[0.84]">Sua mesa<br /><em>espera.</em></h2><Button asChild variant="outline" className="h-14 border-deep px-8"><a href="https://wa.me/" target="_blank" rel="noreferrer">Pedir / Reservar <ArrowRight className="size-4" /></a></Button></div></section>

      <footer className="bg-black-warm px-5 py-12 text-warm-white md:px-10 lg:px-16"><div className="mx-auto grid max-w-[1600px] gap-10 border-b border-warm-white/15 pb-10 md:grid-cols-[1fr_auto_auto] md:items-end"><div><img src={rootsLogo.url} alt="Logo RAÍZES URUPEMA" className="size-16 rounded-full object-cover" /><p className="mt-4 font-display text-2xl">RAÍZES URUPEMA</p></div><a href="https://instagram.com/raizesurupema" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-warm-white/70"><Instagram className="size-4" /> Instagram</a><a href="#inicio" className="flex items-center gap-2 text-sm text-warm-white/70">Voltar ao topo <ArrowDown className="size-4 rotate-180" /></a></div><div className="mx-auto mt-6 flex max-w-[1600px] flex-wrap justify-between gap-3 text-[0.58rem] uppercase tracking-[0.18em] text-warm-white/45"><span>© 2026 RAÍZES URUPEMA</span><span>Gastronomia com identidade da Serra</span></div></footer>

      {lightbox !== null && activeImage && <div className="fixed inset-0 z-[100] grid place-items-center bg-black-warm/96 p-4" role="dialog" aria-modal="true" aria-label="Galeria ampliada"><Button variant="ghost" size="icon" onClick={() => setLightbox(null)} className="absolute right-4 top-4 z-10 text-warm-white" aria-label="Fechar galeria"><X /></Button><Button variant="ghost" size="icon" onClick={() => setLightbox((lightbox - 1 + gallery.length) % gallery.length)} className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-warm-white md:left-8" aria-label="Imagem anterior"><ArrowLeft /></Button><img src={activeImage.src} alt={activeImage.alt} className="max-h-[86vh] max-w-[88vw] object-contain" /><Button variant="ghost" size="icon" onClick={() => setLightbox((lightbox + 1) % gallery.length)} className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-warm-white md:right-8" aria-label="Próxima imagem"><ArrowRight /></Button><p className="absolute bottom-5 text-[0.65rem] uppercase tracking-[0.2em] text-warm-white/60">{String(lightbox + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</p></div>}
    </main>
  );
}

function SectionHead({ number, label, dark = false }: { number: string; label: string; dark?: boolean }) {
  return <div className={`flex items-center gap-5 border-b pb-4 ${dark ? "border-warm-white/20" : "border-wood/25"}`}><span className={`font-display text-lg ${dark ? "text-gold" : "text-moss"}`}>{number}</span><span className={`font-sans text-[0.62rem] font-semibold uppercase tracking-[0.24em] ${dark ? "text-warm-white/58" : "text-wood/60"}`}>{label}</span></div>;
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return <div className="grid grid-cols-[7rem_1fr] gap-4 py-7"><dt className="eyebrow text-moss">{label}</dt><dd className="font-display text-xl text-wood md:text-2xl">{value}</dd></div>;
}