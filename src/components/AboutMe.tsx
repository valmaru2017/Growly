"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function useImgFallback(src: string) {
  const [errored, setErrored] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setErrored(true);
    }
  }, [src]);

  return { ref, errored, onError: () => setErrored(true) };
}

function ProfilePhoto() {
  const src = "/images/about/foto_profesional_editada.png";
  const { ref, errored, onError } = useImgFallback(src);

  return (
    <div className="h-[180px] w-[140px] overflow-hidden rounded-xl bg-growly-line lg:h-[220px] lg:w-[180px]">
      {!errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={src}
          alt="Valentina Marulanda, fundadora de Growly"
          className="h-full w-full object-cover object-[50%_20%]"
          onError={onError}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-general-sans text-4xl font-extrabold text-growly-accent">
            V
          </span>
        </div>
      )}
    </div>
  );
}

export default function AboutMe() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* Cinematic transition — black (previous section) to gray */}
      <div
        aria-hidden="true"
        className="h-[14vh] sm:h-[18vh] lg:h-[22vh]"
        style={{
          background:
            "linear-gradient(to bottom, #0B0B0B 0%, #3a3a38 38%, #8c8c88 60%, #d8d8d4 82%, #E4E3DF 100%)",
        }}
      />

      <section className="bg-[#E4E3DF] px-6 pt-16 pb-16 sm:px-8 lg:px-12 lg:pt-24 lg:pb-24">
        {/* Sobre mí */}
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="font-space-mono text-[13px] tracking-[0.14em] text-growly-accent uppercase">
              Sobre mí
            </p>
          </motion.div>

          <div className="mt-6">
            <motion.div
              className="float-left mr-5 mb-3 lg:mr-8 lg:mb-4"
              initial={reduceMotion ? undefined : { opacity: 0, x: -30 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              <ProfilePhoto />
            </motion.div>

            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, x: 30 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            >
              <h2 className="font-general-sans text-[26px] leading-[1.1] font-extrabold text-foreground lg:text-[32px]">
                Valentina Marulanda
              </h2>
              <p className="mt-1 mb-3 font-sans text-[13px] text-growly-gray lg:text-sm">
                Fundadora · Growly
              </p>
              <div className="mb-3 h-px w-8 bg-growly-line" />
              <p
                className="font-sans text-[15px] text-[#444444] lg:text-base"
                style={{ lineHeight: 1.75 }}
              >
                Soy colombiana, vivo en California, y llevo años ayudando a
                negocios latinos a verse como lo que realmente son: empresas
                serias, profesionales y listas para crecer. Growly nació de ver
                demasiados negocios increíbles perder clientes por una mala
                primera impresión digital. Si tu trabajo es bueno, tu imagen
                debería verse igual de profesional.
              </p>
            </motion.div>

            <div className="clear-both" />
          </div>
        </div>
      </section>
    </>
  );
}
