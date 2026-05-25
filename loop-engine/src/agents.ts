import type { Agent, AgentContext, LoopEvent } from "./types";
import { buildSignature } from "./circuit-breaker";

/**
 * Adapters for the three sub-agents. Each adapter wraps an underlying
 * transport (CLI subprocess, playwright runner, LLM-driven UI driver) and
 * speaks the orchestrator's event vocabulary.
 *
 * The prototype implementations are scripted stubs — they let us exercise the
 * orchestration graph and circuit breaker without standing up the full agent
 * fleet. The `transport` field is the swap point for production wiring.
 */

export interface AuriTransport {
  /** Implement: drive the real Auri coding agent (CLI, SDK, or process). */
  applyTask: (taskId: string) => Promise<{ sha: string; summary: string }>;
}

export interface PlaywrightTransport {
  /** Implement: invoke `npx playwright test` and parse results. */
  runAgainst: (sha: string) => Promise<
    | { ok: true }
    | { ok: false; testName: string; topFrame: string; trace: string }
  >;
}

export interface FakeUserTransport {
  /** Implement: drive realistic UX flows via LLM-controlled browser. */
  stressAgainst: (sha: string) => Promise<
    | { ok: true }
    | { ok: false; flow: string; symptom: string; repro: string }
  >;
}

export class AuriAgent implements Agent {
  readonly kind = "auri" as const;
  constructor(private readonly transport: AuriTransport) {}

  async handle(event: LoopEvent, ctx: AgentContext): Promise<void> {
    if (event.kind !== "task_kickoff" && event.kind !== "test_failed" && event.kind !== "ux_failure") {
      return;
    }
    const taskId = String(event.payload.taskId ?? event.payload.failureId ?? "ad-hoc");
    ctx.log(`auri: working on ${taskId}`);
    try {
      const result = await this.transport.applyTask(taskId);
      ctx.emit({
        kind: "commit_pushed",
        source: "auri",
        payload: { sha: result.sha, summary: result.summary, taskId },
      });
    } catch (err) {
      ctx.emit({
        kind: "agent_blocked",
        source: "auri",
        payload: { taskId, error: String(err) },
        signature: buildSignature(["auri_blocked", taskId, String(err).slice(0, 64)]),
      });
    }
  }
}

export class PlaywrightAgent implements Agent {
  readonly kind = "playwright" as const;
  constructor(private readonly transport: PlaywrightTransport) {}

  async handle(event: LoopEvent, ctx: AgentContext): Promise<void> {
    if (event.kind !== "commit_pushed") return;
    const sha = String(event.payload.sha);
    ctx.log(`playwright: testing ${sha.slice(0, 7)}`);
    const res = await this.transport.runAgainst(sha);
    if (res.ok) {
      ctx.emit({ kind: "test_passed", source: "playwright", payload: { sha } });
    } else {
      ctx.emit({
        kind: "test_failed",
        source: "playwright",
        payload: { sha, testName: res.testName, trace: res.trace },
        signature: buildSignature(["pw", res.testName, res.topFrame]),
      });
    }
  }
}

export class FakeUserAgent implements Agent {
  readonly kind = "fake-user" as const;
  constructor(private readonly transport: FakeUserTransport) {}

  async handle(event: LoopEvent, ctx: AgentContext): Promise<void> {
    if (event.kind !== "commit_pushed") return;
    const sha = String(event.payload.sha);
    ctx.log(`fake-user: stress-testing ${sha.slice(0, 7)}`);
    const res = await this.transport.stressAgainst(sha);
    if (res.ok) {
      ctx.emit({ kind: "ux_passed", source: "fake-user", payload: { sha } });
    } else {
      ctx.emit({
        kind: "ux_failure",
        source: "fake-user",
        payload: { sha, flow: res.flow, symptom: res.symptom, repro: res.repro },
        signature: buildSignature(["ux", res.flow, res.symptom]),
      });
    }
  }
}
