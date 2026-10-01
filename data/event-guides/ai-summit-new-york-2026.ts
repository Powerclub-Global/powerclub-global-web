import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "ai-summit-new-york-2026",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Worth it for vendors and consultants who sell AI products into large US enterprises and want buyer-side titles in one hall for two days. Skip it if you need investors or early-stage founders, or if your product is crypto or infrastructure-native; this is an enterprise-IT crowd, not a deal-making crowd.",
  costs: {
    ticket:
      "Estimate from the organiser's early-bird listing: Expo-only pass around $99-$199, Delegate around $2,100-$2,900, VIP around $2,800-$3,500. Prices step up as the date nears.",
    note: "Check the live ticket page; early-bird dates on the site may change.",
  },
  attendees:
    "Enterprise buyers and the people who advise them: Chief AI Officers, CTOs, data and analytics leaders, and digital transformation executives from financial services, healthcare, retail, technology and media. The site lists 200+ exhibitors and sponsors including EY, IBM, NVIDIA/Dell and HPE. Organiser-reported for 2026: 7,500+ attendees and 350+ speakers across 10-11 tracks. Our own events dataset carried older figures (5,000+ and 539 speakers), so treat all headcounts as marketing numbers.",
  sideEvents:
    "We could not verify a structured side-event scene for this one. It is a convention-center trade show, so the useful off-site routes are private dinners and client breakfasts that vendors host in Midtown the same week, and the wider New York AI meetup circuit. Ask your existing contacts which dinners they are hosting; most are invite-only and arranged weeks ahead.",
  worthItFor: [
    "AI vendors targeting Fortune 500 buyers who want volume conversations",
    "Consultancies and integrators looking for enterprise leads",
    "Teams that can pair a booth with a hosted dinner",
    "Anyone who needs press and analyst exposure in New York",
  ],
  skipIf: [
    "You are raising a seed or Series A round and need investors",
    "Your buyers are developers, not enterprise executives",
    "You cannot staff a booth and run follow-up in the following 30 days",
    "Your audience is crypto-native",
  ],
  pcgAngle:
    "PCG tracks this event but has no established attendance, partnership or credentials here, and we do not claim any. For a client heading to New York, our advice is to pick one lane: a booth if the goal is volume enterprise leads, a hosted dinner if it is a handful of named accounts, a speaking slot only if you can get a track with real buyers in the room. Press access normally comes through a media partnership with the organiser, which PCG does not hold for this event. The part clients most often skip is the 30-day follow-up, and that is where we put our effort.",
  sources: [
    { label: "The AI Summit New York official site", url: "https://newyork.theaisummit.com/" },
  ],
};

export default guide;
