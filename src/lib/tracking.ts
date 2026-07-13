export function trackWhatsAppClick() {
  if (typeof window === "undefined") return;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof window.fbq === "function") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.fbq("track", "Lead");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.fbq("trackCustom", "WhatsAppClick");
  }
}
