import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise — The Sovereign Stack | PowerClub Global",
  description:
    "Run your enterprise on infrastructure you own, not rent. Private AI, sovereign data, and your own deployment of the Sovereign Stack — architected, deployed, and operated with you.",
};

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
