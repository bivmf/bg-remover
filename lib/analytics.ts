export type AnalyticsEvent =
  | "background_remover_upload_started"
  | "background_remover_upload_completed"
  | "background_remover_processing_completed"
  | "background_remover_processing_failed"
  | "background_remover_download"
  | "background_remover_reset"
  | "background_remover_avery_cta_click";

export function trackEvent(event: AnalyticsEvent, properties: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("avery:analytics", { detail: { event, properties } }));
  // Integration point: forward this typed payload to GA4 or Adobe Analytics.
}
