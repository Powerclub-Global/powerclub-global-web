import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "superai-singapore-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "SuperAI is worth it for AI startups, infrastructure vendors and investors who want Asia-Pacific buyers, founders and capital in one building over two days. Skip it if you sell to regulated enterprises that buy through long procurement cycles, or if your product has no AI story: the crowd is builders and funders, and a generic booth gets lost in a very large hall.",
  costs: {
    ticket:
      "Estimate: roughly US$300 to US$3,000 per person. The 2026 edition listed tiers of about US$299 (super early), US$499, US$999 (regular) and US$2,999 (special access). The 2027 site currently shows a US$999 Pro pass. Prices rise as the date approaches.",
    note: "Ticket tiers are taken from the organiser site and third-party listings for 2026 and may change for 2027. Flights and Marina Bay hotels are a separate and large cost that week.",
  },
  attendees:
    "Organiser-reported for the 2026 edition: 10,000+ attendees from 150+ countries, 1,500+ AI companies and 150+ speakers, and the 2027 site repeats the 10,000 and 1,500+ figures as targets. By role, expect founders, ML engineers and researchers, venture and corporate investors, and executives from the large labs and chip and cloud companies, plus a strong Singapore and wider Asia-Pacific government and enterprise presence. The organiser lists OpenAI, Nvidia, Anthropic, Meta, Apple, DeepMind and Tencent among sponsors and exhibitors. Treat the headline numbers as organiser claims; badge scans are the real test of who is useful.",
  sideEvents:
    "There is a real side-event scene, branded Singapore AI Week and anchored by SuperAI. For 2026 it included a speakers reception, an agentic breakfast, a run club, a robotics demo night and a Singapore Blockchain Week side event at NUS, and many listings were free. Formats are mostly founder meetups, demo nights, breakfasts and hackathons hosted by startups, investors, universities and the organiser itself. Find them through the Singapore AI Week page and the usual event listing sites, and apply early because the better ones are capped. The organiser also runs the NEXT hackathon and the Genesis startup competition inside the programme.",
  worthItFor: [
    "AI startups raising or looking for Asia-Pacific customers and partners",
    "Infrastructure, compute and tooling vendors who want developer attention",
    "Investors scouting early-stage AI deals in one trip",
    "Teams that can win a Genesis or hackathon slot for visibility",
  ],
  skipIf: [
    "You sell to banks or governments and need a quiet room with decision makers",
    "Your budget cannot cover Singapore travel on top of the pass",
    "You have no AI product or angle to anchor a conversation",
    "You only want a small, curated crowd rather than ten thousand people",
  ],
  pcgAngle:
    "PCG tracks SuperAI as part of the AI events calendar. We do not have a media partnership with it, and we are not claiming attendance or credentials for 2027. For a client heading there, we would advise on booth versus side event versus a speaking or competition slot (side events are usually the cheaper way to meet the right people), look at whether a media partnership could unlock credentials, and set up the 30-day follow-up so the badge scans turn into conversations.",
  sources: [
    { label: "SuperAI official site", url: "https://www.superai.com/" },
    { label: "SuperAI tickets", url: "https://www.superai.com/tickets" },
    { label: "Singapore AI Week", url: "https://www.superai.com/sg-ai-week" },
    {
      label: "SuperAI 2026 press release (PR Newswire)",
      url: "https://www.prnewswire.com/news-releases/superai-2026-returns-to-singapore-as-the-worlds-ai-powers-converge-on-neutral-ground-302725598.html",
    },
  ],
};

export default guide;
