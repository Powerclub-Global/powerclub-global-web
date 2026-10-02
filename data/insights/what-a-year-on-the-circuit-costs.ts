import type { Insight } from "@/types/insights";

/**
 * Cost analysis here is deliberately BANDED. Per Bodhi (2026-10-01) we do not
 * publish sponsorship or exhibition prices; those are shared on calls. Public
 * ticket prices and non-sponsorship operating costs (travel, content) are the
 * only dollar figures. No client figures are used. Sami: check the bands
 * against what you see in the field before publishing.
 */
const article: Insight = {
  slug: "what-a-year-on-the-circuit-costs",
  title: "Conference Sponsorship Cost: A Year on the Crypto Circuit",
  description:
    "What a five-event crypto conference year costs, in bands: sponsorship tiers, booth build, side events, travel, content and the staff time nobody budgets for.",
  published: "2026-10-01",
  updated: "2026-10-01",
  author: "Sami Satoshi",
  status: "draft",
  readMinutes: 9,
  tags: ["conference budget", "sponsorship cost", "event roi"],
  relatedEvents: [
    "token2049-singapore-2026",
    "token2049-dubai-2027",
    "consensus-miami-2027",
    "bitcoin-2027",
  ],
  relatedPress: [
    "crypto-titans-converge-at-token2049-dubai",
    "groundbreaking-side-events-at-token2049-dubai",
    "the-rise-of-deai-and-side-events-at-consensus-toronto-2025",
    "side-events-empowering-industry-game-changers-at-bitcoin-2025-las-vegas",
  ],
  body: [
    {
      type: "p",
      text: "Ask a founder what a conference cost and you get the sponsorship invoice. Ask the finance lead and you get the invoice plus flights. Neither figure includes the weeks of staff time, the side-event deposit or the footage that was shot and never edited, which is why most teams underestimate their conference sponsorship cost by a wide margin.",
    },
    {
      type: "p",
      text: "This piece puts a whole year on one page. It is an analysis in bands and ratios, not a price list. The largest events sell through private prospectuses, and we do not publish sponsorship or exhibition prices; we share what we know on calls. The figures below come from published ticket prices, general trade-show budgeting practice and our own estimates, and each estimate is labelled as one. No client spend is used.",
    },
    { type: "h2", text: "Conference sponsorship cost: the invoice is only part of it" },
    {
      type: "p",
      text: "Exhibitors outside crypto use a rule of thumb: the all-in cost of a show is roughly three times the cost of the floor space. The rule comes from general trade-show budgeting and crypto events do not follow it neatly, but it points the right way. When a team says it paid for a gold package, the full cost is usually well above the invoice once everything else is counted.",
    },
    {
      type: "p",
      text: "One public data point supports this. A founder who [posted a full breakdown of six sponsored conferences](https://blockeden.xyz/forum/t/we-spent-180k-sponsoring-6-conferences-in-2025-and-got-3-leads-the-roi-math-behind-why-web3-sponsorship-is-broken/456) reported that the sponsorship packages came to about three-fifths of the total. The remaining two-fifths was everything that sits on top of the fee, and the sections below take those costs one at a time.",
    },
    { type: "h2", text: "What a crypto conference sponsorship package includes" },
    {
      type: "p",
      text: "The tier names differ between organisers, but the ladder has the same shape at most tier-one events. We show it here relative to the smallest booth.",
    },
    {
      type: "table",
      caption:
        "How the sponsorship ladder is structured at tier-one crypto conferences, in relative terms. Inclusions vary by event; pricing is shared on a call, not published here.",
      head: ["Tier", "Cost relative to a small booth", "What usually comes with it"],
      rows: [
        ["Title / headline", "Many times over; the top of the ladder", "Main-stage naming, keynote, large booth, logo across the venue"],
        ["Platinum", "Several times", "Speaking slot, premium booth, side-event slot, a large block of passes"],
        ["Gold", "Roughly two to three times", "Panel or workshop slot, mid-size booth, a block of passes"],
        ["Silver / small booth", "The baseline", "Small booth or table, logo placement, a handful of passes"],
        ["Official side-event listing", "A fraction of the baseline", "A place on the official calendar, no booth"],
      ],
    },
    {
      type: "p",
      text: "There are cheaper ways in. [TOKEN2049 Singapore](/conferences/token2049-singapore-2026) advertises a Startup Stand that bundles a two-day stand, five tickets and a ten-minute pitch on its Startup Stage, at a published price far below a standard exhibitor package. Across the circuit the entry-level option tends to be public and everything above it is negotiated.",
    },
    {
      type: "p",
      text: "Tickets are a separate line, and for a team of four they add up. On October 1, 2026 the [TOKEN2049 Singapore FAQ](https://token2049.com/singapore/faqs) listed the final-phase standard ticket at US$699 and the Special Access Pass at US$4,999. Consensus and the Bitcoin Conference also sell tiered passes that rise by sales phase, so the same pass can cost hundreds of dollars more for a team that buys late.",
    },
    { type: "h2", text: "Travel and hotel costs for a conference team" },
    {
      type: "p",
      text: "Travel is the most underestimated line because it looks small until it is multiplied by headcount and by events. Hotel prices rise in the host city during a conference week, and rooms near the venue sell first. Our estimate for two people spending five nights in Singapore, Dubai or Miami, flights included, is $6,000 to $12,000. For a four-person booth team it is $12,000 to $25,000. Flight origin and booking date account for most of the spread.",
    },
    {
      type: "p",
      text: "We could not find a reliable published figure for how much hotel rates rise during TOKEN2049 week, so we are not quoting one. Check live prices for your dates before you commit.",
    },
    { type: "h2", text: "Conference booth costs beyond the floor space" },
    {
      type: "p",
      text: "The package buys the space. Design, shipping, setup, electrical, furniture and screens typically add a low five-figure sum for a modest build, and a custom build costs several times that. Giveaways are a further line, and teams tend to over-order them.",
    },
    {
      type: "p",
      text: "Staffing is the cost that is easiest to miss. A booth that is open for two days needs a rota, so it needs more people than the floor plan suggests. Those people are not in meetings while they stand there. Sending a smaller team looks like a saving and usually costs you the conversations the package was bought for.",
    },
    { type: "h2", text: "Side event costs by format" },
    {
      type: "p",
      text: "At the largest crypto weeks much of the useful conversation happens outside the venue. TOKEN2049 says more than 1,000 side events take place across its Singapore week. Our write-ups of the side events around TOKEN2049 Dubai 2025, Consensus Toronto 2025 and Bitcoin 2025 in Las Vegas (linked at the end of this article) show the same thing at each: the dinners and workshops around the main conference are where people have time to talk.",
    },
    {
      type: "table",
      caption:
        "Side-event costs by format, as broad bands. Our estimates; venue, city and week all move these.",
      head: ["Format", "Typical attendance", "Cost band"],
      rows: [
        ["Builder or founder dinner", "20 to 40", "Low to mid five figures"],
        ["Panel or fireside with drinks", "80 to 250", "Mid five figures"],
        ["Co-hosted party (your share)", "300 to 1,000", "Mid five figures"],
        ["Solo rooftop or club party", "300 to 1,000", "Mid five to low six figures"],
      ],
    },
    {
      type: "p",
      text: "A dinner for thirty well-chosen guests can do more than a booth at a fraction of the cost. It only works when the guest list is built by hand. An open RSVP fills with whoever is free that evening, and they are rarely the people you wanted. We compare the formats in [booth vs side event vs speaking slot](/insights/booth-vs-side-event-vs-speaking).",
    },
    { type: "h2", text: "Content costs: the line that gets cut first" },
    {
      type: "p",
      text: "By our estimate, clips, interviews, photography and a written recap cost roughly $3,000 to $8,000 per event when the basics are done well, and more for a produced highlight film. It is the first line cut when a budget tightens. It is also the only part of the spend that keeps working after the event: the booth is open for two days, and a recap or a clip can be found in search for years. The timing matters, and we cover it in [the 30 days after the booth](/insights/the-30-days-after-the-booth).",
    },
    { type: "h2", text: "What a five-event conference budget adds up to" },
    {
      type: "p",
      text: "The tables below assemble the year from those pieces. We define four postures per event, then combine them across five events. All of it is our estimate, and the bands are wide because city, tier and booking date move the real number a long way.",
    },
    {
      type: "table",
      caption:
        "Per-event cost by posture, as bands (tickets, travel, activity and content included). Sponsorship pricing is shared on a call.",
      head: ["Posture", "What it means", "Per event"],
      rows: [
        ["Attend", "Two people, tickets, travel, meetings, no activation", "Low five figures"],
        ["Attend + side event", "As above, plus a dinner or co-hosted event and basic content", "About two to three times Attend"],
        ["Booth", "Small booth, three or four staff, giveaways, content", "About three to six times Attend"],
        ["Flagship", "Gold or above, a speaking slot, a solo side event, full content", "Low six figures and up"],
      ],
    },
    {
      type: "table",
      caption: "Annual cost for five events, as bands. Excludes the fixed costs described below.",
      head: ["Year", "Mix", "Estimated band"],
      rows: [
        ["Lean", "Five events at attend + side event", "High five to low six figures"],
        ["Standard", "Three at attend + side event, two with a booth", "Low to mid six figures"],
        ["Flagship", "One flagship, two booths, two attend + side event", "Mid six figures"],
      ],
    },
    {
      type: "p",
      text: "These bands leave out the costs that belong to no single event. Someone has to own the programme: choosing events, building guest lists, running the follow-up. A quarter of a senior person's time is plausibly a low five-figure sum a year, and CRM, enrichment and scheduling tools add a few thousand dollars more. Most teams carry these costs without ever counting them as conference spend.",
    },
    {
      type: "callout",
      text: "The six-conference breakdown mentioned above sits in our lean-to-standard band. By circuit standards the spend was ordinary, and it still ended in three qualified leads from 847 badge scans. The budget covered attendance and booths. It did not cover the work that turns a scan into a meeting.",
    },
    { type: "h2", text: "Where conference budgets are wasted" },
    {
      type: "ul",
      items: [
        "Buying a booth at an event where your buyers spend the week at side events. The booth fee then pays for an audience you did not want.",
        "Sending fewer people than the plan needs. A half-staffed booth has half the conversations for the full fee.",
        "Skipping the content plan. Recaps and clips cost a few thousand dollars and keep working after the event closes.",
        "Buying the same package everywhere. A company that has not yet proved the channel usually learns more from a lean presence at five events than from a flagship package at one.",
        "Leaving the follow-up without a named owner. This is the most expensive omission on the list, and it never appears on an invoice.",
      ],
    },
    { type: "h2", text: "How to set a conference budget for 2027" },
    {
      type: "p",
      text: "Start from who you need to meet, not from which event is biggest. If the answer is a few dozen named people, a handful of well-built dinners will do more than a booth. If you sell to a broad market and need visibility, a booth and a speaking slot make sense at the one or two events where your buyers gather. For most crypto teams the 2027 candidates are [TOKEN2049 Dubai](/conferences/token2049-dubai-2027) in April, [Consensus Miami](/conferences/consensus-miami-2027) in May and [Bitcoin 2027](/conferences/bitcoin-2027) in July.",
    },
    {
      type: "p",
      text: "Then work backwards from the follow-up. The number of events you can staff and follow up properly is the number you should do. Five events done well cost less than ten done thinly and produce more.",
    },
    {
      type: "p",
      text: "Powerclub Global (PCG) builds its [roadshow management service](/services/roadshow-management) on that reasoning: one programme for the year, with guest lists, content and follow-up built once and reused at each stop. To see what a year would look like at your budget, including the sponsorship pricing we do not publish, [schedule a call](/schedule-call).",
    },
    { type: "h2", text: "Frequently asked questions" },
    { type: "h3", text: "How much does it cost to sponsor a crypto conference?" },
    {
      type: "p",
      text: "It depends on the tier and the event. As a band, a small booth at a tier-one crypto conference is a mid five-figure commitment, gold tiers cost roughly two to three times that, and headline packages cost many times more. Most organisers share exact prices only in a private prospectus.",
    },
    { type: "h3", text: "How much does a conference booth cost in total?" },
    {
      type: "p",
      text: "Expect the full cost to be well above the booth fee. General trade-show practice budgets about three times the floor-space cost once build, shipping, travel, staff and giveaways are included. In one public breakdown of six crypto sponsorships, the packages were about three-fifths of total spend.",
    },
    { type: "h3", text: "How much does a side event at TOKEN2049 cost?" },
    {
      type: "p",
      text: "By our estimates, a hosted dinner for 20 to 40 guests is a low to mid five-figure cost, a panel with drinks is mid five figures, and a solo party for several hundred runs from mid five into six figures. Co-hosting with other teams reduces each share.",
    },
    { type: "h3", text: "What is a realistic annual conference budget for a startup?" },
    {
      type: "p",
      text: "A lean five-event year, with two people attending each event and hosting one small side event, falls in the high five to low six-figure band by our estimate. Adding booths at two of the five moves the year into low to mid six figures.",
    },
    { type: "h3", text: "Is sponsoring a crypto conference worth it?" },
    {
      type: "p",
      text: "It can be when your buyers are in the room, you have meetings booked before you travel, and someone owns the follow-up afterwards. Without those three, a team is paying for attendance. Start with a ticket and a small side event before committing to a booth.",
    },
  ],
};

export default article;
