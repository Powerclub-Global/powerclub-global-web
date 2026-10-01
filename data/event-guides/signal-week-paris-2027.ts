import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "signal-week-paris-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Worth it for digital-asset firms, custodians, funds and fintechs that want European institutional and regulatory contacts. Skip it if your audience is retail, mining or builder-focused; the pitch is TradFi meeting digital assets, and the room is suits rather than hackers.",
  costs: {
    ticket:
      "Not published. The Signal Week site routes visitors to a registration link and does not show prices in the pages we could read. Past Paris Blockchain Week editions used tiered, deadline-based pricing, so expect early-bird rates to rise.",
    note: "Do not budget from the 2026 edition's numbers until 2027 pricing appears.",
  },
  attendees:
    "Organiser-reported: more than 70% of attendees hold C-suite or investment decision-making roles; the 2026 Paris Blockchain Week reported about 7,500 attendees from 100+ countries, 320+ speakers and 360+ journalists. The site also cites figures from the 2025 edition (36,000+ meetings facilitated, $50T+ in assets under management represented, 389 government officials and policymakers). These are organiser claims. Expect banks, asset managers, exchanges, custodians, stablecoin issuers, regulators and the press.",
  sideEvents:
    "Paris Blockchain Week historically drew a large circuit of partner-hosted dinners, rooftop events and VIP evenings around the main programme, and the PCG press archive has written up side events for other conferences in the same style. For Signal Week the organiser lists its own companions: a VIP dinner, a CXO Summit and a Signal Week x FTMU fintech collaboration. The 2027 edition is also reported to run alongside the RAISE AI summit, which would widen the crowd. A published third-party side-event calendar for 2027 was not found.",
  worthItFor: [
    "Digital-asset infrastructure firms courting banks and asset managers",
    "Companies seeking European regulatory and policy conversations",
    "Founders who want press access; the organiser reports 360+ journalists at the 2026 edition",
    "Teams that can use the organiser's VIP dinner or CXO Summit for small-room meetings",
  ],
  skipIf: [
    "Your customers are retail traders or the bitcoin community",
    "You want a developer or hackathon crowd",
    "You have no clear institutional pitch",
    "You need confirmed prices before committing; none are published yet",
  ],
  pcgAngle:
    "PCG has no established attendance at, partnership with, or credentials for Signal Week or Paris Blockchain Week. We track the rebrand and its dates on the roadshow calendar. For a client heading there we would advise on booth versus side event versus a CXO-level speaking slot, whether credentials via a media partnership are realistic, and we run the 30-day follow-up. PCG's only media-partner event to date is Bitcoin 2025.",
  sources: [
    { label: "Signal Week official site", url: "https://signalweek.com/" },
    { label: "Paris Blockchain Week site (2026 edition, rebrand notice)", url: "https://www.parisblockchainweek.com/" },
    { label: "Coin Edition on the Signal Week rebrand", url: "https://coinedition.com/paris-blockchain-week-becomes-signal-week-europes-premier-institutional-digital-assets-summit-announces-strategic-elevation-and-new-identity/" },
  ],
};

export default guide;
