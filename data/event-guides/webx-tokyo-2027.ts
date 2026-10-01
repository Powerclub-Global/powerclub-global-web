import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "webx-tokyo-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Worth it for Web3 and exchange teams that want Japanese enterprise, financial-institution and government contacts, where WebX is the main local stage. Skip it if you need a global crypto-native crowd or cannot work with Japanese partners; local relationships and language matter more here than at Western shows.",
  costs: {
    ticket:
      "Estimate: from under $100 for a booth or exhibitor-hall pass to roughly $150 for a business pass, and about $3,500 for a VIP pass, based on the 2026 edition's listing. 2027 prices were not found.",
    note: "Ticket numbers are from the 2026 edition and may change for the larger 2027 venue.",
  },
  attendees:
    "The organiser describes attendees as major enterprises, technology companies, financial institutions, investors, developers, media and experts from Japan and abroad. The 2026 lineup featured Japan's Prime Minister Sanae Takaichi alongside BlackRock, Goldman Sachs, Uniswap Labs and Japanese financial institutions. We did not find an organiser-reported attendee count we could verify.",
  sideEvents:
    "WebX runs official side events itself: the 2026 edition had a VIP and Speaker Night at the venue hotel and an official after-party at a Tokyo club. Beyond those, we did not find a documented third-party side-event circuit comparable to Bitcoin or TOKEN2049. The useful routes are the organiser's own VIP and party passes, hosted dinners with Japanese partners, and meetings arranged through CoinPost.",
  worthItFor: [
    "Exchanges, wallets and infrastructure firms entering Japan",
    "Teams seeking Japanese financial-institution and corporate partners",
    "Companies tracking Japanese Web3 policy with government speakers",
    "Founders who can arrange meetings in advance through local partners",
  ],
  skipIf: [
    "You need a large side-event scene for informal networking",
    "You have no Japan strategy or local contact",
    "You want a bitcoin-focused audience",
    "You need confirmed 2027 prices and programme before booking",
  ],
  pcgAngle:
    "PCG has no established attendance at, partnership with, or credentials for WebX. We track it, including the move to Tokyo Big Sight announced for 2027. For a client heading there we would advise on booth versus side event versus speaking, the realistic credential routes through the organiser's media-partner tier, and we run the 30-day follow-up. PCG's only media-partner event to date is Bitcoin 2025.",
  sources: [
    { label: "WebX official site", url: "https://webx-asia.com/" },
    { label: "WebX 2026 ticket page", url: "https://webx-asia.com/ticket/" },
  ],
};

export default guide;
