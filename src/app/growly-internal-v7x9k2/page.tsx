"use client";

import { useState } from "react";

const INDUSTRIES = [
  "Construcción",
  "Roofing",
  "HVAC",
  "Landscaping",
  "Med Spa",
  "Belleza",
  "Fotografía",
  "Bienes Raíces",
  "Contadores",
  "Inmigración",
];

const GOOGLE_BUSINESS_OPTIONS = [
  "No existe",
  "Existe pero incompleto",
  "Bien configurado",
] as const;

const SOCIAL_OPTIONS = [
  "No tiene",
  "Tiene pero inactivo",
  "Activo y consistente",
] as const;

export type FormState = {
  clientName: string;
  company: string;
  industry: string;
  website: string;
  logoNotes: string;
  additionalNotes: string;
  pageSpeedScore: string;
  googleBusiness: (typeof GOOGLE_BUSINESS_OPTIONS)[number];
  instagram: (typeof SOCIAL_OPTIONS)[number];
  facebook: (typeof SOCIAL_OPTIONS)[number];
};

const initialForm: FormState = {
  clientName: "",
  company: "",
  industry: INDUSTRIES[0],
  website: "",
  logoNotes: "",
  additionalNotes: "",
  pageSpeedScore: "",
  googleBusiness: GOOGLE_BUSINESS_OPTIONS[0],
  instagram: SOCIAL_OPTIONS[0],
  facebook: SOCIAL_OPTIONS[0],
};

function Field({
  label,
  htmlFor,
  optional,
  helper,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="font-sans text-sm font-medium text-foreground"
      >
        {label}
        {optional && (
          <span className="ml-1 font-normal text-growly-gray">
            (opcional)
          </span>
        )}
      </label>
      {children}
      {helper && (
        <p className="font-sans text-xs text-growly-gray">{helper}</p>
      )}
    </div>
  );
}

const inputClass =
  "h-11 w-full rounded-lg border border-growly-line bg-white px-3.5 font-sans text-[15px] text-foreground placeholder:text-growly-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-growly-accent";

const textareaClass =
  "w-full resize-none rounded-lg border border-growly-line bg-white px-3.5 py-2.5 font-sans text-[15px] text-foreground placeholder:text-growly-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-growly-accent";

export default function AuditToolPage() {
  const [form, setForm] = useState<FormState>(initialForm);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = encodeURIComponent(JSON.stringify(form));
    window.open(`/audit-report?data=${data}`, "_blank");
  }

  return (
    <main className="min-h-dvh bg-background px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-xl">
        <header className="mb-8">
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            GROWLY<span className="text-growly-accent">•</span>
          </span>
          <h1 className="font-general-sans mt-4 text-2xl font-bold text-foreground">
            Herramienta de auditoría
          </h1>
          <p className="mt-1 font-sans text-sm text-growly-gray">
            Llena los datos del cliente y tus notas antes de la reunión, y
            genera el reporte.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Field label="Nombre del cliente" htmlFor="clientName">
            <input
              id="clientName"
              type="text"
              required
              value={form.clientName}
              onChange={(e) => update("clientName", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Nombre de la empresa" htmlFor="company">
            <input
              id="company"
              type="text"
              required
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Industria" htmlFor="industry">
            <select
              id="industry"
              required
              value={form.industry}
              onChange={(e) => update("industry", e.target.value)}
              className={inputClass}
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Sitio web" htmlFor="website">
            <input
              id="website"
              type="url"
              required
              placeholder="https://miempresa.com"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field
            label="Velocidad del sitio (PageSpeed)"
            htmlFor="pageSpeedScore"
            helper="Búscalo en pagespeed.web.dev"
          >
            <input
              id="pageSpeedScore"
              type="number"
              min={0}
              max={100}
              required
              placeholder="Ej: 45"
              value={form.pageSpeedScore}
              onChange={(e) => update("pageSpeedScore", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Google Business" htmlFor="googleBusiness">
            <select
              id="googleBusiness"
              required
              value={form.googleBusiness}
              onChange={(e) =>
                update(
                  "googleBusiness",
                  e.target.value as FormState["googleBusiness"],
                )
              }
              className={inputClass}
            >
              {GOOGLE_BUSINESS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Instagram" htmlFor="instagram">
            <select
              id="instagram"
              required
              value={form.instagram}
              onChange={(e) =>
                update("instagram", e.target.value as FormState["instagram"])
              }
              className={inputClass}
            >
              {SOCIAL_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Facebook" htmlFor="facebook">
            <select
              id="facebook"
              required
              value={form.facebook}
              onChange={(e) =>
                update("facebook", e.target.value as FormState["facebook"])
              }
              className={inputClass}
            >
              {SOCIAL_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="¿Qué observas sobre su logo y marca?"
            htmlFor="logoNotes"
          >
            <textarea
              id="logoNotes"
              rows={3}
              required
              placeholder="Describe colores, estilo, si se ve profesional, si es coherente..."
              value={form.logoNotes}
              onChange={(e) => update("logoNotes", e.target.value)}
              className={textareaClass}
            />
          </Field>

          <Field label="Otras observaciones" htmlFor="additionalNotes" optional>
            <textarea
              id="additionalNotes"
              rows={3}
              value={form.additionalNotes}
              onChange={(e) => update("additionalNotes", e.target.value)}
              className={textareaClass}
            />
          </Field>

          <button
            type="submit"
            className="mt-2 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-growly-accent font-general-sans text-[15px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-growly-accent"
          >
            Generar Reporte
          </button>
        </form>
      </div>
    </main>
  );
}
