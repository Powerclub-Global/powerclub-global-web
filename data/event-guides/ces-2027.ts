import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "ces-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Worth it for consumer hardware, robotics, mobility and retail-tech companies that need distribution, press and partners in one week. Skip it if you sell B2B software or crypto infrastructure and have no product to put in someone's hands; the show is huge, loud and expensive to be seen in.",
  costs: {
    ticket:
      "Estimate based on the 2026 edition: Exhibits Plus pass about $350 (early bird about $149), Deluxe Conference Pass about $1,700 (early bird about $1,400). 2027 pricing is not yet on the pages we could read.",
    sponsorship:
      "Not published. Exhibit space and sponsorships are sold by the Consumer Technology Association on request. Booths at CES range from small Eureka Park startup tables to multi-hundred-thousand-dollar builds, but we have no grounded figure to quote.",
    note: "Hotel costs in Las Vegas that week are a bigger budget line than the pass for most small teams.",
  },
  attendees:
    "Consumer-electronics brands, retailers, automotive and mobility players, health-tech, robotics, advertisers and media. The CTA's own 2026 attendance audit reported 148,392 participants, including 86,679 industry professionals and 7,037 media, from 141 countries, with 4,100+ exhibitors and about 1,200 startups in Eureka Park (organiser-reported, 2026). The organiser also states that 55% of attendees were senior-level.",
  sideEvents:
    "Heavy and mostly private. Companies run invite-only suites, dinners and parties on and off the Strip, and a lot of real meeting traffic happens in hotel suites rather than on the show floor. We have not verified a public calendar of these. Practical route: ask contacts for suite invites and book meetings before you land, because walk-up access is poor.",
  worthItFor: [
    "Hardware and consumer-device companies seeking retail or distribution deals",
    "Startups that can use Eureka Park for press and investor exposure",
    "Marketers and agencies meeting brand buyers",
    "Teams with a demo-able product and meetings booked in advance",
  ],
  skipIf: [
    "You sell B2B software with no physical demo",
    "You have no meetings booked before arrival",
    "Your budget cannot cover Las Vegas hotel rates in January",
    "You want a quiet, high-trust room of decision-makers",
  ],
  pcgAngle:
    "PCG tracks CES but has no established attendance, partnership or credentials there, and we do not claim any. For clients going, our advice: a booth only if you have a product to demo, otherwise a suite or dinner for a few named partners; speaking slots are hard to win and rarely move deals. Press credentials normally come through media or press-office applications with the CTA, not through PCG. We help plan the week's meetings in advance and run the 30-day follow-up, which is where most CES leads are lost.",
  sources: [
    { label: "CES official site", url: "https://www.ces.tech/" },
    { label: "CES 2026 attendance audit summary (CTA)", url: "https://www.ces.tech/media/kghbnaej/ces2026_auditsummary.pdf" },
    { label: "TV Technology: CES 2026 attendance", url: "https://www.tvtechnology.com/business/ces-2026-attendance-hits-148-000" },
  ],
};

export default guide;
