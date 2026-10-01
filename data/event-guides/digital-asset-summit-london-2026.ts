import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "digital-asset-summit-london-2026",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Worth it for infrastructure, custody, stablecoin and tokenisation firms that want time with asset managers, banks and allocators in a small, expensive room. Skip it if you are a retail-facing or early-stage project: tickets cost serious money and the audience is buyers, not builders.",
  costs: {
    ticket:
      "Estimate from the registration page: VIP listed at US$1,999 (early access, sold out), standard at US$2,499 (sold out), and last-chance tickets at US$2,999. Registration has moved to Luma.",
    sponsorship:
      "Not published. Blockworks sells sponsorship by private prospectus; no public rate card was found.",
    note: "Venue is the London Hilton on Park Lane, so capacity is limited and sponsor visibility is high per pound spent.",
  },
  attendees:
    "Institutional crypto audience: asset managers, banks, allocators, exchanges, infrastructure and market-structure firms. Blockworks describes it as connecting asset managers, banks and allocators with the industry; we found no verified attendance figure for 2026.",
  sideEvents:
    "Smaller than Consensus or TOKEN2049 weeks, but London in mid-November is busy: Solana Breakpoint lands in London on Nov 15-17, so expect dinners, investor breakfasts and ecosystem events from hosts targeting institutions across both. Routes in: the Blockworks Luma page, host invitations, and fund and law-firm networks. Invitation-only dinners matter more than open parties.",
  worthItFor: [
    "Custody, trading, tokenisation and stablecoin infrastructure firms",
    "Funds and allocators who want peer conversation",
    "Companies preparing UK or EU regulatory conversations",
    "Teams that can pair it with Breakpoint the following week",
  ],
  skipIf: [
    "You are pre-product or retail-facing",
    "You need volume of leads rather than quality of meetings",
    "A $2,500-3,000 ticket is out of proportion to your expected deals",
  ],
  pcgAngle:
    "PCG tracks Blockworks events. We have no media partnership here and no PCG attendance is established. For a client heading to London, we would advise an invitation-only dinner or targeted meetings over exhibiting, and a combined trip with Breakpoint. Press access would come through a media partnership we would need to negotiate. We run the 30-day follow-up afterwards.",
  sources: [
    { label: "Blockworks: Digital Asset Summit London", url: "https://blockworks.com/event/digital-asset-summit-london" },
    { label: "Registration on Luma", url: "https://luma.com/daslondon2026" },
  ],
};

export default guide;
