import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "web-summit-2026",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Worth it for startups that want investor and press exposure, and for companies hiring or selling across European tech broadly. Skip it if you want a crypto-specific audience: Web3 is a minor strand in a very large general tech show, and a crypto-only message gets lost.",
  costs: {
    ticket:
      "Estimate from published pricing: general tickets about EUR 895-995, premium passes from about EUR 1,585, executive-level passes reported at EUR 4,000+.",
    sponsorship:
      "Startup exhibition packages start at about EUR 495 (one-day rotating booth, via the Alpha, Beta and Growth programmes). Larger exhibition space is quoted privately; third-party sources put standard space around US$40,000 and up, which we could not verify from the organiser. Hosting a 100-200 guest side event has a median of about EUR 8,500 excluding VAT, per CH3 data.",
  },
  attendees:
    "Startup founders, investors, corporate innovation teams, large-tech and media staff, and a lot of press. Organiser-reported figures: 71,386 attendees from 157 countries and 2,725 startup exhibitors in 2025; 2026 is expected at 70,000+. Crypto is a small slice of that.",
  sideEvents:
    "Large and crowded. CH3 tracked about 250 side events by 2024, up from 45 in 2021, and estimates they capture only a small share of after-hours attention, so standing out takes effort. Hosts include VCs, agencies, ecosystems and companies; formats are dinners, rooftop drinks and panels. People find them through Luma, host mailing lists, WhatsApp groups and word of mouth on the Web Summit app.",
  worthItFor: [
    "Startups seeking European investors and press",
    "Companies with a broad tech story, where AI or fintech leads and crypto is one angle",
    "Teams recruiting across Europe",
    "Sponsors who can run a hosted dinner or small curated event",
  ],
  skipIf: [
    "You only want crypto-native contacts",
    "Your budget is under what a booth, travel and Lisbon November hotels cost",
    "You are expecting private, high-trust meetings on the main floor",
  ],
  pcgAngle:
    "PCG tracks Web Summit as a general tech event adjacent to Web3. We have no media partnership here and no PCG attendance is established. For clients, the usual advice is a hosted side event or a targeted meeting programme over a main-floor booth unless you are a startup using the cheap package. Press credentials come via the organiser's press process or a media partnership. We run the 30-day follow-up afterwards.",
  sources: [
    { label: "Web Summit", url: "https://websummit.com/" },
    { label: "CH3: Web Summit attendance and costs", url: "https://www.ch3.agency/conferences/web-summit/" },
  ],
};

export default guide;
