"use client";

import { useSearchParams } from "next/navigation";
import type { FormState } from "@/app/growly-internal-v7x9k2/page";
import { computeAudit, type SectionResult } from "@/lib/auditScoring";

const PRINT_STYLES = `
  @media print {
    @page {
      size: Letter;
      margin: 0;
    }
    .page {
      width: 8.5in;
      min-height: 11in;
      padding: 0.6in 0.65in;
      background: #F8F8F6;
    }
    .page:not(:last-child) {
      page-break-after: always;
    }
    .no-print {
      display: none;
    }
  }
`;

const BADGE_STYLES: Record<SectionResult["status"], string> = {
  "Necesita mejora": "bg-[#F5E1DE] text-growly-accent",
  Aceptable: "bg-[#F0EDE4] text-[#8A6D3B]",
  Bien: "bg-[#E3F0E6] text-[#2E7D4F]",
};

function Badge({ status }: { status: SectionResult["status"] }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 font-sans text-xs font-semibold ${BADGE_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

function ScoreCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 rounded-lg border-t-[3px] border-growly-accent bg-white px-3 py-3 text-center">
      <p className="font-sans text-[11px] text-growly-gray">{label}</p>
      <p className="font-general-sans mt-1 text-xl font-bold text-foreground">
        {value}
      </p>
    </div>
  );
}

function SectionBlock({ section }: { section: SectionResult }) {
  return (
    <div className="mb-2">
      <div className="mb-1.5 flex items-center justify-between">
        <h3 className="font-general-sans text-[15px] font-bold text-foreground">
          {section.title}
        </h3>
        <Badge status={section.status} />
      </div>
      <ul className="flex flex-col">
        {section.findings.map((f) => (
          <li
            key={f}
            className="font-sans text-[13px] leading-[1.35] text-[#444444]"
          >
            {f}
          </li>
        ))}
      </ul>
      <p className="mt-1.5 font-sans text-[13px] font-semibold text-growly-accent">
        Acción rápida: <span className="font-normal">{section.quickWin}</span>
      </p>
    </div>
  );
}

export default function ReportContent() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("data");

  let form: FormState | null = null;
  try {
    if (raw) form = JSON.parse(decodeURIComponent(raw));
  } catch {
    form = null;
  }

  if (!form) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background px-6 text-center">
        <p className="font-sans text-foreground">
          No se encontraron datos del reporte. Vuelve a la herramienta de
          auditoría y genera el reporte de nuevo.
        </p>
      </div>
    );
  }

  const audit = computeAudit(form);
  const pageSpeedScore = Math.max(
    0,
    Math.min(100, Number(form.pageSpeedScore) || 0),
  );
  const date = new Date().toLocaleDateString("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-background">
      <style>{PRINT_STYLES}</style>

      {/* PAGE 1 */}
      <div className="page mx-auto max-w-[8.5in] bg-background px-8 py-10 print:mx-0 print:max-w-none">
        <div className="flex items-baseline justify-between border-b border-growly-line pb-3">
          <span className="font-display text-base font-bold tracking-tight text-foreground">
            GROWLY<span className="text-growly-accent">•</span>{" "}
            <span className="font-sans text-sm font-normal text-growly-gray">
              · Business Growth Audit
            </span>
          </span>
          <span className="font-sans text-xs text-growly-gray">{date}</span>
        </div>

        <div className="mt-6 flex items-start justify-between">
          <div>
            <h1 className="font-general-sans text-2xl font-bold text-foreground">
              {form.company}
            </h1>
            <p className="mt-1 font-sans text-sm text-growly-gray">
              {form.industry} · {form.website}
            </p>
            <p className="mt-0.5 font-sans text-sm text-growly-gray">
              Cliente: {form.clientName}
            </p>
          </div>
          <div className="text-right">
            <p className="font-sans text-xs tracking-[0.1em] text-growly-gray uppercase">
              Puntuación general
            </p>
            <p className="font-general-sans text-4xl font-extrabold text-growly-accent">
              {audit.overallScore}
              <span className="text-lg text-growly-gray">/10</span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <ScoreCard label="Velocidad" value={`${pageSpeedScore}/100`} />
          <ScoreCard label="SEO" value={`${audit.sections.seo.score}/10`} />
          <ScoreCard label="Marca" value={`${audit.sections.brand.score}/10`} />
          <ScoreCard
            label="Google"
            value={`${audit.sections.google.score}/10`}
          />
          <ScoreCard label="Redes" value={`${audit.sections.social.score}/10`} />
        </div>

        <div className="mt-8">
          <h2 className="font-general-sans text-sm font-bold tracking-[0.08em] text-foreground uppercase">
            Resumen ejecutivo
          </h2>
          <p className="mt-2 font-sans text-[14px] leading-[1.7] text-[#444444]">
            {audit.summary}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <h2 className="font-general-sans text-sm font-bold tracking-[0.08em] text-foreground uppercase">
              Lo que está bien
            </h2>
            <ul className="mt-2 flex flex-col gap-1.5">
              {audit.goodPoints.map((p) => (
                <li
                  key={p}
                  className="flex gap-2 font-sans text-[13px] leading-[1.5] text-[#444444]"
                >
                  <span className="text-[#2E7D4F]">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-general-sans text-sm font-bold tracking-[0.08em] text-foreground uppercase">
              Lo que necesita atención
            </h2>
            <ul className="mt-2 flex flex-col gap-1.5">
              {audit.attentionPoints.map((p) => (
                <li
                  key={p}
                  className="flex gap-2 font-sans text-[13px] leading-[1.5] text-[#444444]"
                >
                  <span className="text-growly-accent">→</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* PAGE 2 */}
      <div className="page mx-auto max-w-[8.5in] bg-background px-8 py-10 print:mx-0 print:max-w-none">
        <h2 className="font-general-sans text-lg font-bold text-foreground">
          Análisis detallado
        </h2>
        <div className="mt-1 mb-4 h-px bg-growly-line" />

        <SectionBlock section={audit.sections.speed} />
        <SectionBlock section={audit.sections.seo} />
        <SectionBlock section={audit.sections.brand} />
        <SectionBlock section={audit.sections.google} />
        <SectionBlock section={audit.sections.social} />

        <div className="mt-1 h-px bg-growly-line" />

        <div className="mt-4">
          <h2 className="font-general-sans text-sm font-bold tracking-[0.08em] text-foreground uppercase">
            Tus 3 prioridades
          </h2>
          <ol className="mt-2 flex flex-col gap-1">
            {audit.topPriorities.map((p, i) => (
              <li key={p} className="flex gap-3 font-sans text-[14px] text-[#444444]">
                <span className="font-general-sans font-bold text-growly-accent">
                  {i + 1}.
                </span>
                {p}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4 h-px bg-growly-line" />

        <p className="mt-3 font-sans text-[14px] leading-[1.5] text-foreground italic">
          &ldquo;{audit.closingMessage}&rdquo;
        </p>

        <div className="mt-3 border-t border-growly-line pt-2 text-center">
          <p className="font-sans text-xs text-growly-gray">
            <span className="font-general-sans font-semibold text-foreground">
              Valentina Marulanda · Growly
            </span>{" "}
            · growly-gamma.vercel.app · +1 (619) 436-1819
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.print()}
        className="no-print fixed right-6 bottom-6 flex h-12 cursor-pointer items-center justify-center rounded-lg bg-growly-accent px-6 font-sans text-base font-semibold text-white"
      >
        Descargar PDF →
      </button>
    </div>
  );
}
