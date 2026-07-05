"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { whatsappHref } from "@/lib/contact";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function IconHardHat() {
  return (
    <path d="M2 12.5h10M2.5 9.5C3 6 5.5 4 7 4c1.5 0 4 2 4.5 5.5M7 4V2.5" />
  );
}
function IconHouse() {
  return <path d="M2 7.5 7 3l5 4.5M3.5 6.5V12h7V6.5" />;
}
function IconSnowflake() {
  return (
    <path d="M7 1.5v11M2 4.25l10 6.5M12 4.25l-10 6.5M4.5 2l2.5 1.5L9.5 2M4.5 12l2.5-1.5L9.5 12" />
  );
}
function IconLeaf() {
  return <path d="M2.5 11.5C2 7 5 2.5 11.5 2.5c0 6.5-4.5 9.5-9 9M2.5 11.5 8 6" />;
}
function IconSparkle() {
  return (
    <path d="M7 1.5l1.2 3.8L12 6.5l-3.8 1.2L7 11.5l-1.2-3.8L2 6.5l3.8-1.2L7 1.5Z" />
  );
}
function IconScissors() {
  return (
    <path d="M3.2 3.2a1.5 1.5 0 1 1 2.1 2.1 1.5 1.5 0 0 1-2.1-2.1Zm0 7.6a1.5 1.5 0 1 1 2.1-2.1 1.5 1.5 0 0 1-2.1 2.1ZM4.8 5l7.2 6M12 2 4.8 9" />
  );
}
function IconCamera() {
  return (
    <path d="M2 5h2l1-1.5h4L10 5h2v6.5H2V5Zm5 1.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
  );
}
function IconBuilding() {
  return (
    <path d="M3 12.5V2.5h5v10M8 6h3v6.5M1.5 12.5h11M4.5 4.5h1M6.5 4.5h1M4.5 7h1M6.5 7h1M4.5 9.5h1M6.5 9.5h1" />
  );
}
function IconChart() {
  return <path d="M2 12.5h10M4 12.5V8M7 12.5V4.5M10 12.5V6.5" />;
}
function IconGlobe() {
  return (
    <path d="M7 1.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM1.5 7h11M7 1.5C5 3.3 5 10.7 7 12.5c2-1.8 2-9.2 0-11Z" />
  );
}

const INDUSTRIES = [
  { label: "Construcción", Icon: IconHardHat },
  { label: "Roofing", Icon: IconHouse },
  { label: "HVAC", Icon: IconSnowflake },
  { label: "Landscaping", Icon: IconLeaf },
  { label: "Med Spa", Icon: IconSparkle },
  { label: "Belleza", Icon: IconScissors },
  { label: "Fotografía", Icon: IconCamera },
  { label: "Bienes Raíces", Icon: IconBuilding },
  { label: "Contadores", Icon: IconChart },
  { label: "Inmigración", Icon: IconGlobe },
];

function CTAButton({ href, children }: { href: string; children: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-general-sans inline-flex h-14 w-fit shrink-0 cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-full bg-growly-accent px-6 text-[15px] font-semibold tracking-[-0.01em] text-white shadow-[0_1px_0_rgba(255,255,255,.04)_inset,0_10px_30px_rgba(0,0,0,.08)]"
      whileHover={{
        y: -2,
        boxShadow: "0 18px 40px rgba(0,0,0,.12)",
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      whileTap={{ y: 0 }}
    >
      {children}
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        whileHover={{ x: 6 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <path d="M3 9h12M9 3l6 6-6 6" />
      </motion.svg>
    </motion.a>
  );
}

function IndustryPill({
  label,
  Icon,
}: {
  label: string;
  Icon: () => React.JSX.Element;
}) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-growly-line bg-background py-1.5 pr-4 pl-1.5 text-[13px] text-growly-gray">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-growly-accent">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Icon />
        </svg>
      </span>
      {label}
    </span>
  );
}

const HEADLINE_LINES = [
  "Tu negocio",
  "merece verse",
  <>
    tan <span className="text-growly-accent">profesional</span>
  </>,
  "como el trabajo",
  "que realiza.",
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-10 flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
          <span className="font-display text-lg font-bold tracking-tight">
            GROWLY<span className="text-growly-accent">•</span>
          </span>
          <a
            href={whatsappHref("Hola, quiero mi revisión gratuita")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-general-sans inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[13px] font-semibold tracking-[-0.01em] text-foreground no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-growly-accent"
          >
            Contáctanos
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" />
            </svg>
          </a>
        </header>

        {/* Hero content */}
        <div className="px-6 pt-10 pb-10 sm:px-8 lg:px-12 lg:pt-16 lg:pb-14">
          <div className="mx-auto max-w-3xl lg:grid lg:max-w-6xl lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center rounded-full border border-foreground/15 px-4 py-1.5 font-sans text-[11px] font-semibold tracking-[0.12em] text-growly-gray uppercase">
                Auditoría gratuita
              </span>

              <motion.h1
                className="font-general-sans mt-6 text-left text-[clamp(38px,8vw,72px)] leading-[1.05] font-bold tracking-[-0.01em] lg:leading-[1.02]"
                initial={reduceMotion ? undefined : "hidden"}
                whileInView={reduceMotion ? undefined : "show"}
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.07 } },
                }}
              >
                {HEADLINE_LINES.map((line, i) => (
                  <motion.span
                    key={i}
                    className="block overflow-hidden"
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                  >
                    {line}
                  </motion.span>
                ))}
              </motion.h1>

              <p className="mt-5 mb-6 text-left text-[15px] leading-[1.6] text-growly-gray lg:text-lg">
                Websites, branding y sistemas de crecimiento para negocios que
                quieren competir a otro nivel.
              </p>

              <div className="mt-0 flex flex-col items-center gap-3 lg:items-start">
                <CTAButton href={whatsappHref("Hola, quiero mi revisión gratuita")}>
                  Obtener mi revisión gratuita
                </CTAButton>
              </div>

              <p className="mt-2.5 mb-7 text-center text-[11px] whitespace-nowrap text-growly-gray lg:text-left">
                Sin compromiso · Respuesta en menos de 24 horas
              </p>
            </div>

            {/* Visual composition — desktop only, single phone visual sized to match the headline */}
            <div className="hidden lg:flex lg:items-center lg:justify-center">
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/images/hero/iphone-updated-transparent.png"
                    alt="Sitio web profesional de un negocio, visto en un iPhone"
                    width={595}
                    height={1078}
                    sizes="360px"
                    className="h-[600px] w-auto drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Industries — single infinite marquee */}
          <div className="mt-8 w-full overflow-hidden">
            <div className="ticker-track">
              {[...INDUSTRIES, ...INDUSTRIES].map((item, i) => (
                <IndustryPill key={i} label={item.label} Icon={item.Icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
