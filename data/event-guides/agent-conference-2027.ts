import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "agent-conference-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Worth it for AI-agent vendors and founders who want to meet enterprise buyers (CTOs, CISOs, Chief AI Officers) in a single New York hotel over two days. Skip it if your product has nothing to do with enterprise AI, or if you need a crypto or policy audience; this is an enterprise-software room, not a Web3 one.",
  costs: {
    ticket:
      "Estimate: roughly $1,300 to $1,700 per person for full access. The official 2027 ticket page lists an early-bird full pass at $1,699 and approval-gated tiers at $1,299 (Fortune 1000 VP and above, startup C-suite, AI technologists). A four-ticket team bundle is listed at $5,596. Fees are added on top.",
    note: "Prices are early-bird and will likely rise closer to the event. Hotel room blocks at the Hilton were offered for the 2026 edition; check whether 2027 has one.",
  },
  attendees:
    "Organiser-reported for 2027: 4,000+ attendees, 100+ exhibitors and 100+ speakers across ten tracks (agentic enterprises, engineering, security, finance, healthcare, physical AI and others). The audience skews to senior enterprise roles: CEOs, CTOs, CFOs, CISOs and Chief AI Officers, plus AI founders, technologists and investors. The discounted ticket tiers are gated by role with LinkedIn verification, which suggests the organiser is actively screening for seniority. The organiser lists NYSE as a strategic partner and theCUBE and NYSE Wired as media partners.",
  sideEvents:
    "We could not find a published side-event programme for this conference. It is a single-venue, ticketed enterprise event at the Hilton Midtown, so expect the usual New York pattern of vendor-hosted dinners, investor breakfasts and rooftop receptions arranged by invitation and posted late on LinkedIn. The useful off-site routes are your own: book a restaurant or private room nearby for a small buyer dinner, and start inviting two to three weeks out.",
  worthItFor: [
    "AI-agent, security and infrastructure vendors selling to large enterprises",
    "Founders who qualify for the startup C-suite ticket and want buyer meetings",
    "Investors scouting agentic-AI startups in one room",
    "Teams that can send four people and use the bundle",
  ],
  skipIf: [
    "Your buyers are crypto funds, miners or Web3 teams",
    "You need government or regulator access rather than enterprise buyers",
    "You cannot staff the booth or follow up within a week of the event",
    "Your budget stops at a general-admission ticket and you have no meeting plan",
  ],
  pcgAngle:
    "PCG has no established attendance at, partnership with, or credentials for Agent Conference. We track it as part of the AI-events calendar. For a client heading there we would advise on the booth versus side event versus speaking choice (the open call for proposals is a cheaper route in than a booth), whether a media partnership could get credentials, and we run the 30-day follow-up so meetings do not go cold. PCG's only media-partner event to date is Bitcoin 2025.",
  sources: [
    { label: "Agent Conference official site", url: "https://www.agentconference.com/" },
    { label: "Agent Conference 2027 ticket page", url: "https://tickets.agentconference.com/agentconf2027/buy-tickets" },
    { label: "Agent Conference 2026 hotel info", url: "https://www.agentconference.com/hotelinfo" },
  ],
};

export default guide;
