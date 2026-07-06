"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROJECTS = [
  {
    before: "/images/portfolio/cleno-antes.png?v=2",
    after: "/images/portfolio/cleno-despues.png?v=2",
    client: "Cleno",
    industry: "Renovación de Logo",
  },
  {
    before: "/images/portfolio/king-antes.png?v=2",
    after: "/images/portfolio/king-despues.png?v=2",
    client: "King",
    industry: "Transformación de Website",
  },
  {
    before: "/images/portfolio/legis-antes.png?v=2",
    after: "/images/portfolio/legis-despues.png?v=2",
    client: "Legis Immigration",
    industry: "Renovación de Tarjeta de Presentación",
  },
];

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

function ProjectPanel({
  src,
  label,
  onOpen,
}: {
  src: string;
  label: "ANTES" | "DESPUÉS";
  onOpen: (image: { src: string; alt: string }) => void;
}) {
  const { ref, errored, onError } = useImgFallback(src);
  const isAfter = label === "DESPUÉS";
  const alt = `${label === "ANTES" ? "Antes" : "Después"} del proyecto`;

  return (
    <div
      className={`group relative aspect-[3/2] overflow-hidden rounded-xl bg-growly-line ${
        errored ? "" : "cursor-pointer"
      }`}
      onClick={() => {
        if (!errored) onOpen({ src, alt });
      }}
    >
      {!errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
          onError={onError}
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center text-sm font-bold tracking-[0.12em] ${
            isAfter ? "bg-foreground text-white" : "bg-[#D0CFC9] text-foreground"
          }`}
        >
          {label}
        </div>
      )}

      <span className="font-space-mono absolute top-[10px] left-[10px] rounded-[3px] bg-black/60 px-2 py-[3px] text-[9px] font-bold tracking-[0.14em] text-white">
        {label}
      </span>

      {!errored && (
        <div className="absolute right-[10px] bottom-[10px] flex items-center justify-center rounded-md bg-black/55 px-2 py-[5px]">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M9 1h4v4M5 13H1V9M13 1l-5 5M1 13l5-5" />
          </svg>
        </div>
      )}
    </div>
  );
}

function Lightbox({
  image,
  onClose,
}: {
  image: { src: string; alt: string };
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex cursor-pointer items-center justify-center bg-black/92"
      onClick={onClose}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        className="max-h-[85vh] max-w-[90vw] cursor-default rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="fixed top-5 right-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/15"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M4 4l10 10M14 4 4 14" />
        </svg>
      </button>
    </motion.div>
  );
}

export default function AboutMe() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null,
  );

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % PROJECTS.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, reduceMotion, next]);

  useEffect(() => {
    if (!lightbox) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  const project = PROJECTS[index];

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

      <section className="bg-[#E4E3DF] px-6 pt-16 pb-8 sm:px-8 lg:px-12 lg:pt-24 lg:pb-12">
      {/* PART 1 — Sobre mí */}
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

      {/* PART 2 — Nuestras transformaciones */}
      <motion.h3
        className="font-general-sans mx-auto mt-16 max-w-6xl text-left text-2xl font-bold text-foreground"
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        Nuestras transformaciones
      </motion.h3>
      <p className="mx-auto mt-2 mb-8 max-w-6xl text-left font-sans text-[13px] text-growly-gray">
        Desliza para ver cada proyecto
      </p>

      <motion.div
        className="mx-auto max-w-4xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reduceMotion ? undefined : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: 30 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-1 gap-[10px] lg:grid-cols-2 lg:gap-3"
          >
            <ProjectPanel
              src={project.before}
              label="ANTES"
              onOpen={setLightbox}
            />
            <ProjectPanel
              src={project.after}
              label="DESPUÉS"
              onOpen={setLightbox}
            />
          </motion.div>
        </AnimatePresence>

        <div className="mt-3 text-center" aria-live="polite">
          <p className="font-general-sans text-sm font-semibold text-foreground">
            {project.client}
          </p>
          <p className="mt-1 font-sans text-xs text-growly-gray">
            {project.industry}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Proyecto anterior"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-growly-line bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-growly-accent"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="#111111"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 3 5 8l5 5" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {PROJECTS.map((p, i) => (
              <button
                key={p.client}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir al proyecto de ${p.client}`}
                aria-current={i === index}
                className="flex h-11 w-11 cursor-pointer items-center justify-center"
              >
                <span
                  className={`block h-2 w-2 rounded-full transition-colors ${
                    i === index ? "bg-growly-accent" : "bg-growly-line"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Siguiente proyecto"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-growly-line bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-growly-accent"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="#111111"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>
      </motion.div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
