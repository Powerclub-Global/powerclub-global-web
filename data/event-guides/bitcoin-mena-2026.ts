import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "bitcoin-mena-2026",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Bitcoin MENA is the Bitcoin-specific event for the Gulf, run by BTC Inc, and it suits Bitcoin companies, miners and treasury-minded corporates who want regional government and capital contact. Skip it if you are an altcoin or general Web3 project, since the crowd is Bitcoin-first.",
  costs: {
    ticket:
      "Listed on the official site: General Admission $21, Pro Pass $299, Whale Pass $2,999, before fees. The site says prices will rise.",
    note: "Pass prices are from the official site and the Eventbrite listing and may change.",
  },
  attendees:
    "Bitcoin companies, miners, exchanges, investors, and government and sovereign-linked figures from the Gulf. The organiser-reported figure for 2026 is 12,000+ attendees and 190+ speakers. The organiser's site still highlights the 2025 lineup, which included Michael Saylor, CZ and UAE and Pakistani officials.",
  sideEvents:
    "A smaller scene than the crypto-wide events, but present: Bitcoin-focused dinners, mining and treasury meetups, and sponsor receptions in Abu Dhabi, largely invite-only. The event overlaps with GITEX Global in Dubai (December 7-11), which pulls some of the same visitors, so many people split their week. Side events are usually found through BTC Inc channels, X and sponsors.",
  worthItFor: [
    "Bitcoin miners and mining-service firms looking at Gulf capital and energy partners",
    "Bitcoin companies wanting government and sovereign-fund contact",
    "Bitcoin-treasury advisors, using the Day 1 Pro Pass enterprise content",
    "Teams already in the Gulf who want a regional anchor event",
  ],
  skipIf: [
    "You are not Bitcoin-focused",
    "You need a big retail audience",
    "You cannot pick between this and GITEX in the same week without a clear plan",
  ],
  pcgAngle:
    "PCG does not attend or hold credentials for Bitcoin MENA, and our only media-partner event is Bitcoin 2025. PCG did publish a piece in the archive on the Middle East debut of the BTC Inc conference in Abu Dhabi (\"World's largest Bitcoin conference makes Middle East debut in Abu Dhabi\"). For clients heading there, we would advise on booth versus side event versus speaking, note that BTC Inc media partnerships are how press credentials are usually arranged, and plan the 30-day follow-up.",
  sources: [
    { label: "Bitcoin MENA official site", url: "https://mena.b.tc/" },
    { label: "Bitcoin MENA 2026 tickets (Eventbrite)", url: "https://www.eventbrite.com/e/bitcoin-mena-conference-2026-tickets-1988509437256" },
    { label: "PCG press archive: Bitcoin conference Middle East debut", url: "https://powerclubglobal.com/press/worlds-largest-bitcoin-conference-makes-middle-east-debut-in-abu-dhabi" },
  ],
};

export default guide;
