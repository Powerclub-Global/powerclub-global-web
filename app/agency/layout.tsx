import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grow your business — PowerClub Global",
  description:
    "Your growth partner. We win you more customers, answer every message, and take the busywork off your plate with a hands-on team and smart AI. Book a free strategy call.",
};

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
