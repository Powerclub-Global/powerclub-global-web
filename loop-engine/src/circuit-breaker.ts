import type {
  BreakerConfig,
  BreakerSnapshot,
  BreakerState,
  LoopEvent,
} from "./types";

export const DEFAULT_BREAKER_CONFIG: BreakerConfig = {
  identicalFailureStreakLimit: 3,
  totalFailureLimit: 25,
  progressWindowLimit: 5,
  cooldownMs: 60_000,
};

const FAILURE_KINDS: ReadonlySet<LoopEvent["kind"]> = new Set([
  "test_failed",
  "ux_failure",
  "agent_blocked",
]);

/**
 * Real progress = something verified green. A bare `commit_pushed` is intent,
 * not progress — it might immediately fail. This is critical: if commits
 * counted as progress, an Auri-retry loop that never lands a green test would
 * keep resetting the breaker and burn credits forever.
 */
const PROGRESS_KINDS: ReadonlySet<LoopEvent["kind"]> = new Set([
  "test_passed",
  "ux_passed",
]);

export interface BreakerObservation {
  shouldHalt: boolean;
  snapshot: BreakerSnapshot;
  /** Populated when the breaker just transitioned to `open`. */
  haltReason?: string;
}

export class CircuitBreaker {
  private state: BreakerState = "closed";
  private totalFailures = 0;
  /** Per-signature recurrence count. Catches A,B,A,B,A,B alternation that a
   *  last-signature-only check would miss. */
  private signatureCounts: Map<string, number> = new Map();
  private identicalStreak = 0;
  private lastSignature?: string;
  private cyclesSinceProgress = 0;
  private openedAt?: number;
  private openReason?: string;

  constructor(private readonly config: BreakerConfig = DEFAULT_BREAKER_CONFIG) {}

  observe(event: LoopEvent, now: number = Date.now()): BreakerObservation {
    if (this.state === "open") {
      return { shouldHalt: true, snapshot: this.snapshot() };
    }

    if (event.kind === "halt_requested") {
      return this.trip(now, "explicit halt requested");
    }

    if (PROGRESS_KINDS.has(event.kind)) {
      this.cyclesSinceProgress = 0;
      this.identicalStreak = 0;
      this.lastSignature = undefined;
      this.signatureCounts.clear();
      // A successful cycle in half_open closes the breaker.
      if (this.state === "half_open") this.state = "closed";
      return { shouldHalt: false, snapshot: this.snapshot() };
    }

    if (FAILURE_KINDS.has(event.kind)) {
      this.totalFailures += 1;
      this.cyclesSinceProgress += 1;

      const sig = event.signature ?? "<unsigned>";
      const recurrence = (this.signatureCounts.get(sig) ?? 0) + 1;
      this.signatureCounts.set(sig, recurrence);

      // Sequential identical-streak tracking (back-to-back same signature).
      if (sig === this.lastSignature) {
        this.identicalStreak += 1;
      } else {
        this.identicalStreak = 1;
        this.lastSignature = sig;
      }

      if (recurrence >= this.config.identicalFailureStreakLimit) {
        return this.trip(
          now,
          `Ralph Wiggum: ${recurrence}× same failure signature (${sig})`,
        );
      }
      if (this.totalFailures >= this.config.totalFailureLimit) {
        return this.trip(
          now,
          `total failure cap reached (${this.totalFailures}/${this.config.totalFailureLimit})`,
        );
      }
      if (this.cyclesSinceProgress >= this.config.progressWindowLimit) {
        return this.trip(
          now,
          `no forward progress in ${this.cyclesSinceProgress} cycles`,
        );
      }
    }

    return { shouldHalt: false, snapshot: this.snapshot() };
  }

  /**
   * Allow a single trial cycle to determine whether the underlying problem
   * has cleared. Called by the orchestrator after `cooldownMs`.
   */
  attemptRecovery(now: number = Date.now()): BreakerSnapshot {
    if (
      this.state === "open" &&
      this.openedAt !== undefined &&
      now - this.openedAt >= this.config.cooldownMs
    ) {
      this.state = "half_open";
      this.identicalStreak = 0;
      this.lastSignature = undefined;
      this.cyclesSinceProgress = 0;
      this.signatureCounts.clear();
    }
    return this.snapshot();
  }

  snapshot(): BreakerSnapshot {
    return {
      state: this.state,
      totalFailures: this.totalFailures,
      identicalStreak: this.identicalStreak,
      lastSignature: this.lastSignature,
      cyclesSinceProgress: this.cyclesSinceProgress,
      openedAt: this.openedAt,
      openReason: this.openReason,
    };
  }

  private trip(now: number, reason: string): BreakerObservation {
    this.state = "open";
    this.openedAt = now;
    this.openReason = reason;
    return {
      shouldHalt: true,
      haltReason: reason,
      snapshot: this.snapshot(),
    };
  }
}

/**
 * Hash-free signature builder. Stable enough for streak detection without a
 * crypto dep — collisions across unrelated failure kinds are deliberately
 * cheap to construct.
 */
export function buildSignature(parts: Array<string | number | undefined>): string {
  return parts.filter((p) => p !== undefined && p !== "").join("::");
}
