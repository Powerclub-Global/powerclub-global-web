import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "money2020-usa-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Money20/20 USA is worth it for payments, banking-tech and fraud vendors who need to meet bank and processor buyers in person, and who can afford the highest pass prices on the fall calendar. Skip it if you are early stage with no sales team to work the floor, or if your market is crypto-native: the buyers here are incumbents, and the cost per useful meeting is high unless you book them in advance.",
  costs: {
    ticket:
      "Estimate: roughly US$3,500 to US$4,200 for a standard pass, rising toward the event, and about US$1,900 for a growth-stage startup pass, based on 2026 pricing reported by third parties. Not yet published for 2027.",
    sponsorship:
      "Not published. Sponsorship and exhibiting are sold through a private prospectus with no public rate card. The organiser reports 300+ sponsors on the 2026 show floor, so budget for stand build, staff, travel and Las Vegas hotels on top of any package fee.",
    note: "2027 moves to the Las Vegas Convention Center and Resorts World, so expect pricing and layout to differ from 2026 at the Venetian.",
  },
  attendees:
    "Organiser-reported for 2026: 11,000+ senior attendees, 3,400+ companies, one in three at C-suite level, 85+ countries, 630+ speakers and 320+ media and analyst representatives. Some third-party listings cite 13,000+, so treat the numbers as organiser claims. By sector it is banks, card networks, payment processors, fintechs, retailers and investors, with the 2026 programme leaning on agentic AI, fraud and regulation. The organiser runs Money20/20 Connect, a platform for booking one-on-one meetings, which is where most of the value is created.",
  sideEvents:
    "A large side-event scene exists around the show. Fintech firms, investors and industry groups host breakfasts, dinners, happy hours, mixers, run clubs and working sessions across Las Vegas, and the organiser's own evening event, Money By Night, is a ticketed draw. Hosts are mostly vendors and VCs, so invitations tend to come through existing relationships or by registering on host pages. Search the host listings and event aggregators in the weeks before, and ask your existing contacts what they are attending. For 2027 the move of the main venue may change where these cluster.",
  worthItFor: [
    "Payments, fraud and compliance vendors selling to banks and processors",
    "Fintechs with a sales team that can pre-book meetings through Connect",
    "Investors tracking fintech and agentic payments in one week",
    "Companies that can host a dinner and use the crowd without buying a booth",
  ],
  skipIf: [
    "You are pre-revenue and cannot absorb a US$3,500+ pass plus travel",
    "Your buyers are crypto-native rather than banks and processors",
    "You have no pre-booked meetings and plan to rely on floor traffic",
    "You need a small, intimate event rather than a very large one",
  ],
  pcgAngle:
    "PCG tracks Money20/20 USA as part of the fintech events calendar. We have no media partnership with it and are not claiming attendance or credentials for 2027. For a client heading there, we would advise on booth versus side event versus speaking, check whether a media partnership could unlock credentials, and plan the 30-day follow-up so the week of meetings becomes pipeline rather than a stack of business cards.",
  sources: [
    { label: "Money20/20 USA official site", url: "https://us.money2020.com/" },
    { label: "Money20/20 USA pass prices", url: "https://us.money2020.com/attend/passes" },
    { label: "Money's Biggest Stage Has a New Home", url: "https://us.money2020.com/money2020-new-home" },
    {
      label: "Money20/20 side events guide (Avenue Z)",
      url: "https://avenuez.com/events/money20-20-side-events/",
    },
  ],
};

export default guide;
