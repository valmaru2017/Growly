import { whatsappHref } from "@/lib/contact";

export default function Nav() {
  return (
    <header className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
      <span className="font-display text-lg font-bold tracking-tight">
        GROWLY<span className="text-growly-accent">•</span>
      </span>
      <a
        href={whatsappHref("Hola, quiero mi revisión gratuita")}
        target="_blank"
        rel="noopener noreferrer"
        className="font-general-sans inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[13px] font-semibold tracking-[-0.01em] text-foreground no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-growly-accent"
      >
        Contáctanos
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" />
        </svg>
      </a>
    </header>
  );
}
