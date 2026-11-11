/**
 * Minimal, vendor-neutral conversion tracking.
 *
 * Every event goes into `window.dataLayer` (the standard GTM queue). Nothing
 * leaves the browser unless Google Tag Manager is configured (PUBLIC_GTM_ID)
 * and the visitor has accepted the consent banner; GTM then replays the queue
 * and maps events to GA4 / Google Ads conversions inside the container.
 *
 * Events (GA4-style snake_case):
 *   whatsapp_click   {location, topic}   any [data-track="whatsapp_click"] link
 *   email_click      {location}
 *   instagram_click  {location}
 *   phone_click      {location}
 *   quote_start      {location}          first interaction with the quote form
 *   generate_lead    {topic}             quote form sent successfully
 *   service_view     {service_group}     a service page was viewed
 */
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export type TrackEvent =
  | 'whatsapp_click'
  | 'email_click'
  | 'instagram_click'
  | 'phone_click'
  | 'quote_start'
  | 'generate_lead'
  | 'service_view';

export function track(event: TrackEvent | string, params: Record<string, string> = {}): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

let initialized = false;

export function initTracking(): void {
  if (initialized) return;
  initialized = true;

  // Delegated click tracking: <a data-track="whatsapp_click" data-track-location="hero">.
  document.addEventListener(
    'click',
    (e) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
      if (!el) return;
      const params: Record<string, string> = {};
      if (el.dataset.trackLocation) params.location = el.dataset.trackLocation;
      if (el.dataset.trackTopic) params.topic = el.dataset.trackTopic;
      track(el.dataset.track!, params);
    },
    { capture: true },
  );

  const pageEvent = document.body.dataset.pageEvent;
  if (pageEvent) {
    try {
      const { name, params } = JSON.parse(pageEvent) as {
        name: string;
        params?: Record<string, string>;
      };
      track(name, params ?? {});
    } catch {
      /* malformed attribute: ignore */
    }
  }
}
