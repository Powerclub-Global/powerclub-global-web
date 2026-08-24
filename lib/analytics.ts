/**
 * PCG product analytics — event taxonomy and typed helpers.
 *
 * Every helper is a silent no-op when `NEXT_PUBLIC_POSTHOG_KEY` is unset, so
 * the site builds and runs identically with or without analytics configured.
 * Nothing here throws: a broken analytics call must never break a conversion.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * EVENT TAXONOMY (snake_case names, snake_case properties)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * `$pageview`          — fired manually by PostHogProvider on every App Router
 *                        navigation (autocapture pageviews are disabled).
 *                        props: `$current_url`
 *
 * `$pageleave`         — automatic (capture_pageleave: true).
 *
 * `cta_clicked`        — a user clicked a call-to-action that moves them toward
 *                        a conversion surface.
 *                        props:
 *                          `cta`         string  — label/id, e.g. "get_started"
 *                          `location`    string  — where it lives, e.g.
 *                                                  "home_hero", "navbar",
 *                                                  "cta_section", "contact_card"
 *                          `destination` string  — path or URL it leads to
 *
 * `form_started`       — first interaction with a conversion form (fired once
 *                        per form instance).
 *                        props:
 *                          `form`        string  — "contact" | "contact_inline"
 *                                                | "newsletter"
 *                                                | "discovery_call"
 *                                                | "sovereign_stack"
 *
 * `step_completed`     — a multi-step flow advanced.
 *                        props:
 *                          `form`        string  — flow id (as above)
 *                          `step`        string  — "questionnaire" | "slot"
 *                                                | "details"
 *                          `step_index`  number  — 1-based position
 *                          plus flow-specific context (e.g. `slot_selected`,
 *                          `scheduling_available`)
 *
 * `form_submitted`     — a conversion form was submitted successfully.
 *                        props:
 *                          `form`        string  — form id (as above)
 *                          `source_page` string  — pathname at submit time
 *                          plus form-specific context (`has_phone`,
 *                          `has_company`, `sms_consent`, `subject`, …)
 *                        Also carries flattened attribution (`first_utm_source`,
 *                        `last_utm_source`, `first_referrer`, …).
 *
 * `form_failed`        — a conversion form submission errored. Same props as
 *                        `form_submitted` plus `reason`.
 *
 * `booking_confirmed`  — a scheduling flow completed and the backend accepted it.
 *                        props:
 *                          `kind`        string  — "discovery_call"
 *                                                | "sovereign_stack"
 *                          `scheduling_available` boolean — false means the
 *                                                  submission was a degraded-mode
 *                                                  "we'll follow up" capture
 *                          `slot_selected`        boolean
 *                          `status`               string (backend-reported)
 *                          plus flow-specific context (`track`, `has_company`, …)
 *
 * Person identification: on any successful lead/booking submit we call
 * `posthog.identify(email, { name, company })` so the PostHog person maps 1:1
 * onto the CRM contact created by the same submission.
 */

import posthog from "posthog-js";
import { attributionProperties } from "./attribution";

export type FormId =
  | "contact"
  | "contact_inline"
  | "newsletter"
  | "discovery_call"
  | "sovereign_stack";

export type BookingKind = "discovery_call" | "sovereign_stack";

type Props = Record<string, unknown>;

/** Analytics is on only when a project key is configured at build time. */
export function analyticsEnabled(): boolean {
  return (
    typeof window !== "undefined" &&
    Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY)
  );
}

/** Fire-and-forget capture. Never throws, never blocks the caller. */
function capture(event: string, properties?: Props): void {
  if (!analyticsEnabled()) return;
  try {
    posthog.capture(event, properties);
  } catch {
    /* analytics must never break a conversion */
  }
}

export function trackPageview(url: string): void {
  capture("$pageview", { $current_url: url });
}

export function trackCtaClick(args: {
  cta: string;
  location: string;
  destination: string;
}): void {
  capture("cta_clicked", {
    cta: args.cta,
    location: args.location,
    destination: args.destination,
  });
}

export function trackFormStart(form: FormId, properties?: Props): void {
  capture("form_started", { form, ...properties });
}

export function trackStepCompleted(
  form: FormId,
  step: string,
  properties?: Props,
): void {
  capture("step_completed", { form, step, ...properties });
}

export function trackFormSubmit(form: FormId, properties?: Props): void {
  capture("form_submitted", {
    form,
    ...attributionProperties(),
    ...properties,
  });
}

export function trackFormFailed(
  form: FormId,
  reason: string,
  properties?: Props,
): void {
  capture("form_failed", { form, reason, ...properties });
}

export function trackBookingConfirmed(args: {
  kind: BookingKind;
  schedulingAvailable: boolean;
  slotSelected: boolean;
  status?: string;
  [key: string]: unknown;
}): void {
  const { kind, schedulingAvailable, slotSelected, status, ...rest } = args;
  capture("booking_confirmed", {
    kind,
    scheduling_available: schedulingAvailable,
    slot_selected: slotSelected,
    status: status ?? "confirmed",
    ...attributionProperties(),
    ...rest,
  });
}

/**
 * Link the PostHog person to the CRM lead. Called on successful submit so the
 * distinct_id becomes the email that identifies the crm_contact.
 */
export function identifyLead(
  email: string,
  properties?: { name?: string; company?: string; [key: string]: unknown },
): void {
  if (!analyticsEnabled()) return;
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@")) return;
  try {
    const clean: Props = { email: normalized };
    for (const [k, v] of Object.entries(properties ?? {})) {
      if (v !== undefined && v !== null && v !== "") clean[k] = v;
    }
    posthog.identify(normalized, clean);
  } catch {
    /* identification is best-effort */
  }
}
