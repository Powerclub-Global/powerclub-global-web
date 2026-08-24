"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  /** Modules that are planned but not built yet render as inert placeholders. */
  ready: boolean;
}

/**
 * The admin shell's module nav. Every module the admin area will grow into is
 * listed here; flip `ready` to true as each one lands.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/admin", ready: true },
  { label: "Leads", href: "/admin/leads", ready: true },
  { label: "Discovery Calls", href: "/admin/discovery-calls", ready: true },
  { label: "Conference Leads", href: "/admin/conference-leads", ready: true },
  { label: "Socials", href: "/admin/socials", ready: false },
  { label: "Content Calendar", href: "/admin/content-calendar", ready: false },
];

export default function AdminNav({ userLabel }: { userLabel: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#08090c]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-sm font-bold tracking-tight text-white"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#ae904c]" />
          PCG Admin
        </Link>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            if (!item.ready) {
              return (
                <span
                  key={item.href}
                  className="cursor-not-allowed text-white/25"
                  title="Coming soon"
                >
                  {item.label}
                </span>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-[#ae904c]"
                    : "text-white/60 transition-colors hover:text-white"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <span className="text-xs text-white/45">{userLabel}</span>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-[#ae904c]/50 hover:text-white disabled:opacity-50"
          >
            <LogOut className="h-3.5 w-3.5" />
            {loggingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </div>
    </header>
  );
}
