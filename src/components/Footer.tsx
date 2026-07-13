"use client";

import { whatsappHref } from "@/lib/contact";
import { trackWhatsAppClick } from "@/lib/tracking";

export default function Footer() {
  return (
    <footer className="border-t border-growly-line bg-background px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <span className="font-display text-base font-bold tracking-tight">
          GROWLY<span className="text-growly-accent">•</span>
        </span>

        <p className="max-w-sm text-[13px] leading-[1.6] text-growly-gray">
          Ayudamos a negocios latinos en EE. UU. a verse tan profesionales
          como el trabajo que realizan.
        </p>

        <a
          href={whatsappHref("Hola, quiero mi revisión gratuita")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppClick}
          className="inline-flex min-h-11 cursor-pointer items-center text-[13px] font-semibold text-foreground no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-growly-accent"
        >
          Escríbenos por WhatsApp
        </a>
      </div>

      <p className="mt-6 text-center text-[11px] text-growly-gray">
        © {new Date().getFullYear()} Growly. Todos los derechos reservados.
      </p>
    </footer>
  );
}
