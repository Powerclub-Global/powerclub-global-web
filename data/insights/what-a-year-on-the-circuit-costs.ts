import type { Insight } from "@/types/insights";

/**
 * Cost figures in this piece are ESTIMATES, built from public sponsor guides,
 * published ticket prices and general trade-show budgeting rules. No client
 * figures are used. Sami: check every number against what you see in the field
 * before publishing.
 */
const article: Insight = {
  slug: "what-a-year-on-the-circuit-costs",
  title: "What a Year on the Crypto Conference Circuit Actually Costs",
  description:
    "Estimated costs for a five-event year at lean, standard and flagship levels: sponsorship, side events, travel, content and the staffing nobody budgets for.",
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
      text: "This is our attempt to put the whole year on one page. A note on the numbers before we start: every figure here is an estimate. The biggest events sell through private prospectuses with no public rate card, so the ranges below come from published sponsor guides, advertised ticket prices, general trade-show budgeting rules and our own time on the circuit. We have not used any client's actual spend, and where we are guessing we say so.",
    },
    { type: "h2", text: "The invoice is the smallest part" },
    {
      type: "p",
      text: "Outside crypto, exhibitors have a rule of thumb: the all-in cost of a show is roughly three times the booth rental. It comes from general trade-show budgeting, not from our sector, and crypto is messier. But the direction holds. When a team says “we paid $40,000 for a gold package”, the honest figure is usually $80,000 to $120,000 once the rest is counted.",
    },
    {
      type: "p",
      text: "What sits on top of the sponsorship fee falls into five groups: getting people there, the physical booth, side events, content, and the unglamorous overhead of running it all. We will take the fee first, then each of those.",
    },
    { type: "h2", text: "What the sponsorship fee buys" },
    {
      type: "p",
      text: "The largest events do not publish prices. TOKEN2049 sells bespoke packages through a prospectus, and published guides from agencies that sell into the space put the tiers at roughly the following. Treat them as ballparks that move with timing and availability.",
    },
    {
      type: "table",
      caption:
        "Estimated sponsorship tiers at tier-one crypto conferences, USD. Compiled from public sponsor guides; not an official rate card.",
      head: ["Tier", "Typical range", "What usually comes with it"],
      rows: [
        ["Title / headline", "$250,000 to $750,000+", "Main-stage naming, keynote, large booth, logo everywhere"],
        ["Platinum", "$100,000 to $250,000", "Speaking slot, premium booth, side-event slot, a large block of passes"],
        ["Gold", "$50,000 to $100,000", "Panel or workshop slot, mid-size booth, 10 to 20 passes"],
        ["Silver / small booth", "$15,000 to $50,000", "Small booth or table, logo placement, 5 to 10 passes"],
        ["Official side event listing", "$5,000 to $25,000", "A place on the official calendar, no booth"],
      ],
    },
    {
      type: "p",
      text: "There are cheaper doors in. TOKEN2049 advertises a startup stand at $4,900 that includes a two-day stand, tickets and a short pitch slot. Bitcoin 2026 lists a flat-rate marketplace spot at $6,000 with two exhibitor passes. Consensus exhibitor space is reported at $15,000 to $40,000. The pattern across all three is that the entry price is public, and everything above it is negotiated.",
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
      text: "A booth is more than the space. Design, shipping, setup, electrical, furniture and screens usually add $5,000 to $15,000 even for a modest build, and published guides put a full custom booth at $20,000 to $80,000 before staffing. Swag adds more: ordering for 60 to 70 percent of expected traffic at $15 to $40 a unit is a figure that surprises people who have not done it.",
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
      caption: "Estimated side-event costs by format, USD. Published agency guides plus our own observation; venue, city and week all move these.",
      head: ["Format", "Typical attendance", "Estimated cost"],
      rows: [
        ["Builder or founder dinner", "20 to 40", "$5,000 to $20,000"],
        ["Panel or fireside with drinks", "80 to 250", "$15,000 to $50,000"],
        ["Co-hosted party (your share)", "300 to 1,000", "$15,000 to $50,000"],
        ["Solo rooftop or club party", "300 to 1,000", "$40,000 to $150,000"],
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
      caption: "Estimated per-event cost by posture, USD (tickets, travel, activity and content included).",
      head: ["Posture", "What it means", "Per event"],
      rows: [
        ["Attend", "Two people, tickets, travel, meetings, no activation", "$9,000 to $17,000"],
        ["Attend + side event", "As above, plus a dinner or co-hosted event and basic content", "$15,000 to $35,000"],
        ["Booth", "Small booth, 3 to 4 staff, swag, content", "$35,000 to $100,000"],
        ["Flagship", "Gold or above, a speaking slot, a solo side event, full content", "$95,000 to $215,000"],
      ],
    },
    {
      type: "table",
      caption: "Estimated annual cost for five events, USD. Excludes the fixed costs listed below.",
      head: ["Year", "Mix", "Estimated total"],
      rows: [
        ["Lean", "Five events at attend + side event", "$75,000 to $175,000"],
        ["Standard", "Three at attend + side event, two with a booth", "$115,000 to $305,000"],
        ["Flagship", "One flagship, two booths, two attend + side event", "$195,000 to $485,000"],
      ],
    },
    {
      type: "p",
      text: "Those totals leave out the costs that are not tied to any one event. Someone has to own the programme: choosing events, building guest lists, running follow-up. Even a quarter of a senior person's time is plausibly $20,000 to $40,000 a year, and CRM, enrichment and scheduling tools add a few thousand more. These are our estimates, and many teams carry them without ever naming them as conference costs.",
    },
    {
      type: "callout",
      text: "A public forum post we keep coming back to describes a team spending about $180,000 on six conferences and ending with three qualified leads. That is $30,000 an event, which sits squarely in our lean-to-standard band. The spend was not extravagant. The problem was that it bought attendance without the machinery to turn it into meetings.",
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
