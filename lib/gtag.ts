// GA4 measurement id. Env-driven so it can be swapped per environment; the
// literal is the historical production value and stays as the fallback so
// nothing breaks before the Vercel env var is set.
export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-V7HY5PZW79";

// Tracking page views
export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
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
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
