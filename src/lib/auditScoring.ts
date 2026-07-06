import type { FormState } from "@/app/audit-tool/page";

export type SectionResult = {
  title: string;
  score: number;
  status: "Necesita mejora" | "Aceptable" | "Bien";
  findings: string[];
  quickWin: string;
};

export type AuditResult = {
  overallScore: string;
  summary: string;
  sections: {
    speed: SectionResult;
    seo: SectionResult;
    brand: SectionResult;
    google: SectionResult;
    social: SectionResult;
  };
  goodPoints: string[];
  attentionPoints: string[];
  topPriorities: string[];
  closingMessage: string;
};

type Tier = "low" | "mid" | "high";

function tierFor(score: number): Tier {
  if (score <= 4) return "low";
  if (score <= 7) return "mid";
  return "high";
}

function statusFor(score: number): SectionResult["status"] {
  if (score <= 4) return "Necesita mejora";
  if (score <= 7) return "Aceptable";
  return "Bien";
}

export function computeAudit(form: FormState): AuditResult {
  const pageSpeedScore = Math.max(
    0,
    Math.min(100, Number(form.pageSpeedScore) || 0),
  );
  const speedScore = Math.round(pageSpeedScore / 10);
  const seoScore = form.website ? 5 : 2;

  const logoText = form.logoNotes.toLowerCase();
  const negativeWords = [
    "viejo",
    "feo",
    "pixelado",
    "malo",
    "inconsistente",
    "amateur",
  ];
  const positiveWords = ["profesional", "bien", "bueno", "moderno", "limpio"];
  const logoNegative = negativeWords.some((w) => logoText.includes(w));
  const logoPositive = positiveWords.some((w) => logoText.includes(w));
  const brandScore = logoPositive ? 7 : logoNegative ? 3 : 5;

  const googleScoreMap: Record<FormState["googleBusiness"], number> = {
    "No existe": 1,
    "Existe pero incompleto": 5,
    "Bien configurado": 9,
  };
  const googleScore = googleScoreMap[form.googleBusiness];

  const socialScoreMap: Record<FormState["instagram"], number> = {
    "No tiene": 1,
    "Tiene pero inactivo": 4,
    "Activo y consistente": 8,
  };
  const socialScore = Math.round(
    (socialScoreMap[form.instagram] + socialScoreMap[form.facebook]) / 2,
  );

  const overallScoreNum =
    (speedScore + seoScore + brandScore + googleScore + socialScore) / 5;
  const overallScore = overallScoreNum.toFixed(1);

  const summaryTemplates: Record<Tier, string> = {
    low: `${form.company} tiene oportunidades significativas para mejorar su presencia digital. Con los cambios correctos, puede proyectar el nivel profesional que su trabajo merece.`,
    mid: `${form.company} tiene una base digital funcional, pero con áreas clave que están costando clientes potenciales. Hay mejoras concretas que pueden hacer una gran diferencia.`,
    high: `${form.company} tiene una presencia digital sólida. Con algunos ajustes estratégicos, puede posicionarse como la opción premium en su mercado.`,
  };

  const speed: SectionResult = {
    title: "Velocidad del sitio",
    score: speedScore,
    status: statusFor(speedScore),
    findings: {
      low: [
        `El sitio obtuvo ${pageSpeedScore}/100 en PageSpeed — una carga lenta que probablemente aleja visitantes antes de que vean el contenido.`,
        "Esto afecta directamente la conversión, sobre todo en móvil.",
        "Es probable que también esté afectando el posicionamiento en Google.",
      ],
      mid: [
        `El sitio obtuvo ${pageSpeedScore}/100 en PageSpeed — funcional, pero con margen claro de mejora.`,
        "Visitantes con conexiones más lentas o en móvil pueden estar abandonando la página.",
        "Optimizaciones puntuales pueden mejorar la experiencia sin un rediseño completo.",
      ],
      high: [
        `El sitio obtuvo ${pageSpeedScore}/100 en PageSpeed — una base técnica sólida.`,
        "La velocidad no es una barrera para la conversión en este momento.",
        "Vale la pena monitorear periódicamente para no perder esta ventaja.",
      ],
    }[tierFor(speedScore)],
    quickWin: {
      low: "Optimizar y comprimir las imágenes principales del sitio, y activar caché del navegador.",
      mid: "Revisar en pagespeed.web.dev qué recursos tardan más en cargar y priorizar esos.",
      high: "Mantener un chequeo de velocidad cada pocos meses para detectar regresiones a tiempo.",
    }[tierFor(speedScore)],
  };

  const seo: SectionResult = {
    title: "SEO & Visibilidad",
    score: seoScore,
    status: statusFor(seoScore),
    findings: {
      low: [
        "No cuenta con un sitio web propio, lo que limita fuertemente su visibilidad en búsquedas de Google.",
        "Los clientes que buscan el servicio en su zona probablemente están encontrando a la competencia primero.",
        "Sin un sitio, es difícil controlar el mensaje y la primera impresión.",
      ],
      mid: [
        "Tiene sitio web, pero es probable que le falten elementos clave de SEO (títulos, meta descripciones, contenido local).",
        "Hay una base para posicionar, pero sin optimización específica es difícil competir por las búsquedas más valiosas.",
        "Agregar contenido orientado a la ciudad/servicio ayudaría a captar búsquedas locales.",
      ],
      high: [
        "El sitio parte de una base sólida para posicionar en búsquedas relevantes.",
        "Vale la pena reforzar el SEO local (ciudad + servicio) para capturar más búsquedas de intención alta.",
        "Mantener el contenido actualizado ayuda a sostener el posicionamiento en el tiempo.",
      ],
    }[tierFor(seoScore)],
    quickWin: {
      low: "Lanzar un sitio web básico con información clara del servicio, ubicación y forma de contacto.",
      mid: "Revisar y completar títulos, meta descripciones y encabezados en las páginas principales.",
      high: "Agregar contenido local (ciudad + servicio) para atraer más búsquedas específicas.",
    }[tierFor(seoScore)],
  };

  const brand: SectionResult = {
    title: "Marca & Logo",
    score: brandScore,
    status: statusFor(brandScore),
    findings: {
      low: [
        "El logo y la identidad visual actuales pueden estar afectando la percepción de profesionalismo.",
        "Una imagen inconsistente genera dudas en un cliente que está comparando opciones.",
        "Esto es una de las formas más rápidas de perder credibilidad frente a la competencia.",
      ],
      mid: [
        "La identidad de marca es funcional, pero no se distingue claramente de la competencia.",
        "Hay oportunidad de reforzar la consistencia visual entre el sitio, redes y materiales impresos.",
        "Una imagen más definida ayuda a que el cliente recuerde y confíe en el negocio.",
      ],
      high: [
        "La marca se percibe sólida y profesional.",
        "Es una base fuerte para diferenciarse en su mercado.",
        "Vale la pena aprovechar esta identidad de forma consistente en todos los puntos de contacto.",
      ],
    }[tierFor(brandScore)],
    quickWin: {
      low: "Renovar el logo y definir una guía de marca básica (colores, tipografía, usos).",
      mid: "Reforzar la consistencia visual en sitio web, redes sociales y materiales impresos.",
      high: "Aprovechar la marca actual de forma más consistente en nuevas plataformas y materiales.",
    }[tierFor(brandScore)],
  };

  const google: SectionResult = {
    title: "Google Business",
    score: googleScore,
    status: statusFor(googleScore),
    findings: {
      low: [
        "No existe un perfil de Google Business, lo que significa perder clientes que buscan directamente en Google Maps.",
        "La mayoría de las búsquedas locales de servicios pasan primero por Google Business.",
        "Sin este perfil, la competencia con presencia activa capta esas búsquedas.",
      ],
      mid: [
        "El perfil de Google Business existe, pero probablemente está incompleto (fotos, horarios, categoría o reseñas).",
        "Un perfil incompleto genera menos confianza y menos clics que uno bien configurado.",
        "Completar la información es una de las mejoras de mayor impacto por menor esfuerzo.",
      ],
      high: [
        "El perfil de Google Business está bien configurado y aprovechado.",
        "Esto ayuda a captar búsquedas locales de alta intención de compra.",
        "Mantener reseñas y publicaciones activas sostiene esta ventaja.",
      ],
    }[tierFor(googleScore)],
    quickWin: {
      low: "Crear y verificar el perfil de Google Business con información completa y fotos reales.",
      mid: "Completar horarios, categoría, fotos y pedir reseñas a clientes recientes.",
      high: "Publicar actualizaciones periódicas y responder reseñas para mantener el perfil activo.",
    }[tierFor(googleScore)],
  };

  const social: SectionResult = {
    title: "Redes Sociales",
    score: socialScore,
    status: statusFor(socialScore),
    findings: {
      low: [
        "La presencia en redes sociales es prácticamente inexistente, lo que limita construir confianza antes del primer contacto.",
        "Los clientes suelen revisar redes antes de decidir, y no encontrar nada genera dudas.",
        "Es una oportunidad clara de mostrar trabajos reales y generar cercanía con la comunidad.",
      ],
      mid: [
        "Hay presencia en redes, pero de forma inconsistente o poco activa.",
        "Publicar de forma irregular limita el alcance y la construcción de confianza.",
        "Un calendario simple de contenido puede mejorar esto sin mucho esfuerzo.",
      ],
      high: [
        "Las redes sociales están activas y consistentes.",
        "Esto refuerza la marca y genera confianza antes del primer contacto.",
        "Vale la pena mantener el ritmo actual de publicaciones y cercanía con la audiencia.",
      ],
    }[tierFor(socialScore)],
    quickWin: {
      low: "Crear perfiles en Instagram y Facebook y publicar trabajos reales del negocio.",
      mid: "Definir un calendario simple de 2-3 publicaciones por semana con trabajos y testimonios.",
      high: "Seguir mostrando trabajos reales y testimonios para mantener el ritmo actual.",
    }[tierFor(socialScore)],
  };

  const sections = { speed, seo, brand, google, social };

  const goodPoints = Object.values(sections)
    .filter((s) => s.score >= 7)
    .map((s) => `${s.title} está en buen nivel.`);
  const attentionPoints = Object.values(sections)
    .filter((s) => s.score <= 4)
    .map((s) => `${s.title} necesita atención prioritaria.`);

  if (goodPoints.length === 0) {
    const best = Object.values(sections).sort((a, b) => b.score - a.score)[0];
    goodPoints.push(`${best.title} es lo más sólido de la presencia actual.`);
  }
  if (attentionPoints.length === 0) {
    const worst = Object.values(sections).sort((a, b) => a.score - b.score)[0];
    attentionPoints.push(`${worst.title} es el punto con más espacio de mejora.`);
  }

  const topPriorities = Object.values(sections)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((s) => s.quickWin);

  const closingTemplates: Record<Tier, string> = {
    low: "Cada uno de estos cambios es totalmente alcanzable, y el impacto en cómo te perciben tus clientes puede ser inmediato. — Valentina, fundadora de Growly",
    mid: "Ya tienes una base — con los ajustes correctos puedes dar el salto que separa a un negocio bueno de uno que domina su mercado. — Valentina, fundadora de Growly",
    high: "Tienes una presencia digital de la que pocos negocios en tu industria pueden presumir — sigamos construyendo sobre esa ventaja. — Valentina, fundadora de Growly",
  };

  return {
    overallScore,
    summary: summaryTemplates[tierFor(overallScoreNum)],
    sections,
    goodPoints,
    attentionPoints,
    topPriorities,
    closingMessage: closingTemplates[tierFor(overallScoreNum)],
  };
}
