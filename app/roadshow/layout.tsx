import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conference Roadshows & Side Events — PowerClub Global",
  description:
    "We make startups unmissable at the world's biggest conferences. End-to-end roadshow production, side events, influencer & press relations, branding, and real-time content — handled for you.",
};

export default function RoadshowLayout({ children }: { children: React.ReactNode }) {
  return children;
}
