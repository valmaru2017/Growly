"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ThePerception() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#0B0B0B] px-6 pt-4 pb-4 sm:px-8 lg:px-12 lg:pt-6 lg:pb-4">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="max-w-[420px] lg:order-last lg:max-w-none"
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Label */}
          <div>
            <p className="font-general-sans text-sm font-bold text-growly-accent">
              #3
            </p>
            <p className="mt-1 font-mono text-[15px] font-medium tracking-[0.08em] text-white uppercase">
              La percepción
            </p>
          </div>

          {/* Headline */}
          <h2 className="font-general-sans mt-4 text-left text-[clamp(30px,8vw,48px)] leading-[1.08] font-extrabold text-white lg:text-5xl">
            La diferencia no es tu trabajo,{" "}
            <span className="text-growly-accent">es cómo lo perciben</span>
          </h2>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex justify-center"
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/hero/complete-section3.update.png"
              alt="Sistema de marca completo: sitio web, perfil de Google, tarjetas de presentación y propuesta"
              width={926}
              height={1451}
              sizes="(min-width: 1024px) 460px, 90vw"
              className="h-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
