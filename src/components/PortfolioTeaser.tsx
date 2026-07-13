"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PortfolioTeaser() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* Cinematic transition — warm gray (Sobre mí) to the light background below */}
      <div
        aria-hidden="true"
        className="h-[8vh] sm:h-[10vh] lg:h-[12vh]"
        style={{
          background: "linear-gradient(to bottom, #E4E3DF 0%, #f8f8f6 100%)",
        }}
      />

      <section className="bg-background px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="inline-flex items-center rounded-full border border-foreground/15 px-4 py-1.5 font-sans text-[11px] font-semibold tracking-[0.12em] text-growly-gray uppercase">
            Portafolio
          </span>

          <h2 className="font-general-sans mt-6 text-[clamp(32px,8vw,56px)] leading-[1.1] font-extrabold tracking-[-0.01em] text-foreground lg:text-5xl">
            Conoce nuestro portafolio
          </h2>

          <p className="mx-auto mt-5 max-w-[55ch] text-[15px] leading-[1.6] text-growly-gray lg:text-lg">
            Tres sitios diseñados para tres industrias distintas. Cada
            proyecto refleja la personalidad, el nicho y la estrategia
            comercial de la marca.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/portafolio"
              className="font-general-sans inline-flex h-14 w-fit cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-full bg-foreground px-8 text-[15px] font-semibold tracking-[-0.01em] text-background transition-transform duration-300 hover:-translate-y-0.5"
            >
              Ver portafolio
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9h12M9 3l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
