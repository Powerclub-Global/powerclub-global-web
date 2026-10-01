import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "smartcon-2026",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "SmartCon is worth it for tokenisation, oracle, bank and capital-markets teams who want to be in the room with Chainlink's institutional partners. Skip it if you have no tie to the Chainlink ecosystem: it is one company's conference, and dates for 2026 are not confirmed on the official site.",
  costs: {
    ticket:
      "Not published for 2026. The official site currently shows only the 2025 edition.",
    sponsorship:
      "Not published. No public rate card; 2025 sponsors are listed on the site but pricing is by private prospectus from Chainlink Labs.",
    note: "No 2026 pricing is available. Check the official site once dates are announced.",
  },
  attendees:
    "No 2026 figures available. The organiser positions the event around banks, capital markets institutions and Web3 builders working on oracles, tokenisation and onchain finance. I could not verify an attendance number for any year from the official page.",
  sideEvents:
    "Unconfirmed for 2026. The 2025 edition ran at the Metropolitan Pavilion in New York, and New York has a general crypto and tokenisation scene with hosted dinners that cluster around such events. I could not support specifics, so treat side-event planning as something to confirm once the official programme is out.",
  worthItFor: [
    "Tokenisation and RWA teams building on or integrating with Chainlink",
    "Bank and asset-manager innovation teams scouting oracle and settlement infrastructure",
    "Ecosystem projects wanting visibility with Chainlink Labs",
  ],
  skipIf: [
    "You have no Chainlink integration and no plan for one",
    "You need to budget now; no 2026 dates or prices are published",
    "You want a broad multi-sector crowd rather than an ecosystem event",
  ],
  pcgAngle:
    "PCG tracks this event, but no PCG attendance or partnership is established, and we hold no credentials for it. Our only media-partner event on record is Bitcoin 2025. For clients considering New York we advise on route once dates are confirmed: booth versus side event versus speaking, credentials via a media partnership where possible, and a 30-day follow-up. We have no recap of a past edition in the PCG press archive.",
  sources: [
    { label: "SmartCon official site", url: "https://smartcon.chain.link/" },
    { label: "SmartCon FAQ", url: "https://smartcon.chain.link/faq" },
  ],
};
export default guide;
