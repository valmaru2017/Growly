"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const PHONE_STAGE_HEIGHT = "h-[380px] sm:h-[440px] lg:h-[500px]";
const PHONE_IMG_CLASS = `${PHONE_STAGE_HEIGHT} w-auto`;

function IntroCopy() {
  return (
    <div className="max-w-[420px] lg:max-w-none">
      <div>
        <p className="font-general-sans text-sm font-bold text-growly-accent">
          #1
        </p>
        <p className="mt-1 font-mono text-[15px] font-medium tracking-[0.08em] text-white uppercase">
          El problema
        </p>
      </div>

      <h2 className="font-general-sans mt-4 mb-2 text-left text-[clamp(32px,8vw,56px)] leading-[1.1] font-extrabold text-white lg:text-5xl">
        Muchos negocios online se ven así
      </h2>

      <p className="font-general-sans mt-2 text-left text-[clamp(15px,3.5vw,18px)] text-white/60 lg:text-xl">
        Y eso les cuesta clientes todos los días
      </p>
    </div>
  );
}

export default function TheProblem() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* Cinematic transition */}
      <div
        aria-hidden="true"
        className="h-[14vh] sm:h-[18vh] lg:h-[22vh]"
        style={{
          background:
            "linear-gradient(to bottom, #f8f8f6 0%, #d8d8d4 18%, #8c8c88 40%, #3a3a38 62%, #0B0B0B 100%)",
        }}
      />

      {/* ── THE PROBLEM — text right, image left on desktop ── */}
      <section className="bg-[#0B0B0B] px-6 pt-14 pb-4 sm:px-8 sm:pt-16 lg:px-12 lg:pt-24 lg:pb-4">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="lg:order-last"
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <IntroCopy />
          </motion.div>

          <motion.div
            className={`flex justify-center ${PHONE_STAGE_HEIGHT}`}
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            <Image
              src="/images/hero/iphone-neglected-transparent.png"
              alt="Sitio web descuidado de un negocio, visto en un iPhone"
              width={654}
              height={1042}
              sizes="(min-width: 1024px) 260px, 50vw"
              className={PHONE_IMG_CLASS}
              priority
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
