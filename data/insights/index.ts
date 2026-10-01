import type { Insight } from "@/types/insights";
import the30Days from "./the-30-days-after-the-booth";
import yearCost from "./what-a-year-on-the-circuit-costs";
import worthIt from "./which-conferences-are-worth-it-2027";
import speakingSlot from "./how-to-get-a-founder-a-speaking-slot";
import boothVsSide from "./booth-vs-side-event-vs-speaking";

/** One file per article; list them here, newest first. */
export const insights: Insight[] = [the30Days, yearCost, worthIt, speakingSlot, boothVsSide];
