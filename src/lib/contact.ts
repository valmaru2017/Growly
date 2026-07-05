// TODO: replace with Growly's real WhatsApp number before launch.
export const WHATSAPP_NUMBER = "10000000000";

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
