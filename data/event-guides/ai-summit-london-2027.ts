import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "ai-summit-london-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Worth it for enterprise AI vendors and consultancies that want UK and European buyers, and for anyone who can pair it with London Tech Week's fringe programme. Skip it if you are a small team without a meeting plan: delegate passes are expensive and the exhibition is crowded with large sponsors.",
  costs: {
    ticket:
      "Estimate: about GBP 2,500 to 2,800 plus VAT for a full delegate or solution-provider pass, GBP 749 plus VAT for start-up, academic and government rates, and around GBP 100 plus VAT for a one-day expo-only pass. These figures are from the 2026 edition's pricing page; 2027 pricing is not yet published and the site asks you to register interest.",
    sponsorship:
      "Not published. Sponsorship is by private prospectus. The 2026 edition listed IBM, AWS, EY, KPMG, HPE and NICE among its sponsors, which indicates the top tiers are priced for large enterprise budgets.",
    note: "The organiser also sells a solution-provider pass aimed at vendors, with curated one-to-one buyer meetings.",
  },
  attendees:
    "Organiser-reported for the 2026 edition: over 5,000 attendees, 300+ speakers and 100+ sponsors and exhibitors across 10 stages and 14 tracks. The programme includes an investor and start-up area and a skills track. Expect enterprise technology and data leaders, consultancies, public-sector and NHS buyers (the discounted tiers suggest they are courted), and AI start-ups. 2027 is billed as the ten-year edition at Tobacco Dock.",
  sideEvents:
    "London Tech Week runs the same fortnight, and its site hosts a fringe event calendar with hundreds of partner-run sessions, receptions, pitch events and meetups. Whether the AI Summit sits inside London Tech Week is unclear from the AI Summit's own site, which does not mention it, so treat them as overlapping rather than the same event. The practical route for a client is to book a fringe slot or host a dinner while buyers are in town, and check the 2027 fringe calendar once it opens.",
  worthItFor: [
    "Enterprise AI and data vendors targeting UK and European buyers",
    "Consultancies and integrators looking for partner introductions",
    "Start-ups that qualify for the discounted tier and want investor access",
    "Teams combining the Summit with London Tech Week fringe events",
  ],
  skipIf: [
    "You sell to crypto or Web3 buyers",
    "You need a quiet room; this is a large, multi-stage show",
    "You cannot commit to meeting prep beforehand",
    "You are on a tight budget and cannot justify a four-figure pass",
  ],
  pcgAngle:
    "PCG has no established attendance at, partnership with, or credentials for The AI Summit London. We track it on the AI calendar. For a client heading there we would advise on whether an expo booth, a London Tech Week fringe event or a speaking slot gives better return, whether credentials via a media partnership are realistic, and we run the 30-day follow-up. PCG's only media-partner event to date is Bitcoin 2025.",
  sources: [
    { label: "The AI Summit London official site", url: "https://london.theaisummit.com/" },
    { label: "AI Summit London passes and pricing (2026 edition)", url: "https://london.theaisummit.com/passes-pricing/" },
    { label: "London Tech Week fringe events", url: "https://londontechweek.com/fringe-events-calendar" },
  ],
};

export default guide;
