import type { EventGuide } from "@/types/eventGuides";

const guide: EventGuide = {
  eventId: "devcon-8-mumbai-2026",
  status: "draft",
  updated: "2026-10-01",
  verdict:
    "Worth it for Ethereum protocol, infrastructure and developer-tooling teams, and for anyone who wants to reach India's developer base directly. Skip it if you are selling to institutions or traders: this is a builders' conference, and a booth pitch aimed at suits will land badly.",
  costs: {
    ticket:
      "Estimate from public reports of the July ticket launch: general admission about US$499 in ETH or US$999 in fiat in the first wave, rising to about US$599 / US$1,199; early bird around US$349; Patron US$1,337. Indian residents, students and Ethereum contributors get large discounts (reports cite as low as US$25 for Indian students). Check devcon.org for current waves.",
    sponsorship:
      "Not published. The Ethereum Foundation announcement mentions Supporter spaces and said details would follow; no public rate card was found. Assume private enquiry.",
    note: "Devcon is run by the Ethereum Foundation, not a commercial organiser, so sponsorship is curated and not simply bought.",
  },
  attendees:
    "Engineers, researchers, designers, infrastructure operators, educators and community organisers building on Ethereum. The Ethereum Foundation says India was chosen for its developer base (it cites 17M+ GitHub developers in India). Trade coverage reports a target of over 10,000 attendees; that is a reported target, not a verified count.",
  sideEvents:
    "Devcon has a long history of surrounding community events: hacker houses, builder dinners, and protocol-team meetups hosted by ecosystem projects. For Mumbai, the scene is still forming as of this draft and we could not verify a published side-event calendar. Expect the usual routes: the Devcon community hubs inside the venue, Luma listings, and Telegram groups from Ethereum ecosystem teams. Hosting is cheaper in Mumbai than in Western cities, but venue logistics around Bandra Kurla Complex need early planning.",
  worthItFor: [
    "Protocol, L2, tooling and infrastructure teams recruiting or onboarding developers",
    "Companies planning an India go-to-market with a developer audience",
    "Researchers and open-source contributors",
    "Teams that can run a workshop or hub session instead of a sales booth",
  ],
  skipIf: [
    "Your buyers are institutions or retail traders",
    "You have no Ethereum tie-in",
    "You cannot commit to the technical content, since the programme is deeply technical",
  ],
  pcgAngle:
    "PCG tracks Devcon as part of its Ethereum and developer-event calendar. We have no media partnership with Devcon and no PCG attendance is established. For a client going, we would steer toward a workshop, community hub or side dinner rather than a conventional booth, and look at press access through the organisers' press process. After the event we run the 30-day follow-up on contacts made.",
  sources: [
    { label: "Ethereum Foundation: Devcon 8 announcement", url: "https://blog.ethereum.org/2025/12/23/devcon-mumbai" },
    { label: "Devcon", url: "https://devcon.org/" },
    { label: "Blockchain.News on ticket launch", url: "https://blockchain.news/news/devcon-8-tickets-ethereum-eth-mumbai" },
  ],
};

export default guide;
