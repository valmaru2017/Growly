"use client";

import { motion, useReducedMotion } from "framer-motion";
import { whatsappHref } from "@/lib/contact";
import { trackWhatsAppClick } from "@/lib/tracking";

const EASE = [0.16, 1, 0.3, 1] as const;

const REASONS = [
  "Auditoría gratuita de tu sitio y marca actual",
  "Sin compromiso · respuesta en menos de 24 horas",
  "Hablamos español y entendemos tu negocio",
];

export default function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-background px-6 pt-8 pb-16 sm:px-8 lg:px-12 lg:pt-12 lg:pb-28"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

      <motion.div
        className="relative z-10 mx-auto max-w-2xl text-center"
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="inline-flex items-center rounded-full border border-foreground/15 px-4 py-1.5 font-sans text-[11px] font-semibold tracking-[0.12em] text-growly-gray uppercase">
          Empecemos
        </span>

        <h2 className="font-general-sans mt-6 text-[clamp(32px,8vw,56px)] leading-[1.1] font-extrabold tracking-[-0.01em] lg:text-5xl">
          Hablemos de cómo{" "}
          <span className="text-growly-accent">quieres que te vean</span>
        </h2>

        <p className="mx-auto mt-5 max-w-md text-[15px] leading-[1.6] text-growly-gray lg:text-lg">
          Cuéntanos sobre tu negocio y te mostramos exactamente qué está
          costándote clientes hoy — y cómo lo arreglamos.
        </p>

        <div className="mt-8 flex justify-center">
          <motion.a
            href={whatsappHref("Hola, quiero mi revisión gratuita")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="font-general-sans inline-flex h-14 w-fit cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-full bg-growly-accent px-8 text-[15px] font-semibold tracking-[-0.01em] text-white shadow-[0_1px_0_rgba(255,255,255,.04)_inset,0_10px_30px_rgba(0,0,0,.08)]"
            whileHover={{
              y: -2,
              boxShadow: "0 18px 40px rgba(0,0,0,.12)",
              transition: { duration: 0.35, ease: "easeOut" },
            }}
            whileTap={{ y: 0 }}
          >
            Escribir por WhatsApp
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9h12M9 3l6 6-6 6" />
            </svg>
          </motion.a>
        </div>

        <ul className="mt-8 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center sm:gap-6">
          {REASONS.map((reason) => (
            <li
              key={reason}
              className="flex items-center gap-2 text-[13px] text-growly-gray"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-growly-accent"
                aria-hidden="true"
              >
                <path d="M2.5 7.5 5.5 10.5 11.5 3.5" />
              </svg>
              {reason}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
