import type { Metadata } from "next";

import SocialsClient from "./SocialsClient";

export const metadata: Metadata = {
  title: "Socials",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminSocialsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Socials</h1>
        <p className="mt-1 text-sm text-white/45">
          Connected accounts for the Powerclub Global brand, their token health,
          and the most recent posts the publisher has handled.
        </p>
      </div>
      <SocialsClient />
    </>
  );
}
