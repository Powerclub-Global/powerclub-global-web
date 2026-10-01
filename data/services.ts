import {
  Car,
  Code,
  Users,
  Palette,
  Share2,
  MessageSquare,
  Newspaper,
} from "lucide-react";

export const services = [
  {
    id: "roadshow-management",
    featured: true,
    maintitle: "Roadshow Management",
    // Search-result title; maintitle stays short for nav and cards.
    metaTitle: "Conference Roadshow Management for Crypto, AI and Fintech Companies",
    title: "conference circuit",
    prefix: "Run your ",
    suffix: "as one programme",
    description:
      "Conference marketing for crypto, AI and fintech teams: media credentials, speaking slots, side events, content and follow-up, run as one year-long programme.",
    longDescription: `At Powerclub Global a roadshow is not a truck tour. It is a year-long circuit of tech and crypto conferences, run as one programme instead of a string of separate event decisions. We track 87 conferences and have attended and written up 25 of them, and we use that record to decide where your company should show up, in what form, and what happens to every conversation afterwards.`,
    icon: Car,
    isMain: true,
    image: "/services/roadshow.jpg",
    heading1: "What a roadshow means here",
    para1:
      "Most companies buy conference presence one event at a time: a booth here, a sponsorship there, and the follow-up improvised on each occasion. The roadshow method treats the year as a single programme. The same capture, content and follow-up system is built once and reused at every stop, so the third event takes less effort and teaches more than the first.",
    para2:
      "It is also not a vehicle tour. If you want a branded trailer parked in six cities, there are good logistics firms for that. We work on a different problem: getting a crypto, AI or fintech company real return from the conferences its customers, investors and partners already attend.",
    heading2: "How the programme runs",
    para3:
      "Credentials come first. We apply for media credentials at the conferences on your circuit and, where an organiser grants them, we cover the event: recaps, interviews and clips published on our own channels. That is the coverage-for-credentials model. The credential is earned by the coverage rather than bought as a package, and whether it is granted is always the organiser's decision.",
    para4:
      "On top of that sit speaking slots and side events where they make sense, content captured while the event is still live, a 30-day follow-up sequence, and an end-of-programme report covering meetings booked, cost per meeting and a recommendation on whether to return. The month after the event is where most of the value is won or lost.",
    guide: {
      heading: "Roadshow management for crypto, AI and fintech companies",
      sections: [
        {
          heading: "Who this is for",
          paragraphs: [
            "Companies that already know conferences matter to their market and are tired of treating each one as a fresh decision: a protocol team deciding between three events in one quarter, an AI company being pitched sponsorship packages it cannot compare, or a fintech with a budget and no way to tell which events paid back last year.",
          ],
        },
        {
          heading: "What is included",
          items: [
            "Circuit planning. Which of the events we track fit your market and budget, and in what format: booth, side event, speaking slot, or simply attending.",
            "Media credentials and coverage. Applications to organisers and published coverage on our channels, building on a press archive of events we have attended and written up.",
            "Speaking and side-event placement where the event and your story justify it.",
            "Content capture. Clips, photography and written recaps produced while the event is still being talked about.",
            "Follow-up. A first touch inside 48 hours that references the actual conversation, segmentation of the list, and a second touch with a different angle.",
            "Reporting. Meetings booked, cost per meeting and pipeline against every other event on the circuit.",
          ],
        },
        {
          heading: "What we do not do",
          paragraphs: [
            "We do not build or tour branded vehicles, handle street permits or run multi-city truck logistics. We also do not promise credentials, speaking slots or lead numbers. Those depend on organisers and on your offer, and we will tell you plainly when an event is not worth the money.",
          ],
        },
      ],
      faqHeading: "Common questions",
      faq: [
        {
          question: "What does conference sponsorship cost?",
          answer:
            "Estimates only, since many organisers sell through private prospectuses: booth and sponsor packages at tier-one crypto conferences commonly fall somewhere between $15,000 and $50,000, gold tiers can reach $100,000, and the top packages at the largest events go well beyond that. Our own fees depend on how many events and which formats are involved, and we quote after a call.",
        },
        {
          question: "Is a roadshow the same as a truck tour?",
          answer:
            "No. In search results the word usually means a branded vehicle touring several cities, or an investor roadshow before a listing. Ours is a programme of conferences run across a year, with credentials, content and follow-up built around them.",
        },
        {
          question: "Do you guarantee leads or meetings?",
          answer:
            "No. We commit to the process and to reporting the numbers honestly. Conversations at conferences typically take 60 to 180 days to turn into deals, so we judge the follow-up at 30 days and the investment at six months.",
        },
        {
          question: "How many events should a company do in a year?",
          answer:
            "Usually a handful of well-chosen ones rather than as many as possible. Running five events as one programme is more effective than five separate projects, because the capture and follow-up are built once.",
        },
        {
          question: "Can you work with events we have not chosen yet?",
          answer:
            "Yes. Choosing is part of the job. We track 87 conferences across crypto, AI and fintech and can tell you which ones suit your market, and which to skip.",
        },
      ],
      readMoreHeading: "Further reading",
      // Only articles that are published are linked; see the service page.
      readMore: [
        { slug: "the-30-days-after-the-booth", label: "The 30 days after the booth" },
        { slug: "what-a-year-on-the-circuit-costs", label: "What a year on the conference circuit costs" },
        { slug: "which-conferences-are-worth-it-2027", label: "Which conferences are worth it in 2027" },
        { slug: "how-to-get-a-founder-a-speaking-slot", label: "How to get a founder a speaking slot" },
        { slug: "booth-vs-side-event-vs-speaking", label: "Booth, side event or speaking slot" },
      ],
    },
    whyus:
      "We run conferences as a programme, not a one-off. We have attended and written up 25 events, track 87, and publish our coverage in a public press archive, so you can see the work before you talk to us. We tell you plainly when an event is not worth the money.",
    ctaheading: "Plan your conference year",
    ctapara:
      "Tell us which conferences are on your list and what you need them to deliver. We will say plainly which are worth doing, in what format, and what it involves.",
    faq: [],
  },
  {
    id: "blockchain-consulting",
    featured: false,
    maintitle: "Blockchain and Web3 Consulting",
    title: "Blockchain and Web3 Consulting",
    prefix: "Transforming Business",
    suffix: "with blockchain",
    description:
      "Strategic guidance for blockchain integration and Web3 transformation.",
    longDescription: `Our blockchain consulting service provides comprehensive guidance for businesses looking to integrate blockchain technology and transition into Web3. We offer strategic planning, technical architecture design, and implementation roadmaps tailored to your specific needs.`,
    icon: Code,
    isMain: false,
    image: "/services/blockchain.jpg",
    heading1: "Our Comprehensive Blockchain Services",
    para1:
      "A successful blockchain integration starts with expert planning. Our team analyzes your business needs and develops a customized strategy for blockchain adoption that aligns with your objectives.",
    para2:
      "We provide detailed technical architecture designs that ensure seamless integration with your existing systems while maximizing the benefits of blockchain technology.",
    heading2: "Future-Proof Your Business with Web3 Innovation",
    para3:
      "Our Web3 transformation services help businesses transition into the decentralized web ecosystem, opening new opportunities for growth and innovation.",
    para4:
      "We offer ongoing support and consultation to ensure your blockchain implementation continues to deliver value and remains at the cutting edge of technology.",
    whyus:
      "Experienced blockchain specialists with deep technical knowledge. Customized solutions tailored to your specific business needs. Proven track record of successful blockchain integrations. Complete service from strategy development through implementation and beyond. Trusted advisors helping businesses navigate the complexities of Web3.",
    ctaheading: "Let's Transform Your Business with Blockchain",
    ctapara:
      "Partner with Powerclub Global to harness the power of blockchain technology. Contact us today to explore how our blockchain consulting services can drive innovation and growth for your business.",
    faq: [
      {
        question: "What blockchain platforms do you work with?",
        answer:
          "We work with all major blockchain platforms including Ethereum, Solana, Polkadot, and custom enterprise solutions.",
      },
      {
        question: "How can blockchain benefit my business?",
        answer:
          "Blockchain can enhance security, increase transparency, reduce costs, and enable new business models depending on your industry and needs.",
      },
      {
        question: "Do you develop smart contracts?",
        answer:
          "Yes, we offer comprehensive smart contract development, auditing, and deployment services.",
      },
      {
        question: "How long does blockchain integration typically take?",
        answer:
          "Timeline varies based on complexity, but we typically complete projects within 3-6 months from strategy to implementation.",
      },
      {
        question: "Can you help with regulatory compliance?",
        answer:
          "Absolutely, we stay current with blockchain regulations globally and ensure your implementation meets all relevant compliance requirements.",
      },
    ],
  },
  {
    id: "experiences",
    featured: true,
    maintitle: "Experiences",
    title: "for Exceptional",
    prefix: "Your Trusted Partner",
    suffix: "Experiences",
    description:
      "From concept to celebration, we help your events make an impact",
    longDescription: `Events that live long in the memory are guaranteed to succeed, and to ensure this, you need skill, creativity and perfect execution. Powerclub Global is one such event management company, the mission of which is to realize your thoughts into reality, and with care, precision, and passion. Whether you are arranging a business meeting, launching a product, or need help with celebrations of epic proportions we offer very specialist event services in this field.`,
    icon: Users,
    isMain: true,
    image: "/services/experiences.jpg",
    heading1: "Our Comprehensive Event Management Services",
    para1:
      "Success starts with a plan. We craft a detailed event strategy tailored to your goals, audience, and brand identity. We dedicate ourselves to overseeing all the logistical elements that ensure the smooth operation of your event from start to finish.",
    para2:
      "Striking visual designs and cohesive branding have the potential to make an event stunning from beginning to end. Seamless production ensures your event looks and sounds perfect. Understand your event's impact with our detailed post-event analysis.",
    heading2: "Measure Success with Post-Event Insights",
    para3:
      "Understanding your event's impact is key to future growth and success. After the curtains close, we provide a thorough post-event analysis that measures audience engagement, gathers attendee feedback, and evaluates key performance indicators. These insights help you assess ROI, refine future strategies, and continuously elevate your events.",
    para4: "",
    whyus:
      "Organizing an event by designing a plan for and catering to all the requirements of the event is our aim. We have years of experience to make our planners, designers, and coordinators competent people. We look after everything and let you enjoy your time at the event. Our team works on the conception, design, and coordination of an event for every stage before completion.",
    ctaheading: "Let's Create Something Unforgettable",
    ctapara:
      "Collaborate with Powerclub Global to bring your vision to life. Reach out to learn how our Event Management Services would deploy your next event or celebration.",
    faq: [
      {
        question: "What types of events do you organize?",
        answer:
          "We handle everything from corporate events and product launches to roadshows, weddings, and private parties.",
      },
      {
        question: "Can you help with event promotion?",
        answer:
          "Yes, we manage social media, email campaigns, and ads to spread the word and attract guests.",
      },
      {
        question: "Do you take care of the venue and vendors?",
        answer:
          "Absolutely, we help you choose the perfect venue and coordinate with vendors for catering, decor, and more.",
      },
      {
        question: "What if I need help during the event?",
        answer:
          "We're there every step of the way managing logistics, schedules, and any last-minute surprises.",
      },
      {
        question: "How do you make my event special?",
        answer:
          "We customize everything to match your vision, from creative themes to personalized guest experiences.",
      },
    ],
  },
  {
    id: "development",
    featured: false,
    maintitle: "Web Development",
    title: "Business with Expert ",
    prefix: "Transform Your",
    suffix: "Web Development",
    description:
      "Full-stack development solutions from web apps to smart contracts.",
    longDescription: `Powerclub Global is a top web design company, concerned with creating robust, user-friendly, scalable websites that promote business growth. Whether you are aspiring for a corporate look-alike website, already own an e-commerce web application, or need any sort of custom development, our web development services are well suited with your particular IT business course.`,
    icon: Code,
    isMain: true,
    image: "/services/webdev.jpg",
    heading1: "Comprehensive Web Development Services",
    para1:
      "A successful website always involves a detailed plan. Simply stated, our experts study your business, industry, and objectives. This enables us to draw up a web-development strategy that really enhances your brand's image.",
    para2:
      "We can customize high-performing websites that suit your brand identity and goals. Your online store is brimming with eCommerce development solutions that are shaped to ensure the full and effective functioning of sales and consumer experience.",
    heading2: "Boost Visibility with SEO & Web Performance Services",
    para3:
      "If you want the most excellent performance for your site, we can set-up dynamic websites with CMS, for instance, WordPress, Drupal, or Joomla. Assess your business operations better with customized web applications which streamline the processes and enhance the user experience.",
    para4:
      "Our website maintenance and support services will help you keep your site running smoothly. Good website is meaningless until it gets in front of the right target audience. Our combination of SEO optimization and web performance services promises to maintain top search engine positions along with the ability to serve the best experience to website visitors.",
    whyus:
      "Our web development packages are designed for businesses of all sizes. We've skilled developers with extensive experience in multiple technologies. We use insights and analytics to enhance website performance. From design to development, maintenance, and SEO, we handle everything. We are trusted by brands worldwide for delivering high-quality web solutions.",
    ctaheading: "Let's Build Your Dream Website",
    ctapara:
      "Partnering with Powerclub Global can get you a responsive website with the best features. Get in touch with us to start evaluating how our web development services can drive digital growth that is worth celebrating.",
    faq: [
      {
        question: "What services do you offer?",
        answer:
          "We design, build, and maintain websites. We also help with SEO, web performance, and custom web apps.",
      },
      {
        question: "Can you make a website for my small business?",
        answer:
          "Yes, we create websites for businesses of all sizes, big or small.",
      },
      {
        question: "Will my website work on phones and tablets?",
        answer:
          "Absolutely, we make responsive websites that look great on all devices.",
      },
      {
        question: "How do you help my site show up on search engines?",
        answer:
          "We use SEO techniques to improve your site's ranking and visibility online.",
      },
      {
        question: "What if I need help after my site is live?",
        answer:
          "No worries, we offer maintenance and support to keep your site running smoothly.",
      },
    ],
  },
  {
    id: "branding",
    featured: false,
    maintitle: "Branding",
    title: "Branding",
    prefix: "Elevating Your",
    suffix: "identity",
    description: "Comprehensive brand strategy and identity development.",
    longDescription: `We help businesses build and evolve their brand identity through strategic thinking and creative execution. Our branding service covers everything from visual identity and messaging to brand guidelines and implementation strategies.`,
    icon: Palette,
    isMain: false,
    image: "/services/branding.jpg",
    heading1: "Comprehensive Brand Development Services",
    para1:
      "A strong brand starts with strategic thinking. Our experts analyze your business, competition, and target audience to develop a brand strategy that sets you apart and resonates with your customers.",
    para2:
      "We create compelling visual identities including logos, color schemes, typography, and design systems that express your brand's personality and values consistently across all touchpoints.",
    heading2: "Building Brand Equity Through Consistent Messaging",
    para3:
      "Our messaging framework services help define your brand voice, key messages, and communication approach to ensure your brand speaks with clarity and purpose to your audience.",
    para4:
      "We develop comprehensive brand guidelines that document all aspects of your brand identity, ensuring consistent application across all channels and materials for maximum impact.",
    whyus:
      "Experienced brand strategists and creative professionals. Tailored solutions that reflect your unique business values and goals. Data-driven approach to brand development and positioning. Complete brand services from strategy to implementation. Proven track record helping businesses build powerful brand identities.",
    ctaheading: "Let's Elevate Your Brand Identity",
    ctapara:
      "Partner with Powerclub Global to develop a distinctive and powerful brand. Contact us today to explore how our branding services can help your business stand out and connect with your audience.",
    faq: [
      {
        question: "How long does brand development take?",
        answer:
          "Typical brand development projects take 2-3 months from strategy to final deliverables, depending on scope and complexity.",
      },
      {
        question: "Can you refresh my existing brand?",
        answer:
          "Yes, we offer brand refresh services that update and modernize your existing identity while maintaining brand equity.",
      },
      {
        question: "Do you help with brand naming?",
        answer:
          "Absolutely, we provide comprehensive naming services for companies, products, and services.",
      },
      {
        question: "What deliverables can I expect?",
        answer:
          "Depending on your package, deliverables include brand strategy documents, logo files, brand guidelines, messaging frameworks, and design templates.",
      },
      {
        question: "How do you measure brand success?",
        answer:
          "We track key metrics like brand awareness, perception, recall, and engagement to measure your brand's effectiveness.",
      },
    ],
  },
  {
    id: "social-media",
    featured: false,
    maintitle: "Social Media",
    title: "Social Media",
    prefix: "Expert",
    suffix: "Marketing",
    description:
      "Make your brand stand out on social media from strategy to success.",
    longDescription: `Powerclub Global is a top-notch social media marketing agency that creates data-driven strategies that increase engagement, increase brand recognition, and produce quantifiable outcomes. Our social media marketing services are designed to suit the essential needs of any company either boosting an audience, sales, or existing relationships with customers.`,
    icon: Share2,
    isMain: true,
    image: "/services/social-media.jpg",
    heading1: "Comprehensive Social Media Services",
    para1:
      "A good strategy is the heart and soul of fruitful marketing. Our experts specialize in analysis of your brand, its industry, and competition to create a bespoke social media strategy that fits in line with your business goal.",
    para2:
      "The magic word here is 'engaging content'. It pulls in a lot of attention, the job of a social media marketing company is to create high-quality social media content that not only helps resonate with your followers but also gives a good drive to interaction among followers. Maximize your reach and ROI with our solutions for social media advertisement. We run campaigns that yield to lead builds and brand recognition.",
    heading2: "Building Brand Loyalty Through Audience Engagement",
    para3:
      "Our staff of professionals can assure great care and follow-up at all stages of online activity; from start to finish, we guide you the entire way as you enjoy your social media accounts; all for the purpose of concentrating on growing your business. Data-related decision-management provides the foundation of our initiative. We provide a range of social media analysis services, including social media reports to analyze performance and make strategic adjustments.",
    para4:
      "Establishing strong affections with your audience will develop their loyalty towards your brand. Using our services like social engagement, social communities, we certainly safeguard surrounding discussions with your followers. With our influencer marketing service, influencer marketing strategies will be formulated in order to guide the right influencers that contribute with growing your reach.",
    whyus:
      "Professionals with years of experience and insightful industry expertise. Our packages are designed for businesses from all shapes and sizes working with a social media agency. Our strategies are fine-tuned through a veritable fountain of analytical introspections. All from content creation to advertising, to attempt at community management. Backed by the support of leading industry names to showcase their proven results.",
    ctaheading: "Let's Elevate Your Social Media Presence",
    ctapara:
      "Partner with Powerclub Global to leverage social media. Reach out today to see how our social media management company can leave a profound impact on your digital presence and push your business forward.",
    faq: [
      {
        question: "What social media services do you offer?",
        answer:
          "We create posts, run ads, manage accounts, and help grow your brand online.",
      },
      {
        question: "Can you help my business get more followers?",
        answer:
          "Yes, we use strategies to attract the right audience and boost engagement.",
      },
      {
        question: "Which platforms do you work with?",
        answer: "We manage Instagram, Facebook, LinkedIn, Twitter, and more.",
      },
      {
        question: "Do you make content too?",
        answer:
          "Of course, we design visuals, write captions, and create videos that match your brand.",
      },
      {
        question: "How do I know if my campaigns are working?",
        answer:
          "We track performance and share reports so you can see what's working best.",
      },
    ],
  },
  {
    id: "influencer-relations",
    featured: true,
    maintitle: "Influencer Relations",
    title: "Influencer Relations",
    prefix: "Connecting With",
    suffix: "authentically",
    description: "Connecting brands with authentic voices in the industry.",
    longDescription: `We connect your brand with influential voices that align with your values and objectives. Our influencer relations service focuses on building authentic partnerships that drive meaningful engagement and brand advocacy.`,
    icon: MessageSquare,
    isMain: false,
    image: "/services/influencer.jpg",
    heading1: "Strategic Influencer Partnership Development",
    para1:
      "Finding the right influencers is critical for campaign success. Our team identifies and vets potential influencer partners based on audience alignment, engagement metrics, and brand fit to ensure authentic connections.",
    para2:
      "We develop customized influencer campaigns designed to meet your specific business objectives, whether that's increasing brand awareness, driving engagement, or boosting conversions.",
    heading2: "Building Long-term Authentic Influencer Relationships",
    para3:
      "Our approach focuses on cultivating meaningful, long-term relationships between brands and influencers that go beyond one-off promotions to create genuine brand advocacy.",
    para4:
      "We provide comprehensive campaign management, including contract negotiation, content approval, performance tracking, and ROI measurement to ensure maximum impact from your influencer partnerships.",
    whyus:
      "Extensive network of relationships with influencers across various industries and platforms. Data-driven approach to influencer selection and campaign design. Focus on authentic partnerships that resonate with audiences. Complete management from influencer identification to performance analysis. Proven success helping brands leverage influencer marketing effectively.",
    ctaheading: "Let's Connect Your Brand with Authentic Voices",
    ctapara:
      "Partner with Powerclub Global to develop impactful influencer relationships. Contact us today to explore how our influencer relations services can help your brand connect with the right audiences through trusted voices.",
    faq: [
      {
        question: "How do you find the right influencers for my brand?",
        answer:
          "We use a combination of data analysis, relationship networks, and platform expertise to identify influencers whose audiences and values align with your brand.",
      },
      {
        question: "What types of influencers do you work with?",
        answer:
          "We work with all tiers from nano and micro-influencers to macro and celebrity influencers, depending on your goals and budget.",
      },
      {
        question: "How do you measure influencer campaign success?",
        answer:
          "We track metrics including reach, engagement, conversions, and ROI based on your specific campaign objectives.",
      },
      {
        question: "Can you help with influencer content creation?",
        answer:
          "Yes, we provide creative direction and content guidelines while allowing influencers the authenticity their audiences expect.",
      },
      {
        question: "How long do influencer campaigns typically run?",
        answer:
          "Campaign length varies from short promotional pushes to long-term ambassador programs, depending on your objectives.",
      },
    ],
  },
  {
    id: "press-relations",
    featured: true,
    maintitle: "Press Relations",
    title: "Press Relations",
    prefix: "Managing Your",
    suffix: "effectively",
    description: "Strategic media coverage and PR campaign management.",
    longDescription: `Our press relations service helps you build and maintain strong relationships with media outlets and journalists. We develop and execute PR strategies that enhance your brand's visibility and reputation through strategic media placements and communication.`,
    icon: Newspaper,
    isMain: false,
    image: "/services/press.jpg",
    heading1: "Strategic Media Relations Development",
    para1:
      "Building relationships with the right media outlets is essential for effective PR. Our team develops and maintains connections with relevant journalists, editors, and publications to secure valuable coverage for your brand.",
    para2:
      "We create compelling press materials including press releases, media kits, and pitches that effectively communicate your brand's story and news in ways that resonate with media outlets.",
    heading2: "Crisis Management and Reputation Protection",
    para3:
      "Our crisis communication services help you prepare for and navigate challenging situations, protecting your brand's reputation through strategic messaging and media management.",
    para4:
      "We provide comprehensive media monitoring and analysis to track coverage, measure PR effectiveness, and adjust strategies for maximum impact and ROI.",
    whyus:
      "Experienced PR professionals with established media relationships. Strategic approach to press communications and media outreach. Crisis management expertise to protect your brand reputation. Comprehensive services from strategy development to execution and measurement. Proven track record helping brands secure valuable media coverage.",
    ctaheading: "Let's Elevate Your Media Presence",
    ctapara:
      "Partner with Powerclub Global to develop effective press relations. Contact us today to explore how our PR services can help enhance your brand's visibility and reputation through strategic media coverage.",
    faq: [
      {
        question: "How quickly can you help with a PR crisis?",
        answer:
          "We offer rapid response for crisis situations and can typically mobilize within hours of notification.",
      },
      {
        question: "Do you have connections with specific publications?",
        answer:
          "Yes, we maintain relationships with a wide range of media outlets across industries and regions.",
      },
      {
        question: "How often should my company issue press releases?",
        answer:
          "We recommend quality over quantity, typically focusing on significant news, achievements, and announcements rather than a fixed schedule.",
      },
      {
        question: "Can you help improve our executive's public speaking?",
        answer:
          "Absolutely, we offer media training and public speaking coaching for executives and spokespeople.",
      },
      {
        question: "How do you measure PR success?",
        answer:
          "We track metrics including media impressions, share of voice, message penetration, and business impact aligned with your objectives.",
      },
    ],
  },
];
