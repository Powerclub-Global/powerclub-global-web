import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "agntcon-mcpcon-na-2026",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "AGNTCon + MCPCon is worth it for engineers, platform and security teams, and open-source maintainers building on agent protocols, and it is cheap for what it offers. Skip it if you are looking for a buyer-heavy executive crowd or a party scene: this is a developer and community conference.",
  costs: {
    ticket:
      "Standard attendee registration is about US$475, rising to about US$925 for late registration from October 8, 2026. Academic and Expo plus Party passes are about US$149. Member and group discounts exist. Estimates from the organiser's registration page as reported.",
    note: "Registration figures were reported via third-party summaries of the official page. Sponsorship prices are not public. Confirm before budgeting.",
  },
  attendees:
    "Organiser-reported for 2026: 3,500+ attendees from 1,000+ organisations, 150+ talks across 11 tracks and 7 free workshops. Attendees are developers and contributors, engineers building agentic applications, platform and security teams and project maintainers. Sponsors include AWS, Google Cloud and Anthropic.",
  sideEvents:
    "Not a side-event conference in the crypto sense. The programme is largely in-venue: workshops, poster presentations, a demo theater and community gatherings at San Jose McEnery Convention Center, plus an Expo and Party pass. Useful off-site routes are hosted dinners and meetups with Bay Area developer communities, and direct outreach to maintainers beforehand. I did not find a large independent side-event calendar.",
  worthItFor: [
    "Teams shipping MCP servers, agent frameworks or agent security tooling",
    "Developer-relations leads wanting maintainer and contributor access",
    "Enterprises evaluating agent governance and standards",
    "Startups that can use the Startup sponsorship tier or a demo slot",
  ],
  skipIf: [
    "You want C-suite buyers; the audience is mostly technical",
    "You have no technical staff to send",
    "You need a networking-party scene around the venue",
    "You can get the same talks on video later and have no one to meet",
  ],
  pcgAngle:
    "PCG tracks this event, but no PCG attendance or partnership is established, and we hold no credentials for it. Our only media-partner event on record is Bitcoin 2025. For clients heading to San Jose we advise on route: a sponsor tier or demo slot versus a talk submission versus a hosted community evening, and a 30-day follow-up. We have no recap of a past edition in the PCG press archive; this is a first edition.",
  sources: [
    { label: "AGNTCon + MCPCon NA", url: "https://events.linuxfoundation.org/agntcon-mcpcon-north-america/" },
    { label: "Registration", url: "https://events.linuxfoundation.org/agntcon-mcpcon-north-america/register/" },
  ],
};
export default guide;
