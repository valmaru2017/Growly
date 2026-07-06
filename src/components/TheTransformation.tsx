"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function TheTransformation() {
  const reduceMotion = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.96]);

  return (
    <section className="bg-[#0B0B0B] px-6 pt-4 pb-4 sm:px-8 lg:px-12 lg:pt-6 lg:pb-4">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Label */}
          <div>
            <p className="font-general-sans text-sm font-bold text-growly-accent">
              #2
            </p>
            <p className="mt-1 font-mono text-[15px] font-medium tracking-[0.08em] text-white uppercase">
              Transformación
            </p>
          </div>

          {/* Headline */}
          <h2 className="font-general-sans mt-4 text-left text-[clamp(34px,9.5vw,56px)] leading-[1.08] font-extrabold text-white lg:text-5xl">
            Cuando todo se alinea,{" "}
            <span className="text-growly-accent">tu negocio evoluciona</span>
          </h2>
        </motion.div>

        {/* Brand system — full-bleed on mobile/tablet, contained on desktop (right column) */}
        <div
          ref={imageRef}
          className="flex justify-center overflow-hidden lg:order-last"
        >
          <motion.div
            className="w-full max-w-sm bg-[#0B0B0B] sm:max-w-lg lg:max-w-none"
            style={
              reduceMotion
                ? undefined
                : { y: parallaxY, scale: parallaxScale }
            }
            initial={reduceMotion ? undefined : { opacity: 0 }}
            whileInView={reduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            <Image
              src="/images/hero/Brand.png"
              alt="Sistema de marca de Growly: colores, tipografía y componentes"
              width={1023}
              height={1537}
              sizes="(min-width: 1024px) 480px, 90vw"
              className="h-auto w-full mix-blend-screen"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
