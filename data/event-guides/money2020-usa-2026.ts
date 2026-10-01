import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "money2020-usa-2026",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Money20/20 USA is worth it for payments, banking-tech and stablecoin companies selling to banks, processors and retailers, because the buyers really are in the building. It is expensive, so skip it if you are an early-stage team without a meetings list, or a crypto-native project that expects a crypto crowd.",
  costs: {
    ticket:
      "Roughly US$3,600 early to about US$4,200 close to the event; one listing shows a standard pass at about US$4,049. Group discounts of about US$299 per pass for three or more are reported. Estimates; prices rise in tiers.",
    note: "Pass prices are from third-party listings; the organiser uses a pass picker. Sponsorship is by application. Confirm before budgeting.",
  },
  attendees:
    "Organiser-reported for 2026: 11,000+ senior attendees, 3,400+ companies, 85+ countries, 630+ speakers, 320+ media and analysts, and one in three at C-suite level. The mix is large banks, fintechs, payment technology firms, retailers and investors. Crypto is one track among several, alongside agentic AI, fraud and regulation.",
  sideEvents:
    "There is a side-event scene, but it is mostly hosted by sponsors and vendors as dinners, receptions and hospitality suites in Las Vegas, plus the organiser's own evening programme (Money By Night). I could not confirm a large independent public side-event calendar like those around crypto weeks. The most useful off-floor route is the Money20/20 Connect meeting platform and private dinners arranged directly with target accounts.",
  worthItFor: [
    "Payments and banking-infrastructure vendors with named bank or retailer targets",
    "Stablecoin and tokenised-payments firms wanting traditional finance buyers",
    "Teams that can book 1:1 meetings through the Connect platform beforehand",
    "Investors tracking fintech deal flow",
  ],
  skipIf: [
    "Your budget stops at the ticket; the pass alone is several thousand dollars",
    "You want a crypto-native audience",
    "You have no enterprise sales team to run follow-up",
    "Your product is consumer-facing with no B2B channel",
  ],
  pcgAngle:
    "PCG tracks this event, but no PCG attendance or partnership is established, and we hold no credentials for it. Our only media-partner event on record is Bitcoin 2025. For clients heading to Las Vegas we advise on route: booth versus side event versus speaking, whether a media pass is realistic, and a 30-day follow-up. We have no recap of a past edition in the PCG press archive.",
  sources: [
    { label: "Money20/20 USA", url: "https://us.money2020.com/" },
    { label: "Money20/20 USA pass prices", url: "https://us.money2020.com/attend/passes" },
  ],
};
export default guide;
