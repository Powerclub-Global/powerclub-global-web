import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "humanx-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Worth it for AI vendors and startups that want pre-qualified enterprise buyers and VC meetings, since the matchmaking programmes are built into the event. Skip it if you are not selling to or raising from the AI ecosystem, or if you want a developer conference; the room is executives, sponsors and press.",
  costs: {
    ticket:
      "Estimate: the 2026 San Francisco pass was listed around $1,795. 2027 Las Vegas pricing was not on the pages we could read.",
    sponsorship:
      "Not published. HumanX sells sponsorship by prospectus; the organiser reports 400+ sponsors at the Las Vegas edition, so there are many tiers, but we have no public rate card.",
    note: "HumanX also runs a Europe event in Amsterdam (September 20-22, 2027). Note the 2026 US edition was in San Francisco; 2027 returns to Mandalay Bay.",
  },
  attendees:
    "Enterprise AI buyers, founders, VCs and senior functional leaders such as CIOs and chief AI officers. Organiser-reported for the 2027 programme: 12,000+ enterprise leaders across the Las Vegas and Amsterdam events combined, about 60% VP-level or above, 550+ speakers and 600+ journalists. The 2026 San Francisco edition was projected at 6,500+ attendees (organiser-reported, 2026).",
  sideEvents:
    "Largely organiser-run rather than a sprawling independent scene. Built-in formats include SolutionBridge (buyer-vendor matchmaking), VentureConnect (founder-investor meetings, organiser-reported 800+ meetings per event) and Peer [X]change roundtables. Sponsors also host their own dinners and receptions; those are mostly invite-only.",
  worthItFor: [
    "AI vendors who want scheduled buyer meetings, not walk-ups",
    "Startups raising and willing to use VentureConnect",
    "Executives wanting peer roundtables",
    "Companies wanting heavy press presence (600+ journalists claimed)",
  ],
  skipIf: [
    "You are an individual developer or researcher",
    "You cannot buy into the matchmaking programmes",
    "Your product is not AI-related",
    "You need a low-cost event",
  ],
  pcgAngle:
    "PCG tracks HumanX but has no established attendance, partnership or credentials, and we do not claim any. For clients heading to Las Vegas, we would use the organiser's matchmaking first, a sponsor dinner second, and a booth only with a clear buyer list. Press credentials come via the organiser's media process. We help with pre-event meeting planning and the 30-day follow-up.",
  sources: [
    { label: "HumanX official site", url: "https://www.humanx.co/" },
    { label: "HumanX US ticket FAQ", url: "https://support.humanx.co/article/16-what-is-the-ticket-price" },
    { label: "Trade Show Executive on HumanX", url: "https://tradeshowexecutive.com/5-ways-humanx-is-changing-the-game-for-ai-events/" },
  ],
};

export default guide;
