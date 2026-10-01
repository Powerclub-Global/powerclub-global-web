import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "solana-breakpoint-2026",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Worth it for Solana ecosystem teams, wallets, infrastructure and payments firms, and for anyone wanting to meet the institutions Solana is courting in Europe. Skip it if you have no Solana angle: this is the ecosystem's own conference, and non-Solana projects will struggle to get attention.",
  costs: {
    ticket:
      "Estimate from the official page: General Admission about US$550, Developers about US$250, Students about US$100, Late Bird about US$800.",
  },
  attendees:
    "Developers, ecosystem founders, wallet and infrastructure teams, investors, and a growing institutional and fintech group. Coverage cites an expectation of 8,000+ attendees from 100+ countries; this is organiser-side pre-event reporting for 2026, not a verified count. The official page points to institutions such as J.P. Morgan, Goldman Sachs, BlackRock, State Street and Citigroup having used the network.",
  sideEvents:
    "Strong scene. Solana Developers announced a London Hacker House running from late October to mid-November, and ecosystem teams typically host dinners, parties and builder events in the week. The official site has application forms for sponsors, speakers, press and creators. Find side events via the Breakpoint Luma page, Solana ecosystem accounts on X, and Telegram groups. Blockworks' Digital Asset Summit London (Nov 10-11) sits the week before, so a combined London trip is realistic.",
  worthItFor: [
    "Solana wallets, DeFi, payments and infrastructure teams",
    "Developers and tooling companies recruiting builders",
    "Firms exploring stablecoin or tokenisation work on Solana",
    "Creators and press covering the ecosystem",
  ],
  skipIf: [
    "You do not build or sell on Solana",
    "You want a regulator and bank-heavy room; DAS London is closer to that",
    "You expect an easy sponsorship quote without an ecosystem relationship",
  ],
  pcgAngle:
    "PCG tracks Solana Breakpoint on its Europe calendar. We have no media partnership with the Solana Foundation and no PCG attendance is established. For clients, we advise choosing between a booth, a side event or a speaking application depending on goals; the official site accepts press and creator applications directly. We would also run the 30-day follow-up on contacts after the event.",
  sources: [
    { label: "Solana Breakpoint", url: "https://solana.com/breakpoint" },
    { label: "Solana Compass on Breakpoint 2026", url: "https://solanacompass.com/news/solana-breakpoint-2026-comes-to-london-for-the-first-time-november-15-17-at-olympia" },
    { label: "Registration on Luma", url: "https://luma.com/breakpoint2026" },
  ],
};

export default guide;
