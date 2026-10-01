import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "intelligence-disrupt-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Intelligence Disrupt is a niche, deal-oriented expo at the point where Bitcoin mining and AI compute infrastructure overlap. It is worth it for power, land, cooling, GPU and hosting businesses looking for each other. Skip it if you want a general crypto audience or a policy and research conference.",
  costs: {
    ticket:
      "Not published on the official site, which lists three access levels without prices. Payment is accepted in Bitcoin, USDT, card and PayPal; tickets are non-transferable and non-refundable. Use code PCG at checkout.",
    note: "Structure is from the organiser's exhibitor guide for the March 2027 show. Pricing is shared on a call.",
  },
  attendees:
    "Bitcoin miners, hosting and data-centre operators, power and energy firms, hardware and GPU vendors, and AI infrastructure companies. Organiser-reported for the 2027 edition: 127+ speakers, 132+ sponsoring brands and 87 media partners. No attendee total was stated on the page.",
  sideEvents:
    "This is a trade-expo format, and I found no evidence of a large independent side-event scene. The organiser runs its own social programme, including a founders cigar lounge and founders dinner (RSVP required) for the top ticket tier, and keeps a Telegram group described as where deals start between shows. Useful off-site routes are that Telegram group, booking meetings ahead through exhibitors, and dinners you host yourself.",
  worthItFor: [
    "Mining operators looking for AI and HPC hosting tenants",
    "GPU, chip and cooling vendors selling into power-rich sites",
    "Landowners and energy developers seeking compute customers",
    "Companies that want a booth in a focused, buyer-heavy hall",
  ],
  skipIf: [
    "You need a broad crypto or investor crowd",
    "You sell to retail users",
    "You cannot get a booth or want public pricing before committing",
    "You want an established independent side-event circuit",
  ],
  pcgAngle:
    "PCG is an official media and sponsorship partner for Intelligence Disrupt. We work with the organiser to place sponsors and exhibitors, and we plan and produce their on-site activations, from booth content and video to dinners and side events. If you are thinking about a package, we can walk you through the tiers, which fit your goals, and what to have in place before and after the show.",
  sources: [
    { label: "Intelligence Disrupt official site", url: "https://intelligencedisrupt.com/" },
  ],
};

export default guide;
