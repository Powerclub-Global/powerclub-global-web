import type { Metadata } from "next";

import { getAdminSession } from "@/lib/admin/backend";
import AdminNav from "./AdminNav";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · PCG Admin" },
  robots: { index: false, follow: false },
};

// The shell reads the session cookie, so it can never be statically rendered.
export const dynamic = "force-dynamic";

/**
 * Admin shell. The nav is rendered only for an authenticated admin, which keeps
 * /admin/login (which lives inside this segment) as a bare, chrome-free page.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    return <div className="min-h-screen bg-[#08090c] text-white">{children}</div>;
  }

  const user = session.user;
  const label = user.full_name || user.username || user.email;

  return (
    <div className="min-h-screen bg-[#08090c] text-white">
      <AdminNav userLabel={label} />
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
