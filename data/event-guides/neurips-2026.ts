import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "neurips-2026",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "NeurIPS is where machine learning research is presented and where labs recruit, so it is worth it for AI companies hiring researchers or wanting standing with the research community. It is the wrong place to find enterprise customers or crypto investors. Skip it if you are not hiring ML talent or releasing research.",
  costs: {
    ticket:
      "2026 registration is open, with an early registration deadline of October 30, 2026. We could not confirm the pass prices, so they are not listed here; check the registration page.",
    sponsorship:
      "Not published. Sponsorship runs through a prospectus, and applications close November 4, 2026. No public rate card.",
    note: "A virtual pass is offered alongside in-person attendance.",
  },
  attendees:
    "ML researchers, PhD students, industry research labs, and recruiters from large tech firms and AI startups. Attendance numbers for 2026 are not confirmed; the conference is split across Sydney (main, December 6-12) with satellite events in Atlanta and Paris (both December 9-13), which will spread the crowd.",
  sideEvents:
    "There is no crypto-style side-event circuit. The useful off-site routes are sponsor-hosted recruiting dinners and receptions, workshops inside the programme, and invite-only research socials hosted by labs and venture firms. Those are mostly found through sponsors, research contacts and the official workshop list. Expect fewer open parties than at a crypto event.",
  worthItFor: [
    "AI companies hiring ML researchers and engineers",
    "Labs that want to present papers or run a workshop",
    "Infrastructure and tooling vendors targeting research teams",
    "Investors scouting early-stage AI research spinouts",
  ],
  skipIf: [
    "You want enterprise buyers or a trade-show floor",
    "You have no paper, workshop or hiring goal",
    "Your focus is crypto or Bitcoin",
    "You cannot travel to Sydney and the Atlanta or Paris satellites are not close to your market",
  ],
  pcgAngle:
    "PCG does not attend or partner with NeurIPS and has no credentials for it. We note it because a few clients work in AI and decentralised compute. For anyone heading there, we would say plainly that a sponsor booth is for recruiting, a side dinner is the better route to investors, and press access is by official media application. We would also plan the 30-day follow-up with the researchers and hires that come out of it.",
  sources: [
    { label: "NeurIPS 2026 official site", url: "https://neurips.cc/" },
    { label: "NeurIPS 2026 splits across Sydney, Atlanta and Paris (AI Weekly)", url: "https://aiweekly.co/alerts/neurips-2026-splits-across-sydney-atlanta-and-paris-in-december" },
  ],
};

export default guide;
