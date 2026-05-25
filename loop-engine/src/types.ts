export type AgentKind = "auri" | "playwright" | "fake-user";

export type EventKind =
  | "task_kickoff"
  | "commit_pushed"
  | "agent_blocked"
  | "test_passed"
  | "test_failed"
  | "ux_failure"
  | "ux_passed"
  | "halt_requested";

export interface LoopEvent {
  kind: EventKind;
  source: AgentKind | "orchestrator" | "human";
  ts: number;
  payload: Record<string, unknown>;
  /** Stable hash used by the circuit breaker to detect identical-failure streaks. */
  signature?: string;
}

export interface AgentContext {
  emit: (event: Omit<LoopEvent, "ts">) => void;
  log: (msg: string) => void;
}

export interface Agent {
  kind: AgentKind;
  handle: (event: LoopEvent, ctx: AgentContext) => Promise<void>;
}

export type BreakerState = "closed" | "open" | "half_open";

export interface BreakerConfig {
  identicalFailureStreakLimit: number;
  totalFailureLimit: number;
  progressWindowLimit: number;
  cooldownMs: number;
}

export interface BreakerSnapshot {
  state: BreakerState;
  totalFailures: number;
  identicalStreak: number;
  lastSignature?: string;
  cyclesSinceProgress: number;
  openedAt?: number;
  openReason?: string;
}

export interface RunReport {
  startedAt: number;
  endedAt: number;
  mode: "reactive" | "sustained";
  finalState: BreakerSnapshot;
  events: LoopEvent[];
  haltReason: string;
  lastGoodCommit?: string;
  recommendedNextAction: string;
}
