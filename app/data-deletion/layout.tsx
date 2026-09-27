import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Data Deletion Request",
  description:
    "Request deletion of your personal data held by Powerclub Global and check the status of an existing request.",
  path: "/data-deletion",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
