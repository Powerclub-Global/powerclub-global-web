import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import eventsData from "@/data/events.json";
import { getPressReleases } from "@/lib/press";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CopyBlock from "@/components/CopyBlock";

export const metadata: Metadata = pageMetadata({
  title: "Press Kit: Logos, Boilerplate and Partner Listing",
  description:
    "Powerclub Global logos, boilerplate, brand notes and a ready-to-paste partner listing for conference organisers and media.",
  path: "/press-kit",
});

const SHORT =
  "Powerclub Global is a conference impact and media partner for technology companies. Since 2018 it has helped startups turn conference appearances into pipeline through roadshow management, event experiences, press relations and influencer relations. It tracks more than 80 conferences across crypto, AI and fintech and publishes first-hand coverage from the events it attends.";

const LONG =
  "Powerclub Global (PCG) helps technology companies get more from the conference circuit. Since 2018 it has managed conference engagements for startups, from the stage moment and the booth to the content, press and follow-up that compound it. PCG's work covers roadshow management, event experiences, press relations and influencer relations. As a media partner it covers conferences first-hand and publishes the coverage, and as a sponsorship partner it works with organisers to place sponsors and exhibitors and to plan and produce their on-site activations. PCG tracks more than 80 conferences across crypto, AI and fintech. Website: powerclubglobal.com. Press and partnerships: press@powerclubglobal.com.";

const LISTING =
  "Powerclub Global is an official media and sponsorship partner of [Event]. PCG covers the show first-hand and works with the organiser to bring sponsors and exhibitors, and to plan and produce their on-site activations. powerclubglobal.com";

type Logo = { file: string; name: string; note: string; bg: string };

const marks: Logo[] = [
  { file: "/press-kit/pcg-mark-on-black.png", name: "Mark on black", note: "1024 px PNG, black tile.", bg: "bg-[#08090c]" },
  { file: "/press-kit/pcg-mark-on-white.png", name: "Mark on white", note: "1024 px PNG, white tile.", bg: "bg-white" },
  { file: "/press-kit/pcg-mark-transparent-for-dark.png", name: "Mark, transparent, for dark", note: "1024 px PNG. White lettering; use on dark backgrounds.", bg: "bg-[#08090c]" },
  { file: "/press-kit/pcg-mark-transparent-for-light.png", name: "Mark, transparent, for light", note: "1024 px PNG. Black lettering; use on light backgrounds.", bg: "bg-white" },
];

const horizontals: Logo[] = [
  { file: "/press-kit/pcg-horizontal-on-black.png", name: "Horizontal on black", note: "2967 px wide PNG, black background.", bg: "bg-[#08090c]" },
  { file: "/press-kit/pcg-horizontal-on-white.png", name: "Horizontal on white", note: "2967 px wide PNG, white background.", bg: "bg-white" },
  { file: "/press-kit/pcg-horizontal-transparent-for-dark.png", name: "Horizontal, transparent, for dark", note: "White lettering; use on dark backgrounds.", bg: "bg-[#08090c]" },
  { file: "/press-kit/pcg-horizontal-transparent-for-light.png", name: "Horizontal, transparent, for light", note: "Black lettering; use on light backgrounds.", bg: "bg-white" },
];

function LogoCard({ l, wide }: { l: Logo; wide?: boolean }) {
  return (
    <div className="rounded-lg border border-[#ae904c]/25 overflow-hidden">
      <div className={`${l.bg} ${wide ? "aspect-[3/1] p-4" : "aspect-square"} flex items-center justify-center`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={l.file} alt={`Powerclub Global logo, ${l.name.toLowerCase()}`} className="w-full h-full object-contain" />
      </div>
      <div className="p-4">
        <p className="font-semibold text-sm">{l.name}</p>
        <p className="text-white/50 text-xs mt-1 mb-3">{l.note}</p>
        <a href={l.file} download className="text-[#ae904c] text-sm hover:underline underline-offset-4">
          Download PNG
        </a>
      </div>
    </div>
  );
}

export default async function PressKitPage() {
  const tracked = (eventsData.events as unknown[]).length;
  const writeUps = (await getPressReleases().catch(() => [])).length;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl mb-4">Press kit</h1>
          <p className="text-white/60 text-lg max-w-2xl mb-8">
            Logos, boilerplate and a partner listing you can paste into a press or
            partners page. The name is <strong className="text-white">Powerclub Global</strong>, two words.
          </p>
          <a
            href="/press-kit/pcg-press-kit.zip"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ae904c] text-black font-semibold hover:bg-[#c9a95e] transition-colors mb-14"
          >
            <Download className="w-4 h-4" /> Download everything (ZIP)
          </a>

          <h2 className="text-2xl text-[#ae904c] mb-5">Logos</h2>
          <h3 className="text-white font-semibold mb-3">Mark</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {marks.map((l) => (
              <LogoCard key={l.file} l={l} />
            ))}
          </div>
          <h3 className="text-white font-semibold mb-3">Horizontal, with name</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
            {horizontals.map((l) => (
              <LogoCard key={l.file} l={l} wide />
            ))}
          </div>
          <p className="text-white/50 text-sm mb-14">
            Use the transparent files on a plain background of the matching tone. Please do not recolour, stretch or add effects, and leave clear space around the mark of at least the height of the &quot;P&quot;.
            Need a vector or a larger file? Email{" "}
            <a href="mailto:press@powerclubglobal.com" className="text-[#ae904c] underline underline-offset-4">press@powerclubglobal.com</a>.
          </p>

          <h2 className="text-2xl text-[#ae904c] mb-5">Boilerplate</h2>
          <div className="space-y-4 mb-14">
            <CopyBlock label="Short" text={SHORT} />
            <CopyBlock label="Long" text={LONG} />
          </div>

          <h2 className="text-2xl text-[#ae904c] mb-3">For event organisers</h2>
          <p className="text-white/60 mb-5 max-w-2xl">
            If we are a media or sponsorship partner of your event, this is the listing we would like on your press or partners page. Swap in the event name.
          </p>
          <div className="mb-14">
            <CopyBlock label="Partner listing" text={LISTING} />
          </div>

          <h2 className="text-2xl text-[#ae904c] mb-5">Facts</h2>
          <ul className="list-disc pl-6 space-y-2 text-white/75 mb-14">
            <li>Founded 2018. Conference impact management for technology companies.</li>
            <li>Tracks {tracked} conferences across crypto, AI and fintech; {writeUps} first-hand write-ups in the <Link href="/press" className="text-[#ae904c] underline underline-offset-4">press archive</Link>.</li>
            <li>Services: roadshow management, event experiences, press relations, influencer relations.</li>
            <li>Brand colours: black #08090c, gold #ae904c. Typefaces: Cinzel and Montserrat.</li>
          </ul>

          <h2 className="text-2xl text-[#ae904c] mb-5">Contact</h2>
          <p className="text-white/75">
            Press, media and partnerships:{" "}
            <a href="mailto:press@powerclubglobal.com" className="text-[#ae904c] underline underline-offset-4">press@powerclubglobal.com</a>
            <br />
            Sponsorship and client enquiries:{" "}
            <a href="mailto:innovate@powerclubglobal.com" className="text-[#ae904c] underline underline-offset-4">innovate@powerclubglobal.com</a>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
