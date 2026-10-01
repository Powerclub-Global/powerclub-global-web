import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "token2049-dubai-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "TOKEN2049 Dubai is a deal-making event for exchanges, funds, market makers and project founders who want Middle East and Asian counterparties in one place, and the side-event scene is the real product. Skip it if you need a quiet, technical room, or if you cannot commit to a week of evening events on top of the two conference days.",
  costs: {
    ticket:
      "Estimate from past editions, not the 2027 rate card: early bird roughly USD 500 to 800, general admission roughly USD 1,000 to 1,500, VIP from about USD 3,000. The official site currently advertises Super Early Bird pricing without listing figures.",
    note: "Dubai side-event hospitality and hotels during the event week are the larger hidden cost.",
  },
  attendees:
    "Founders, exchange and trading-firm staff, venture and fund managers, market makers, protocol teams and a growing group of regulators and corporates from the Gulf. Organiser-reported for 2027: 15,000+ attendees from 4,000+ companies in 160+ countries, 200+ speakers, 200+ exhibitors and over 70% C-level. These are organiser claims and not independently audited.",
  sideEvents:
    "The organiser lists 500+ side events, and the official site has a Side Quests page for them. Hosts are exchanges, funds, market makers and protocols; formats are dinners, yacht and rooftop parties, investor roundtables and hackathons. Entry is usually by Luma registration or invitation, with the best ones capped. The PCG press archive carries a written-up piece on side events at TOKEN2049 Dubai.",
  worthItFor: [
    "Exchanges, funds and market makers looking for Gulf and Asian counterparties",
    "Founders raising money who can book investor meetings in advance",
    "Companies with budget to host or co-host a side event",
    "Teams exploring UAE licensing or regional expansion",
  ],
  skipIf: [
    "You want deep technical sessions rather than networking",
    "Your marketing budget stops at a pass and a booth",
    "You have no meetings booked before you land",
    "You are early stage and cannot cover Dubai hotel prices",
  ],
  pcgAngle:
    "PCG does not claim attendance, partnership or credentials at TOKEN2049 Dubai. PCG's only media-partner event is Bitcoin 2025. Past TOKEN2049 Dubai side events are written up in the PCG press archive. For a client heading there we compare booth, side event and speaking options, explain what media-partner credentials can and cannot get you, and plan the 30-day follow-up.",
  sources: [
    { label: "TOKEN2049 Dubai official page", url: "https://www.token2049.com/dubai" },
    { label: "TOKEN2049 Dubai side quests", url: "https://token2049.com/dubai/side-quests" },
    { label: "PCG press archive: side events at TOKEN2049 Dubai", url: "https://powerclubglobal.com/press/groundbreaking-side-events-at-token2049-dubai" },
  ],
};

export default guide;
