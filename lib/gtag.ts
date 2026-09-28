export const GA_TRACKING_ID = "G-V7HY5PZW79";

// GA only runs on the production build so local dev sessions never pollute
// the property (localhost referrers were showing up in reports).
export const GA_ENABLED = process.env.NODE_ENV === "production";

const hasGtag = () => GA_ENABLED && typeof window !== "undefined" && typeof window.gtag === "function";

// Tracking page views
export const pageview = (url: string) => {
  if (!hasGtag()) return;
  window.gtag("event", "page_view", { page_path: url });
};

// Tracking custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (!hasGtag()) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Conversion events. These names are registered as key events in GA4 —
// keep them in sync with the property configuration.
export type ConversionEvent =
  | "discovery_call_submit"
  | "general_call_submit"
  | "contact_submit"
  | "newsletter_signup"
  | "cta_click";

export const track = (name: ConversionEvent, params: Record<string, string | number | boolean | undefined> = {}) => {
  if (!hasGtag()) return;
  window.gtag("event", name, params);
};
