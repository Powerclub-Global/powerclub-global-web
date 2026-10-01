import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "ethcc-10-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "EthCC is the strongest Ethereum-native room in Europe and a good bet for protocol teams, infrastructure vendors and DeFi or stablecoin projects that want developer and builder attention. Skip it if your audience is retail Bitcoin holders, mining operators or traditional-finance buyers, who are better served elsewhere.",
  costs: {
    ticket:
      "Published tiered waves for the 2027 edition: about EUR 390 early bird (Sep 15 to Oct 15, 2026), EUR 590 full pass, EUR 750 late pass and EUR 990 last call, with day passes from roughly EUR 200 to EUR 320. Check the official site for current wave.",
    note: "Cannes hotels and flights around the Palais des Festivals tend to cost more than the pass itself. Book early.",
  },
  attendees:
    "Mostly Ethereum developers, protocol and Layer 2 teams, DeFi and stablecoin builders, security researchers, investors and a growing regulation and RWA contingent. Organiser-reported for 2027: 8,000+ attendees, 500+ speakers, 150+ sponsors and partners, and 15,000+ people expected in Cannes overall.",
  sideEvents:
    "The side-event scene is large: the organiser lists 200+ side events for 2027. Hosts are mostly protocols, funds, auditors and community groups, running hacker houses, dinners, panels and parties across Cannes. Most are found through Luma pages, protocol announcements on X and word of mouth, and the popular ones fill up weeks ahead. For a small team, a well-run side event often does more than a booth.",
  worthItFor: [
    "Ethereum, L2 and DeFi teams recruiting developers or finding integration partners",
    "Infrastructure, security and tooling vendors selling to builders",
    "Funds and researchers who want many founder meetings in four days",
    "Teams with a clear stablecoin, RWA or privacy story",
  ],
  skipIf: [
    "Your buyers are enterprises or banks rather than builders",
    "Your story is Bitcoin-only or mining-focused",
    "You have no plan for side events and expect the main hall to do the work",
    "You need guaranteed US-market reach",
  ],
  pcgAngle:
    "PCG does not claim attendance, partnership or credentials at EthCC. PCG's only media-partner event is Bitcoin 2025, and we track EthCC as part of the wider conference calendar. For a client heading there we advise on booth versus side event versus speaking slot, explain how media-partner credentials work and what they do and do not unlock, and plan the 30-day follow-up so the meetings turn into pipeline.",
  sources: [
    { label: "EthCC official site (dates, tickets, organiser figures)", url: "https://ethcc.io/" },
  ],
};

export default guide;
