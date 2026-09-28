import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ScheduleCallClient from "./ScheduleCallClient";

export const metadata: Metadata = pageMetadata({
  title: "Schedule a Call with Powerclub Global",
  description:
    "Book a 30-minute call with Powerclub Global about a conference sponsorship, media partnership, speaking slot, or anything else — pick a real time on our calendar.",
  path: "/schedule-call",
});

export default function ScheduleCallPage() {
  return <ScheduleCallClient />;
}
