export const GA_MEASUREMENT_ID = "G-T1NR9RFKX4";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const pageview = (url: string) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
};

export const event = (
  action: string,
  params?: Record<string, string | number | boolean | undefined>
) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
};

/** Conversion helpers — mark these as conversions in GA4 Admin if needed */
export const trackContactFormSubmit = () =>
  event("contact_form_submit", { event_category: "conversion" });

export const trackWhatsAppClick = () =>
  event("whatsapp_click", { event_category: "conversion" });

export const trackPhoneClick = () =>
  event("phone_call_click", { event_category: "conversion" });

export const trackEmailClick = () =>
  event("email_click", { event_category: "conversion" });
