import type { Insight } from "@/types/insights";

export const insights: Insight[] = [
  {
    slug: "the-30-days-after-the-booth",
    title: "The 30 Days After the Booth",
    description:
      "Most conference sponsorships fail after the event, not during it. What the month following a conference should actually look like, hour by hour.",
    published: "2026-09-28",
    author: "Sami",
    status: "draft",
    readMinutes: 8,
    tags: ["conference strategy", "event roi", "sponsorship"],
    relatedEvents: ["token2049-singapore-2026", "smartcon-2026", "korea-blockchain-week-2026"],
    relatedPress: [
      "the-rise-of-deai-and-side-events-at-consensus-toronto-2025",
      "crypto-titans-converge-at-token2049-dubai",
    ],
    body: [
      {
        type: "p",
        text: "A team we spoke with this year put it plainly on a public forum: they spent a little over $180,000 sponsoring six conferences and came away with three qualified leads. The post reads as a verdict on conference sponsorship. It is actually a verdict on what happened after each one.",
      },
      {
        type: "p",
        text: "That distinction matters, because the spend is not the problem. A booth at a tier-one crypto conference runs somewhere between $15,000 and $50,000, gold tiers reach $100,000, and the top packages at the largest events go well past that. Those numbers buy real access: a few thousand of the right people in one building for two days. The failure is almost never that nobody came to the booth. It is that eleven days later the badge scans are still sitting in a CSV, the panel footage is unedited, and the person who said “send me that deck” has been to two other conferences since.",
      },
      { type: "h2", text: "Why the month after is where the money is" },
      {
        type: "p",
        text: "Conference conversations decay faster than almost any other lead source. Someone you met on a Tuesday afternoon in Singapore has, within a fortnight, been through a hundred other conversations. The context that made your pitch land — the panel they had just watched, the problem they had just described to you — is gone. What is left is a name and a company, which is indistinguishable from a cold list.",
      },
      {
        type: "p",
        text: "The industry benchmark most often quoted is that a B2B conference lead costs between $150 and $300. That figure assumes the follow-up happens. Where it does not, the real cost per closed deal is whatever you spent divided by roughly zero, which is the arithmetic behind that $180,000 post.",
      },
      {
        type: "callout",
        text: "The uncomfortable part: most teams know this. They plan the booth for three months and the follow-up for zero. The month after the event is treated as something that will happen naturally once everyone is back at their desks — which is exactly when everyone is most behind.",
      },
      { type: "h2", text: "What the 30 days should actually look like" },
      {
        type: "p",
        text: "This is the sequence we run. It is not complicated, but almost none of it can be improvised after the fact — most of it depends on decisions made before the doors open.",
      },
      { type: "h3", text: "Days 0–2: while it is still warm" },
      {
        type: "ul",
        items: [
          "Every conversation gets written down the same day, with context, not just a badge scan. Who they were, what they actually said, what they asked for. A scan without a sentence attached is a business card.",
          "The first follow-up goes out inside 48 hours — before the attendee's inbox resets. It references the specific conversation. A templated “great to meet you at TOKEN2049” is worse than nothing; it tells the reader they were a scan.",
          "Anything you promised in the room — a deck, an intro, a demo slot — ships now, not next week.",
        ],
      },
      { type: "h3", text: "Days 2–7: the content window" },
      {
        type: "p",
        text: "This is the week the event is still a live topic, and the week most teams waste. Panel footage, floor interviews and photography are worth an order of magnitude more now than a month from now, when the industry has moved to the next city.",
      },
      {
        type: "ul",
        items: [
          "Clips out of any speaking slot, cut and published while the event hashtag is still moving.",
          "A written recap that is genuinely useful to people who did not attend — what was actually said, what changed, who mattered. Not a photo album.",
          "Tag the organiser and the people you featured. This is also how the next credential gets easier.",
        ],
      },
      { type: "h3", text: "Days 7–21: separating interest from politeness" },
      {
        type: "ul",
        items: [
          "Enrich and segment. Conference lists contain a lot of people who were being polite. Score against the profile you actually sell to and route the rest to nurture rather than to a salesperson.",
          "Second touch, different angle — the recap, the clip they appear in, the thing relevant to the problem they described. Not “just circling back”.",
          "Book the meetings that the event was supposed to produce. This is the measurable output, and it is the only number worth reporting at day 30.",
        ],
      },
      { type: "h3", text: "Days 21–30: decide about the next one" },
      {
        type: "p",
        text: "Most sponsorship decisions for the following year are made with no data from the previous one, which is how companies end up back at the same event out of habit. By day 30 you should be able to say: conversations had, qualified, meetings booked, pipeline created, and cost per meeting — against the same figures for every other event you did.",
      },
      {
        type: "callout",
        text: "One caveat on measuring at 30 days: for most B2B segments the lag from a conference conversation to a closed deal is 60 to 180 days. A 30-day report tells you whether the follow-up worked, not whether the event paid. Judge the machine at 30 days and the investment at six months.",
      },
      { type: "h2", text: "The part that has to be decided in advance" },
      {
        type: "p",
        text: "Almost everything above depends on choices made before the event. Whether anyone is capturing content rather than working the booth. Whether the sponsorship includes attendee data rights — without them the lead capture is whatever your team scans by hand. Whether someone owns the follow-up specifically, rather than it falling to whoever has capacity.",
      },
      {
        type: "p",
        text: "That is the actual argument for treating conferences as a circuit rather than a series of one-off decisions. Run five events a year as five separate projects and the follow-up is improvised five times. Run them as one programme and the capture, the content pipeline and the routing are built once and reused — which is the difference between a $180,000 line item and a pipeline.",
      },
      { type: "h2", text: "What to take from this" },
      {
        type: "ul",
        items: [
          "The booth is not the product. The month after it is.",
          "Content has a one-week window and leads have a two-week one. Both close quietly.",
          "Measure meetings booked at 30 days and pipeline at six months. Reporting ROI at 30 days will always make a good event look bad.",
          "Decide who owns the follow-up before you buy the booth, or it will not have an owner.",
        ],
      },
    ],
  },
];
