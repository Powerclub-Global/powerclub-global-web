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
  title: "What a Year on the Crypto Conference Circuit Actually Costs",
  description:
    "What a five-event year costs at lean, standard and flagship levels, in bands: sponsorship, side events, travel, content and the staffing nobody budgets for.",
  published: "2026-10-01",
  author: "Sami Satoshi",
  status: "draft",
  readMinutes: 9,
  tags: ["conference budget", "sponsorship cost", "event roi"],
  relatedEvents: [
    "token2049-singapore-2026",
    "token2049-dubai-2027",
    "consensus-miami-2027",
    "bitcoin-2026-las-vegas",
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
      text: "Ask three people what a conference costs and you will get three different answers, because each of them is counting a different thing. The founder counts the sponsorship invoice. The finance lead counts the invoice plus flights. Nobody counts the six weeks of someone's time, the side-event deposit that was paid in cash, or the clips that were never edited.",
    },
    {
      type: "p",
      text: "This is our attempt to put the whole year on one page. A note on the numbers before we start: this is an analysis in bands, not a price list. The biggest events sell through private prospectuses with no public rate card, and we do not publish sponsorship pricing; we share it on calls. What follows is built from advertised ticket prices, general trade-show budgeting rules and our own time on the circuit, and where we are guessing we say so. We have not used any client's actual spend.",
    },
    { type: "h2", text: "The invoice is the smallest part" },
    {
      type: "p",
      text: "Outside crypto, exhibitors have a rule of thumb: the all-in cost of a show is roughly three times the booth rental. It comes from general trade-show budgeting, not from our sector, and crypto is messier. But the direction holds. When a team says “we paid for a gold package”, the honest figure is usually two to three times the invoice once the rest is counted.",
    },
    {
      type: "p",
      text: "What sits on top of the sponsorship fee falls into five groups: getting people there, the physical booth, side events, content, and the unglamorous overhead of running it all. We will take the fee first, then each of those.",
    },
    { type: "h2", text: "What the sponsorship fee buys" },
    {
      type: "p",
      text: "The largest events do not publish prices. TOKEN2049 sells bespoke packages through a prospectus. We do not quote sponsor prices here, but the shape of the ladder is consistent across the tier-one events, and it is worth seeing in relative terms.",
    },
    {
      type: "table",
      caption:
        "How the sponsorship ladder is structured at tier-one crypto conferences, in relative terms. Pricing is shared on a call, not published here.",
      head: ["Tier", "Cost relative to a small booth", "What usually comes with it"],
      rows: [
        ["Title / headline", "Many times over; the top of the ladder", "Main-stage naming, keynote, large booth, logo everywhere"],
        ["Platinum", "Several times", "Speaking slot, premium booth, side-event slot, a large block of passes"],
        ["Gold", "Roughly two to three times", "Panel or workshop slot, mid-size booth, 10 to 20 passes"],
        ["Silver / small booth", "The baseline", "Small booth or table, logo placement, 5 to 10 passes"],
        ["Official side event listing", "A fraction of the baseline", "A place on the official calendar, no booth"],
      ],
    },
    {
      type: "p",
      text: "There are cheaper doors in. TOKEN2049 advertises a startup stand that includes a two-day stand, tickets and a short pitch slot. Bitcoin 2026 lists a flat-rate marketplace spot with exhibitor passes. Both sit well below a standard exhibitor package. The pattern across the circuit is that the entry price is public, and everything above it is negotiated.",
    },
    {
      type: "p",
      text: "Tickets are separate, and they are not trivial for a team of four. Consensus Miami 2026 advertised a Pro pass at $799 and Platinum at $1,399. Bitcoin 2026 listed general admission at $499, Pro at $1,299 and a Whale pass at $9,999. Early-bird discounts are common, so the same pass can differ by hundreds of dollars depending on when you buy.",
    },
    { type: "h2", text: "Getting people there" },
    {
      type: "p",
      text: "Travel is the line that gets underestimated most, because it feels like a rounding error until you multiply it. Conference weeks push hotel prices up in the host city, and the best rooms near the venue go first. Our estimate for a two-person trip of five nights to Singapore, Dubai or Miami, flights included, is $6,000 to $12,000. A four-person booth team is $12,000 to $25,000. The spread is mostly the flight origin and how late you book.",
    },
    {
      type: "p",
      text: "We could not find a reliable published figure for how much hotel rates rise during TOKEN2049 week specifically, so we are not quoting one. Check live prices for your dates before you commit, and book earlier than feels necessary.",
    },
    { type: "h2", text: "The booth, and everything it needs" },
    {
      type: "p",
      text: "A booth is more than the space. Design, shipping, setup, electrical, furniture and screens usually add a low five-figure sum even for a modest build, and a full custom booth can cost several times a modest one before staffing. Swag adds more: ordering for 60 to 70 percent of expected traffic at $15 to $40 a unit is a figure that surprises people who have not done it.",
    },
    {
      type: "p",
      text: "Then there is the staffing. A booth open for two days needs a rota, which means more people than the floor plan suggests. People standing at a booth are not in meetings, so what looks like a cost saving, sending fewer people, is often a loss of the conversations you paid for.",
    },
    { type: "h2", text: "Side events: where a lot of the real business happens" },
    {
      type: "p",
      text: "At the biggest crypto weeks, much of the useful conversation happens outside the venue. TOKEN2049 week alone runs more than a thousand side events, and our coverage of TOKEN2049 Dubai, Consensus Toronto and Bitcoin 2025 in Las Vegas has returned to the same point each time: the dinners, rooftops and workshops around the main conference are where people actually have time to talk.",
    },
    {
      type: "table",
      caption: "Side-event costs by format, as broad bands. Our own observation plus published agency guides; venue, city and week all move these.",
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
      text: "A dinner for thirty with the right thirty people can do more than a booth, and costs a fraction of one. The caveat is that it only works when the guest list is built deliberately. An open RSVP fills with whoever is free, which is a different crowd from whoever you wanted.",
    },
    { type: "h2", text: "Content: the line that gets cut first" },
    {
      type: "p",
      text: "Clips, interviews, photography and a written recap run roughly $3,000 to $8,000 per event if you do the basics well, and more if you want a produced highlight film. It is the first line to be cut when the budget tightens and, in our experience, the one that most extends the life of the spend. A booth is open for two days. A clip is searchable for years. We cover the timing in The 30 Days After the Booth.",
    },
    { type: "h2", text: "What a five-event year adds up to" },
    {
      type: "p",
      text: "Here is the year assembled from the pieces above. We have defined each posture per event, then multiplied across five events. These are our estimates and they carry wide ranges because the real number depends on city, tier and how early you commit.",
    },
    {
      type: "table",
      caption: "Per-event cost by posture, as bands (tickets, travel, activity and content included). Sponsorship pricing is shared on a call.",
      head: ["Posture", "What it means", "Per event"],
      rows: [
        ["Attend", "Two people, tickets, travel, meetings, no activation", "Low five figures"],
        ["Attend + side event", "As above, plus a dinner or co-hosted event and basic content", "About two to three times Attend"],
        ["Booth", "Small booth, 3 to 4 staff, swag, content", "About three to six times Attend"],
        ["Flagship", "Gold or above, a speaking slot, a solo side event, full content", "Mid five to low six figures and up"],
      ],
    },
    {
      type: "table",
      caption: "Annual cost for five events, as bands. Excludes the fixed costs listed below.",
      head: ["Year", "Mix", "Estimated band"],
      rows: [
        ["Lean", "Five events at attend + side event", "High five to low six figures"],
        ["Standard", "Three at attend + side event, two with a booth", "Low to mid six figures"],
        ["Flagship", "One flagship, two booths, two attend + side event", "Mid six figures"],
      ],
    },
    {
      type: "p",
      text: "These are our estimates and the bands are wide because the real number depends on city, tier and how early you commit. They leave out the costs that are not tied to any one event. Someone has to own the programme: choosing events, building guest lists, running follow-up. Even a quarter of a senior person's time is plausibly a low five-figure sum a year, and CRM, enrichment and scheduling tools add a few thousand more. Many teams carry them without ever naming them as conference costs.",
    },
    {
      type: "callout",
      text: "A public forum post we keep coming back to describes a team spending a six-figure sum on six conferences and ending with three qualified leads. Spread across six events, that sits squarely in our lean-to-standard band. The spend was not extravagant. The problem was that it bought attendance without the machinery to turn it into meetings.",
    },
    { type: "h2", text: "Where the money is most often wasted" },
    {
      type: "ul",
      items: [
        "Buying a booth at an event where your buyers are at the side events. If the people you want are in the venue's side programme, the booth fee is paying for a different audience.",
        "Sending fewer people than the plan needs. A booth that is always half-staffed produces half the conversations at full price.",
        "No content plan. The recap and clips cost a few thousand dollars and are the only part of the spend that keeps working after the event.",
        "Treating every event the same. A lean posture at six events usually beats a flagship at one for a company that has not yet proved the channel.",
        "No named owner for follow-up. This is the most expensive omission on the list, and it never appears on an invoice.",
      ],
    },
    { type: "h2", text: "How to decide what your year should look like" },
    {
      type: "p",
      text: "Start from the question of who you need to meet, not which event is biggest. If the answer is a few dozen specific people, a handful of well-built dinners will do more than a booth. If you are selling to a broad market and need visibility, a booth and a speaking slot make sense, but only at the one or two events where your buyers actually are.",
    },
    {
      type: "p",
      text: "Then work backwards from the follow-up. Whatever you can staff and follow up properly is the number of events you should do. Five events done well is a better year than ten done thinly, and a good deal cheaper.",
    },
    {
      type: "p",
      text: "This is the reasoning behind the way we run a roadshow for clients: one programme across the year, with the guest lists, content and follow-up built once and reused at each stop, rather than five separate projects each improvised from scratch. If you want to talk through what a year would look like at your budget, you can book a call or send us a message.",
    },
  ],
};

export default article;
