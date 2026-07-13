export const trackWhatsAppClick = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.fbq?.('track', 'Lead', {
    value: 20.00,
    currency: 'USD',
    content_name: 'WhatsApp KIT Click'
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.fbq?.('track', 'Contact');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.fbq?.('trackCustom', 'WhatsAppClick');
};
