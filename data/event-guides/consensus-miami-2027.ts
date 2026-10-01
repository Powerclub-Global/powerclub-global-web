import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "consensus-miami-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Consensus is the best US room for reaching institutions, policy people and mainstream crypto press at once, so it suits regulated firms, infrastructure vendors and projects with a US story. Skip it if you are an early-stage team that cannot afford the passes and hotels, or if you only want builders and developers.",
  costs: {
    ticket:
      "Estimate based on the 2026 Miami edition, since 2027 pricing is not on the homepage: Pro pass roughly USD 800 to 1,000, Platinum roughly USD 1,400 to 1,800, with early-bird discounts. Third-party listings disagree, so confirm on the official site.",
    sponsorship:
      "Not published. Sponsorship is handled through the organiser's sponsor enquiry process; there is no public rate card.",
    note: "Miami Beach hotel prices during event week are high. Book early.",
  },
  attendees:
    "Senior people from crypto firms, asset managers, banks, exchanges, custodians, law firms and policy groups, plus a large press presence. Organiser-reported: 15,000+ senior leaders from 100+ countries for 2027, and the organiser said the 2026 edition drew finance firms managing USD 87 trillion in assets. Treat both as organiser claims.",
  sideEvents:
    "Consensus has a heavy side-event scene in Miami, run by exchanges, funds, law firms and protocols as dinners, receptions, panels and parties. I could not find an official count for 2027. They are found through Luma pages, host announcements and personal invitations. The PCG press archive has write-ups of side events at the Toronto and Hong Kong editions of Consensus in 2025.",
  worthItFor: [
    "Regulated firms and institutional vendors meeting banks and asset managers",
    "Projects with a US market, policy or compliance story",
    "Teams that want CoinDesk coverage or press meetings",
    "Companies with budget for a hosted dinner or reception",
  ],
  skipIf: [
    "You want a developer-first crowd",
    "Your budget covers a pass but not hospitality",
    "You do not sell to institutions or regulators",
    "You expect booth traffic alone to produce leads",
  ],
  pcgAngle:
    "PCG does not claim attendance, partnership or credentials at Consensus Miami. PCG's only media-partner event is Bitcoin 2025. Past Consensus editions in Toronto and Hong Kong are written up in the PCG press archive. For clients heading there we advise on booth versus side event versus speaking, how media-partner credentials work, and the 30-day follow-up.",
  sources: [
    { label: "Consensus Miami 2027 official site", url: "https://consensus.coindesk.com/" },
    { label: "Consensus Miami 2026 ticket listing (third party)", url: "https://www.coingabbar.com/en/crypto-blogs-details/consensus-miami-2026-dates-venue-tickets-guide" },
    { label: "PCG press archive: side events at Consensus Toronto 2025", url: "https://powerclubglobal.com/press/the-rise-of-deai-and-side-events-at-consensus-toronto-2025" },
  ],
};

export default guide;
