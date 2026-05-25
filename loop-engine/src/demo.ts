import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import {
  AuriAgent,
  FakeUserAgent,
  PlaywrightAgent,
  type AuriTransport,
  type FakeUserTransport,
  type PlaywrightTransport,
} from "./agents";
import { Orchestrator, renderReport } from "./orchestrator";

/**
 * Scripted run that exercises the orchestration graph end-to-end against a
 * simulated Powerclub Global target.
 *
 * Scenario:
 *   1. Auri commits a change to /orcha/page.tsx.
 *   2. Playwright finds a broken e2e — fake-user finds the same UX bug.
 *   3. Auri retries — same failure surfaces 3× in a row.
 *   4. Circuit breaker opens on the Ralph Wiggum streak and writes a report.
 */

function scriptedAuri(): AuriTransport {
  let counter = 0;
  return {
    async applyTask(taskId) {
      counter += 1;
      const sha = `feaf00d${counter.toString().padStart(2, "0")}`;
      return {
        sha,
        summary: `attempt ${counter} on task ${taskId}: edited app/orcha/page.tsx`,
      };
    },
  };
}

function scriptedPlaywright(): PlaywrightTransport {
  return {
    async runAgainst(_sha) {
      return {
        ok: false,
        testName: "orcha-download-button-renders",
        topFrame: "app/orcha/page.tsx:42",
        trace: "Expected button[data-testid='download-mac'] to be visible",
      };
    },
  };
}

function scriptedFakeUser(): FakeUserTransport {
  return {
    async stressAgainst(_sha) {
      return {
        ok: false,
        flow: "download-orcha-for-mac",
        symptom: "download CTA does not respond to click",
        repro: "open /orcha → click 'Download for macOS' → nothing happens",
      };
    },
  };
}

async function main(): Promise<void> {
  const orchestrator = new Orchestrator({
    mode: "reactive",
    agents: [
      new AuriAgent(scriptedAuri()),
      new PlaywrightAgent(scriptedPlaywright()),
      new FakeUserAgent(scriptedFakeUser()),
    ],
    breakerConfig: {
      identicalFailureStreakLimit: 3,
      totalFailureLimit: 25,
      progressWindowLimit: 5,
      cooldownMs: 60_000,
    },
  });

  const report = await orchestrator.kickoff("orcha-download-button");
  const rendered = renderReport(report);

  const reportsDir = join(__dirname, "..", "reports");
  mkdirSync(reportsDir, { recursive: true });
  const path = join(reportsDir, `run-${report.startedAt}.md`);
  writeFileSync(path, rendered, "utf8");

  console.log("\n--- REPORT ---\n");
  console.log(rendered);
  console.log(`\nReport written to ${path}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
