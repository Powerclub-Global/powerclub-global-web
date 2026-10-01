import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "nvidia-gtc-2027",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Worth it for developers, infrastructure vendors and anyone building on NVIDIA hardware or software; the technical content and partner ecosystem are unmatched. Skip it if you are looking for investors or non-technical buyers, or if you are not part of the NVIDIA ecosystem, since sponsorship access is tightly tied to partner status.",
  costs: {
    ticket:
      "Estimate from the 2026 edition: four-day conference pass about $2,172 early bird and $2,525 regular; one-day pass about $1,260; exhibits-only from about $930 (single day about $110). 2027 registration had not opened on the page we read.",
    sponsorship:
      "Not published. Sponsorship and exhibiting are arranged with NVIDIA directly and are largely oriented to partners; we found no public rate card.",
    note: "GTC alumni discounts and team packages exist. NVIDIA also runs GTC events in Berlin and Washington, D.C. later in 2026.",
  },
  attendees:
    "Developers, researchers, data-center and cloud infrastructure teams, robotics and industrial AI engineers, and enterprise technology leaders. NVIDIA describes thousands of developers, researchers and business leaders; we did not find a verified 2026 attendance figure, so we do not quote one. 2027 themes include agentic AI, AI infrastructure, physical AI and robotics, and CUDA.",
  sideEvents:
    "Unverified in detail. Because San Jose hosts the week, partners, VCs and startups typically run their own meetups and dinners around the show, but we could not source a public calendar. Route: ask NVIDIA partners and Inception-programme contacts which gatherings they host, and book meetings in advance as hotel space is limited.",
  worthItFor: [
    "Developers and ML engineers wanting training and sessions",
    "Hardware, networking and cloud vendors in NVIDIA's partner ecosystem",
    "Robotics and industrial AI teams",
    "Startups seeking visibility to NVIDIA and its partners",
  ],
  skipIf: [
    "You need a fundraising venue",
    "You are not building on or selling into NVIDIA's stack",
    "Your buyers are non-technical executives",
    "You want a cheap, easy-to-sponsor event",
  ],
  pcgAngle:
    "PCG tracks GTC but has no established attendance, partnership or credentials, and we do not claim any. For clients going, the best route is usually a partner-hosted session, a poster or talk submission (NVIDIA is taking poster submissions for 2027), or a side meeting rather than a booth. Media access is handled by NVIDIA. We help plan the week and run the 30-day follow-up.",
  sources: [
    { label: "NVIDIA GTC official page", url: "https://www.nvidia.com/gtc/" },
    { label: "NVIDIA GTC pricing", url: "https://www.nvidia.com/gtc/pricing/" },
  ],
};

export default guide;
