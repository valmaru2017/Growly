"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { whatsappHref } from "@/lib/contact";
import { trackWhatsAppClick } from "@/lib/tracking";

const EASE = [0.16, 1, 0.3, 1] as const;

type Project = {
  slug: string;
  number: string;
  category: string;
  name: string;
  location: string;
  description: string;
  deliverables: string[];
  href: string;
  image: string;
  imagePosition?: string;
  imageFirst: boolean;
};

const PROJECTS: Project[] = [
  {
    slug: "domulux",
    number: "01",
    category: "BIENES RAÍCES",
    name: "Domulux",
    location: "BOGOTÁ, COLOMBIA",
    description:
      "Sitio editorial para una bróker inmobiliaria boutique con 18 años de trayectoria. Enfoque curatorial en propiedades premium, tipografía serif y navegación transparente sobre foto.",
    deliverables: ["IDENTIDAD", "SITIO WEB", "FOTOGRAFÍA"],
    href: "https://agency-template-blush.vercel.app/domulux",
    image: "/images/portfolio/domulux.png",
    imagePosition: "center top",
    imageFirst: true,
  },
  {
    slug: "rhino",
    number: "02",
    category: "CONSTRUCCIÓN",
    name: "Rhino Construction",
    location: "HOUSTON, TX",
    description:
      "Landing directa para contratistas de fix and flip. Diseño industrial cálido con acento ocre, formulario de cotización y estructura orientada a conversión en mercado americano.",
    deliverables: ["IDENTIDAD", "SITIO WEB", "FORMULARIO DE COTIZACIÓN"],
    href: "https://agency-template-blush.vercel.app/rhino",
    image: "/images/portfolio/rhino.png",
    imagePosition: "center top",
    imageFirst: false,
  },
  {
    slug: "delfos",
    number: "03",
    category: "WELLNESS · SPA",
    name: "Delfos",
    location: "MIAMI, FL",
    description:
      "Sitio para spa boutique de masajes en Miami Design District. Estructura tipo hotel de lujo con formulario de reserva completo, galería de espacios y paleta warm cream.",
    deliverables: ["IDENTIDAD", "SITIO WEB", "SISTEMA DE RESERVAS"],
    href: "https://agency-template-blush.vercel.app/delfos",
    image: "/images/portfolio/delfos.png",
    imagePosition: "center top",
    imageFirst: true,
  },
];

function ProjectImage({ project }: { project: Project }) {
  return (
    <div
      className="group relative w-full overflow-hidden border border-foreground/10"
      style={{ aspectRatio: "1 / 2" }}
    >
      <Image
        src={project.image}
        alt={`Brand identity board — ${project.name}`}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        style={{ objectPosition: project.imagePosition ?? "center" }}
        className="object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.02]"
      />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();

  const imageCol = (
    <motion.div
      className={`lg:col-span-4 ${project.imageFirst ? "" : "lg:order-last"}`}
      initial={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <ProjectImage project={project} />
    </motion.div>
  );

  const textCol = (
    <motion.div
      className="flex flex-col justify-center lg:col-span-8"
      initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
    >
      <p className="font-space-mono text-[13px] tracking-[0.14em] text-growly-accent uppercase">
        {project.number} · {project.category}
      </p>

      <h3 className="font-general-sans mt-4 text-[clamp(32px,8vw,56px)] leading-[1.1] font-extrabold tracking-[-0.01em] text-foreground lg:text-5xl">
        {project.name}
      </h3>

      <p className="font-space-mono mt-3 text-[12px] tracking-[0.12em] text-growly-gray uppercase">
        {project.location}
      </p>

      <p
        className="mt-5 max-w-[55ch] text-[15px] text-[#444444] lg:text-base"
        style={{ lineHeight: 1.7 }}
      >
        {project.description}
      </p>

      <p className="font-sans mt-5 text-[11px] tracking-[0.1em] text-growly-gray uppercase">
        {project.deliverables.join(" · ")}
      </p>

      <div className="mt-8">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-general-sans inline-flex h-12 w-fit cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-foreground bg-background px-6 text-[14px] font-semibold tracking-[-0.01em] text-foreground transition-transform duration-300 hover:-translate-y-0.5"
        >
          Ver sitio en vivo
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12 12 4M6 4h6v6" />
          </svg>
        </a>
      </div>
    </motion.div>
  );

  return (
    <article className="mx-auto grid min-h-[600px] max-w-6xl items-center gap-10 px-6 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
      {imageCol}
      {textCol}
    </article>
  );
}

export default function PortfolioContent() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Nav />

      <main>
        {/* Hero */}
        <section className="bg-background px-6 pt-16 pb-12 sm:px-8 sm:pt-20 lg:px-12 lg:pt-[120px] lg:pb-[80px]">
          <motion.div
            className="mx-auto max-w-6xl text-left"
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="font-space-mono text-[13px] tracking-[0.14em] text-growly-accent uppercase">
              Portafolio
            </p>

            <h1 className="font-general-sans mt-6 text-left text-[clamp(42px,9vw,84px)] leading-[1.05] font-bold tracking-[-0.01em] text-foreground lg:text-[clamp(38px,8vw,72px)] lg:leading-[1.02]">
              Trabajos que hablan por sí solos.
            </h1>

            <p className="mt-6 max-w-[55ch] text-[15px] leading-[1.6] text-growly-gray lg:text-lg">
              Cada proyecto está pensado como un sistema completo: marca,
              mensaje y experiencia digital. Estos son tres ejemplos
              recientes.
            </p>
          </motion.div>
        </section>

        {/* Project cards */}
        <div className="flex flex-col gap-[100px] pb-[100px]">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Final CTA */}
        <section className="bg-foreground px-6 py-20 sm:px-8 lg:px-12 lg:py-[120px]">
          <motion.div
            className="mx-auto max-w-6xl text-left"
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="font-space-mono text-[13px] tracking-[0.14em] text-growly-accent uppercase">
              ¿Listo para el siguiente?
            </p>

            <h2 className="font-general-sans mt-6 text-left text-[clamp(42px,9vw,84px)] leading-[1.05] font-bold tracking-[-0.01em] text-background lg:text-[clamp(38px,8vw,72px)] lg:leading-[1.02]">
              Obtén tu revisión gratuita.
            </h2>

            <p className="mt-6 max-w-[55ch] text-[15px] leading-[1.6] text-background/60 lg:text-lg">
              Analizamos tu presencia digital, te decimos qué está
              costándote clientes hoy, y te mostramos cómo lo transformamos
              — con ejemplos reales.
            </p>

            <div className="mt-9">
              <motion.a
                href={whatsappHref("Hola, quiero mi revisión gratuita")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppClick}
                className="font-general-sans inline-flex w-fit cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-full bg-growly-accent text-[17px] font-medium tracking-[-0.01em] text-background shadow-[0_1px_0_rgba(255,255,255,.04)_inset,0_10px_30px_rgba(0,0,0,.25)]"
                style={{ padding: "20px 44px" }}
                whileHover={{
                  y: -2,
                  boxShadow: "0 18px 40px rgba(0,0,0,.35)",
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
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9h12M9 3l6 6-6 6" />
                </svg>
              </motion.a>
            </div>

            <p className="mt-4 font-sans text-[11px] tracking-[0.1em] text-background/50 uppercase">
              Sin compromiso · Respuesta en menos de 24 horas
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
