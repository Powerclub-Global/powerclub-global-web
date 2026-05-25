import { CircuitBreaker, DEFAULT_BREAKER_CONFIG } from "./circuit-breaker";
import { EventBus } from "./event-bus";
import type {
  Agent,
  AgentContext,
  BreakerConfig,
  LoopEvent,
  RunReport,
} from "./types";

export interface OrchestratorOptions {
  agents: Agent[];
  breakerConfig?: BreakerConfig;
  mode?: "reactive" | "sustained";
  /** Sustained mode only: hard wallclock budget. */
  durationMs?: number;
  /** Sustained mode only: if idle this long, pull next backlog item. */
  maxIdleMs?: number;
  /** Sustained mode only: returns the next task to dispatch, or null when drained. */
  pullBacklogItem?: () => Promise<{ taskId: string } | null>;
  /** Sink for human-readable logs. Defaults to console. */
  logger?: (msg: string) => void;
}

export class Orchestrator {
  private readonly bus = new EventBus();
  private readonly breaker: CircuitBreaker;
  private readonly mode: "reactive" | "sustained";
  private readonly durationMs?: number;
  private readonly maxIdleMs?: number;
  private readonly pullBacklogItem?: OrchestratorOptions["pullBacklogItem"];
  private readonly logger: (msg: string) => void;
  private lastEventAt = Date.now();
  private startedAt = 0;
  private halted = false;
  private haltReason = "";

  constructor(opts: OrchestratorOptions) {
    this.breaker = new CircuitBreaker(opts.breakerConfig ?? DEFAULT_BREAKER_CONFIG);
    this.mode = opts.mode ?? "reactive";
    this.durationMs = opts.durationMs;
    this.maxIdleMs = opts.maxIdleMs;
    this.pullBacklogItem = opts.pullBacklogItem;
    this.logger = opts.logger ?? ((m) => console.log(m));

    for (const agent of opts.agents) {
      this.bus.subscribe(async (event) => {
        if (this.halted) return;
        const ctx = this.contextFor(agent);
        try {
          await agent.handle(event, ctx);
        } catch (err) {
          this.logger(`[${agent.kind}] handler error: ${String(err)}`);
        }
      });
    }

    // Breaker subscribes alongside agents. The bus dispatches all
    // subscribers in parallel per event, so the breaker observes each event
    // independently of agent timing. Downstream emissions land on the next
    // iteration of the queue, so the breaker's view of history is consistent.
    this.bus.subscribe((event) => {
      this.lastEventAt = Date.now();
      const obs = this.breaker.observe(event);
      if (obs.shouldHalt && !this.halted) {
        this.halted = true;
        this.haltReason = obs.haltReason ?? "breaker open";
        this.bus.clear();
        this.logger(`[breaker] HALT — ${this.haltReason}`);
      }
    });
  }

  async kickoff(taskId: string): Promise<RunReport> {
    this.startedAt = Date.now();
    this.lastEventAt = this.startedAt;

    // Reactive: bus.publish returns when the entire cascade has drained.
    await this.publish({
      kind: "task_kickoff",
      source: "human",
      payload: { taskId },
    });

    if (this.mode === "sustained") {
      await this.pump();
    }
    return this.buildReport();
  }

  /**
   * Sustained-mode pump: keep the loop alive until either the breaker halts,
   * the wallclock deadline is hit, or the backlog drains and we've been idle
   * past `maxIdleMs`.
   */
  private async pump(): Promise<void> {
    const deadline = this.durationMs ? this.startedAt + this.durationMs : Infinity;
    const idleCap = this.maxIdleMs ?? 30_000;

    while (!this.halted) {
      const now = Date.now();
      if (now >= deadline) {
        this.halted = true;
        this.haltReason = "wallclock deadline reached";
        this.logger("[orchestrator] deadline reached — halting");
        break;
      }
      const idleFor = now - this.lastEventAt;
      if (idleFor >= idleCap) {
        if (!this.pullBacklogItem) {
          this.halted = true;
          this.haltReason = "idle with no backlog source configured";
          break;
        }
        const next = await this.pullBacklogItem();
        if (!next) {
          this.halted = true;
          this.haltReason = "backlog drained";
          break;
        }
        await this.publish({
          kind: "task_kickoff",
          source: "orchestrator",
          payload: { taskId: next.taskId },
        });
      } else {
        await sleep(Math.min(1000, idleCap - idleFor));
      }
    }
  }

  private async publish(event: Omit<LoopEvent, "ts">): Promise<void> {
    if (this.halted) return;
    await this.bus.publish({ ...event, ts: Date.now() });
  }

  private contextFor(agent: Agent): AgentContext {
    return {
      emit: (event) => {
        // Queue the event; the bus serializes processing. We don't need to
        // await — the outer drain loop will pick it up.
        void this.publish(event);
      },
      log: (msg) => this.logger(`[${agent.kind}] ${msg}`),
    };
  }

  private buildReport(): RunReport {
    const events = [...this.bus.getHistory()];
    const lastGoodCommit = [...events]
      .reverse()
      .find((e) => e.kind === "commit_pushed")
      ?.payload.sha as string | undefined;
    const snapshot = this.breaker.snapshot();
    return {
      startedAt: this.startedAt,
      endedAt: Date.now(),
      mode: this.mode,
      finalState: snapshot,
      events,
      haltReason: this.haltReason || "completed",
      lastGoodCommit,
      recommendedNextAction: recommendNext(snapshot, this.haltReason),
    };
  }
}

function recommendNext(
  snapshot: ReturnType<CircuitBreaker["snapshot"]>,
  haltReason: string,
): string {
  if (snapshot.state !== "open") return "no action — run completed cleanly";
  if (haltReason.startsWith("Ralph Wiggum")) {
    return "human review: same failure repeated — bisect or revert last good commit";
  }
  if (haltReason.startsWith("no forward progress")) {
    return "human review: commits landed but tests/UX never recovered — inspect last commit";
  }
  if (haltReason.includes("total failure cap")) {
    return "human review: noisy run — tighten task scope or relax tests";
  }
  if (haltReason === "wallclock deadline reached") {
    return "schedule next sprint — engine ran to deadline without crashing";
  }
  return "human review: see events log";
}

function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export function renderReport(report: RunReport): string {
  const durationMin = Math.max(0, (report.endedAt - report.startedAt) / 60_000);
  const lines: string[] = [];
  lines.push(`# Loop Engine Run Report`);
  lines.push("");
  lines.push(`- **Mode:** ${report.mode}`);
  lines.push(`- **Duration:** ${durationMin.toFixed(2)} min`);
  lines.push(`- **Halt reason:** ${report.haltReason}`);
  lines.push(`- **Final breaker state:** ${report.finalState.state}`);
  lines.push(`- **Total failures:** ${report.finalState.totalFailures}`);
  lines.push(`- **Identical-failure streak at halt:** ${report.finalState.identicalStreak}`);
  if (report.lastGoodCommit) {
    lines.push(`- **Last good commit:** \`${report.lastGoodCommit}\``);
  }
  lines.push(`- **Recommended next action:** ${report.recommendedNextAction}`);
  lines.push("");
  lines.push(`## Event Log (${report.events.length})`);
  lines.push("");
  lines.push("| ts | source | kind | signature |");
  lines.push("| --- | --- | --- | --- |");
  for (const e of report.events) {
    const t = new Date(e.ts).toISOString().slice(11, 19);
    lines.push(`| ${t} | ${e.source} | ${e.kind} | ${e.signature ?? ""} |`);
  }
  return lines.join("\n");
}
