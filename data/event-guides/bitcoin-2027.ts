import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "bitcoin-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Worth it for bitcoin companies, miners, funds and media that want the biggest single room of the community, and for anyone who can use the side-event circuit. Skip the main show floor if you are an early-stage team without a booth budget: the value for small teams is usually in the side events around it.",
  costs: {
    ticket:
      "Estimate: general admission roughly $200 to $400, Pro Pass roughly $500 to $1,000, Whale Pass roughly $3,600 to $5,000. Sources disagree on 2027 prices, so confirm on the official ticket page. For reference, the 2026 Las Vegas edition listed general admission at $699 and the Whale Pass at $12,999 (these were increased from earlier tiers). Bulk discounts of 10 to 15% are listed for groups.",
    note: "Separate After Hours passes (about $99 to $149 in the listings we saw) cover official parties.",
  },
  attendees:
    "Organiser-reported: 20,000+ annual attendees, 500+ unique speakers a year, and participants from every continent; a ticketing aggregator cites 25,000+ attendees, 300 exhibitors and 300 speakers, which we could not confirm with the organiser. Audience mix is founders, investors, miners, developers, policy and government speakers, media and a large retail bitcoin community. Past speakers listed on the site include US political figures and well-known bitcoin executives.",
  sideEvents:
    "This is the strongest side-event scene of the five. Around Bitcoin conferences, exchanges, miners, funds and media brands host dinners, parties, panels and happy hours, often announced on X, Luma and sponsor channels in the weeks before. The PCG press archive has written up the side events at Bitcoin 2025 in Las Vegas. Nashville is a new host city for this event, so the 2027 side-event map will form late; expect it to follow the same pattern.",
  worthItFor: [
    "Bitcoin miners, custodians, exchanges and funds meeting peers and press",
    "Companies with a product launch and a booth budget",
    "Teams that plan side events or dinners around the main show",
    "Media and content teams looking for speakers and clips",
  ],
  skipIf: [
    "You are early-stage with no meetings booked and no booth budget",
    "Your audience is institutional TradFi rather than bitcoin natives",
    "You expect quiet, structured meeting time; the show floor is busy",
    "You need confirmed pricing and venue details today; sources conflict",
  ],
  pcgAngle:
    "PCG's only media-partner event is Bitcoin 2025, and the press archive carries its coverage, including the side-event write-up. That is a 2025 relationship, and we have no established partnership, attendance or credentials for Bitcoin 2027. For a client heading to Nashville we would advise on booth versus side event versus speaking, whether credentials via media partnership are available, and we run the 30-day follow-up.",
  sources: [
    { label: "Bitcoin 2027 official site", url: "https://2027.b.tc/" },
    { label: "Bitcoin Conference ticketing", url: "https://tickets.b.tc/event/bitcoin-2027" },
    { label: "Bitcoin 2026 pass types (prior edition)", url: "https://2026.b.tc/attend" },
    { label: "PCG press archive: Bitcoin 2025 side events", url: "https://powerclubglobal.com/press/side-events-empowering-industry-game-changers-at-bitcoin-2025-las-vegas" },
  ],
};

export default guide;
