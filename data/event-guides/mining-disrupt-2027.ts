import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "mining-disrupt-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Mining Disrupt is the focused Bitcoin mining expo, and it is worth it for hardware, hosting, power, cooling and financing businesses that sell to miners. Skip it if mining is not your customer, or if you want the broad investor and policy mix of the large crypto conferences.",
  costs: {
    ticket:
      "Not published on the official site. Payment is accepted in Bitcoin, USDT, card and PayPal; tickets are non-transferable and all sales are final.",
    sponsorship:
      "Not published. The site says about 200 booths across tier packages; request the prospectus for pricing.",
    note: "Mining Disrupt and Intelligence Disrupt run together on March 22\u201324, 2027 at the Irving Convention Center at Las Colinas. See the Intelligence Disrupt guide for the official package prices.",
  },
  attendees:
    "Miners, hosting providers, hardware makers, energy and power developers, and financiers, with an AI and HPC track alongside. Organiser-reported on the 2027 page: 127 speakers and 132 sponsoring brands. No attendee total was stated.",
  sideEvents:
    "Mostly an expo with organiser-run social events: a founders cigar lounge and founders dinner (RSVP required), plus a Telegram community. Independent parties do happen around the show; the PCG press archive has a 2025 write-up of a product-launch party at Mining Disrupt. I could not verify a wider side-event count, so plan on booking your own dinners and meetings.",
  worthItFor: [
    "ASIC, immersion and cooling vendors selling to miners",
    "Hosting and power companies seeking operators",
    "Lenders and equipment financiers in the mining sector",
    "Teams planning a product launch for a mining audience",
  ],
  skipIf: [
    "Mining is not part of your customer base",
    "You want a broad investor crowd",
    "You need public pricing before you decide",
    "You expect a large independent side-event programme",
  ],
  pcgAngle:
    "PCG is an official media and sponsorship partner for the Disrupt shows. We work with the organiser to place sponsors and exhibitors, and we plan and produce their on-site activations. The 2025 edition is written up in the PCG press archive. If you are weighing a booth, a sponsorship or a speaking slot, we can compare the routes and plan the follow-up.",
  sources: [
    { label: "Mining Disrupt official site", url: "https://miningdisrupt.com/" },
    { label: "PCG press archive: Mining Disrupt 2025", url: "https://powerclubglobal.com/press/mining-disrupt-conference-expo-2025-the-ultimate-bitcoin-mining-event" },
    { label: "PCG press archive: Digital Shovel at Mining Disrupt 2025", url: "https://powerclubglobal.com/press/digital-shovel-lights-up-mining-disrupt-2025-with-new-product-launches-and-a-maximmag-party-to-remember" },
  ],
};

export default guide;
