import type { Insight } from "@/types/insights";

const article: Insight = {
  slug: "how-to-get-a-founder-a-speaking-slot",
  title: "How to Get a Founder a Speaking Slot at a Major Conference",
  description:
    "How conference agendas are really built, which routes to the stage are open to a founder, what each costs in time and money, and why side stages are the realistic start.",
  published: "2026-10-01",
  author: "Sami Satoshi",
  status: "draft",
  readMinutes: 9,
  tags: ["speaking", "conference strategy", "press relations"],
  relatedEvents: [
    "token2049-singapore-2026",
    "consensus-miami-2027",
    "ethcc-10-2027",
    "web-summit-2026",
    "bitcoin-2027",
  ],
  relatedPress: [
    "coindesk-unveils-influential-speaker-lineup-for-consensus-2025-in-toronto",
    "the-rise-of-deai-and-side-events-at-consensus-toronto-2025",
    "exploring-the-key-side-events-at-consensus-hong-kong-2025",
  ],
  body: [
    {
      type: "p",
      text: "Every founder we work with asks some version of the same question: can you get me on a stage? The honest answer is that it depends which stage, and that most of the stages people mean are not for sale, not open to applications in any useful sense, and not filled the way they assume.",
    },
    {
      type: "p",
      text: "This is how the agendas at the large crypto and technology conferences are actually built, which routes are open to a founder who is not already well known, and what each one costs in time and money. Where a number is our estimate rather than something an organiser has published, we say so.",
    },
    { type: "h2", text: "Four ways onto an agenda" },
    {
      type: "p",
      text: "Almost every main-stage slot at a major conference arrives by one of four routes. Understanding which one you are attempting is most of the work.",
    },
    { type: "h3", text: "1. The open application" },
    {
      type: "p",
      text: "Most large events have a speaker form, and it is real. Consensus runs a public speaker application, and its published submission guidelines have said that topics are chosen on editorial merit rather than pay-to-play, and that only a small share of submissions, in the range of 10 to 15 percent in the guidelines we found, are accepted. EthCC runs a call for speakers with track and format selection and committee review, and announced that its most recent call closed with more than a thousand submissions. TOKEN2049 takes speaker applications by email and asks for the role you would like, the topics you could cover and your background. Bitcoin Conference has a speaker form reviewed on a rolling basis, with a reply, if selected, in a few weeks.",
    },
    {
      type: "p",
      text: "Applications work, but the volume is the point. A founder submitting cold is competing with hundreds or thousands of others for a few dozen slots, and with people the organiser has already decided to invite.",
    },
    { type: "h3", text: "2. The invitation" },
    {
      type: "p",
      text: "Web Summit says on its own support pages that it primarily curates its stages through speaker invitations, with the application form available for others to be considered, and that applications are reviewed weekly with no individual feedback. That pattern is common. A programme team builds the headline sessions around names the audience will travel for, then fills the rest from applications and from people recommended by someone they trust.",
    },
    {
      type: "p",
      text: "The practical consequence: the route to an invitation runs through relationships, not forms. Someone on the programme team has to already know who you are, or know someone who vouches for you.",
    },
    { type: "h3", text: "3. The sponsor-linked slot" },
    {
      type: "p",
      text: "At many events a sponsorship package includes a speaking or stage appearance, either on a main stage or on a sponsor-hosted one. This is a legitimate route and a common one, but it should be called what it is. A slot attached to a sponsorship is a paid placement, and audiences and organisers both treat it differently from an editorially selected session. Some organisers, Consensus among them, state publicly that their programme is not pay-to-play, so the sponsor-linked route is a question of which stage you are buying, not a way around the selection process.",
    },
    {
      type: "p",
      text: "If you go this way, ask exactly what the package includes: the stage, the time of day, the length, whether the session is recorded and who owns the footage. The cheapest sponsor slot at a large event is often a slot at 4pm on the last day.",
    },
    { type: "h3", text: "4. Side stages and community stages" },
    {
      type: "p",
      text: "Around every major event there is a second programme: partner stages inside the venue, community-run stages, and the side events in nearby hotels, rooftops and co-working spaces that run all week. A single event can have well over a hundred of these. Our own coverage of the side-event scene at Consensus Toronto and Consensus Hong Kong is a good illustration of how much happens outside the official schedule.",
    },
    {
      type: "p",
      text: "For a founder who is not yet a name, this is where the realistic first slot is. Hosts of side events are actively looking for speakers and panelists, the bar is lower, the rooms are the same people, and the content is just as usable afterwards.",
    },
    {
      type: "table",
      caption:
        "Our estimates, based on published organiser guidance and what we see across the circuit. Costs are indicative ranges, not quotes, and odds are judgement rather than statistics.",
      head: ["Route", "How it works", "Lead time", "Cost (estimate)", "Odds for an unknown founder"],
      rows: [
        ["Open application", "Public form or email, reviewed by programme team or committee", "4 to 9 months before the event", "Free to apply", "Low; large events receive far more applications than slots"],
        ["Invitation", "Programme team approaches people it already knows or is introduced to", "3 to 8 months before", "Free, but needs a relationship", "Low without an introduction; good with one"],
        ["Sponsor-linked slot", "Included in, or added to, a sponsorship package", "2 to 6 months before", "Typically part of a five- or six-figure package", "High, because it is bought"],
        ["Partner or community stage", "Pitch the stage host directly", "1 to 4 months before", "Free to low five figures, depending on the stage", "Moderate to good"],
        ["Side event panel", "Pitch the host or co-host a session", "2 to 8 weeks before", "Free to a share of venue cost", "Good"],
      ],
    },
    { type: "h2", text: "What organisers actually want" },
    {
      type: "p",
      text: "A programme team is trying to fill a room with an audience that has a hundred other places to be. They are not asking whether your company is interesting. They are asking whether this session will be one people stay for.",
    },
    {
      type: "ul",
      items: [
        "A topic, not a product. “How we run validators across four jurisdictions” gets a second look. “Introducing our platform” does not, and many programme teams reject product pitches on sight.",
        "A point of view someone could disagree with. Sessions that survey a field are easy to find. Sessions that argue something are rare.",
        "Evidence that you have done the thing. Numbers, a deployment, a failure you can describe. A track record is the main substitute for a famous name.",
        "A reason to be in the room with other people. Organisers love a panel that is already half assembled: a moderator who is known, a counterpart from a different company with a different view.",
        "Evidence you can speak. A short clip of a previous talk, even from a small stage, is worth more than a longer bio.",
      ],
    },
    { type: "h2", text: "What to send" },
    {
      type: "p",
      text: "Keep it short enough that the person reading it, who has several hundred of these, can decide in under a minute.",
    },
    {
      type: "ul",
      items: [
        "A two-line session pitch: the argument, and who in the audience will care.",
        "Three to five bullets on what the audience will leave knowing that they did not arrive knowing.",
        "A bio of three or four sentences that says what you have built and run, not what you have been called.",
        "A link to one previous talk or interview, if you have one.",
        "Which track or format you are proposing, and whether you can bring a co-panelist.",
      ],
    },
    {
      type: "p",
      text: "Match the form where there is one. Programme teams use forms because they sort submissions by track, and an email that ignores the structure is harder to place and easier to drop.",
    },
    { type: "h2", text: "The role of press relationships" },
    {
      type: "p",
      text: "Media partners and press are part of how agendas fill, and not only through coverage. A media partner of an event is usually in regular contact with its programme and partnerships teams, knows when a track is short a voice, and is trusted to suggest people who will make a good session rather than a pitch. That trust is built over several events, not one.",
    },
    {
      type: "p",
      text: "This is also why we do not treat speaking as a separate service. The same relationships that get credentials and cover an event are the ones that get a founder introduced to the right person on the programme side. An introduction from someone an organiser has already worked with is the single most reliable way we know to move from the first route in the table to the second. We cover what that looks like in practice in our guides to the side-event programmes around the major events, for example in our look at the Consensus Toronto speaker lineup.",
    },
    { type: "h2", text: "Timing" },
    {
      type: "p",
      text: "The most common mistake is asking too late. By the time a founder is thinking about a conference, the main agenda is usually mostly set. Web Summit, for one, says its applications close when capacity is reached, which in its experience is two to three weeks before the event, but that is the end of the process, not the start of the opportunity.",
    },
    {
      type: "ul",
      items: [
        "Six to nine months out: open applications and invitation conversations. This is when you want your name already known.",
        "Three to five months out: sponsor-linked packages and partner stages, before the good time slots are gone.",
        "One to two months out: community stages and side event panels start to assemble their lineups.",
        "Two to four weeks out: side-event hosts with a gap to fill. Last-minute panelists do get placed here.",
      ],
    },
    { type: "h2", text: "Why founders get turned down" },
    {
      type: "ul",
      items: [
        "The submission is a product announcement with a topic painted on it.",
        "The topic is something the programme already has three sessions on.",
        "There is no evidence the person can speak, and no one on the team has seen them do it.",
        "The pitch arrives after the track is full.",
        "The founder is unavailable for the exact dates, or asks for a particular day and time. Flexibility is part of being easy to programme.",
        "No one on the programme side knows the person, and no one they trust has vouched for them.",
      ],
    },
    {
      type: "p",
      text: "None of these is about the quality of the company. Most are about how easy the submission is to say yes to.",
    },
    { type: "h2", text: "A realistic path for a first-time speaker" },
    {
      type: "p",
      text: "If a founder has never spoken at a conference, we would not aim for the main stage of the largest event first. The sequence that works is smaller and quicker.",
    },
    {
      type: "ul",
      items: [
        "Get on a side-event panel at the next major event. It is the quickest way to get footage and a track record.",
        "Use that to apply for a partner or community stage at the following one, with a clip attached.",
        "Submit to the open application for an event six to nine months ahead, with two previous talks to point to.",
        "By the third event, an introduction from an organiser or media partner is realistic, and the invitation route opens.",
      ],
    },
    { type: "h2", text: "Turn the slot into something that lasts" },
    {
      type: "p",
      text: "A speaking slot is thirty minutes. What makes it worth the preparation is what you do with the footage and the audience afterwards. Cut the session into short clips while the event hashtag is still moving, write a recap that is useful to people who were not there, tag the organiser and anyone you shared the stage with, and follow up with the people who asked questions or came up afterwards. The week after a talk is when it is worth the most, and most of it is lost in the first few days.",
    },
    {
      type: "p",
      text: "We set out what that month should look like in the 30 days after the booth, and almost all of it applies to a stage as much as to a booth. Settle in advance who is filming, who owns the follow-up and where the clips will go, because on the day nobody has the time.",
    },
    { type: "h2", text: "What to take from this" },
    {
      type: "ul",
      items: [
        "Know which route you are on. Applying, being invited, buying a slot and pitching a side stage are different jobs.",
        "A sponsor-linked slot is a paid placement. Use it knowingly, and ask what is in the package.",
        "The realistic first stage is a side or community stage, not the main one.",
        "Pitch a topic and an argument, with evidence you can speak and a co-panelist if possible.",
        "Start six to nine months ahead for the open routes and two months ahead for the side ones.",
        "Plan the clips and the follow-up before you go on, not after.",
      ],
    },
  ],
};

export default article;
