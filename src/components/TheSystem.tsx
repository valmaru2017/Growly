"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    label: "Sitio Web",
    Icon: () => (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M2 12h20M8 21h8M12 17v4" />
      </>
    ),
  },
  {
    label: "Branding",
    Icon: () => (
      <path d="M12 2l2.5 6.5H21l-5.5 4 2 6.5L12 15l-5.5 4 2-6.5L3 8.5h6.5L12 2Z" />
    ),
  },
  {
    label: "Propuestas",
    Icon: () => (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
  },
  {
    label: "Google Perfil",
    Icon: () => (
      <>
        <path d="M12 22s-7-7.3-7-11a7 7 0 0 1 14 0c0 3.7-7 11-7 11Z" />
        <circle cx="12" cy="11" r="2.5" />
      </>
    ),
  },
  {
    label: "Papelería Corporativa",
    Icon: () => (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 4 0v2M3 12h18" />
      </>
    ),
  },
  {
    label: "Tarjetas de Presentación",
    Icon: () => (
      <>
        <rect x="2" y="6" width="20" height="13" rx="2" />
        <path d="M2 10h20M6 15h4M6 18h2" />
      </>
    ),
  },
];

export default function TheSystem() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#0B0B0B] px-6 pt-4 pb-14 sm:px-8 lg:px-12 lg:pt-6 lg:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="max-w-[420px] lg:max-w-none"
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Label */}
          <div>
            <p className="font-general-sans text-sm font-bold text-growly-accent">
              #4
            </p>
            <p className="mt-1 font-mono text-[15px] font-medium tracking-[0.08em] text-white uppercase">
              Más que piezas
            </p>
          </div>

          {/* Headline */}
          <h2 className="font-general-sans mt-4 text-left text-[clamp(34px,9.5vw,56px)] leading-[1.08] font-extrabold text-white lg:text-5xl">
            Un <span className="text-growly-accent">sistema</span> que trabaja
            por tu negocio
          </h2>
        </motion.div>

        {/* Icon grid — 2 rows × 3 cols on mobile, same in the right column on desktop */}
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-x-2 gap-y-8 lg:order-last lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
          {SERVICES.map(({ label, Icon }, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-2.5"
              initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Icon />
                </svg>
              </div>
              <span className="font-general-sans text-center text-[11px] leading-[1.3] text-white/65">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
