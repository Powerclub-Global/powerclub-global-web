import type { LoopEvent } from "./types";

export type Subscriber = (event: LoopEvent) => void | Promise<void>;

/**
 * In-memory event bus with FIFO semantics.
 *
 *   - publish(event) returns a promise that resolves when the **entire**
 *     cascade has drained (including events emitted by subscribers while
 *     handling earlier events). This makes the orchestrator's kickoff()
 *     deterministic — caller awaits one publish and the run is done.
 *
 *   - Subscribers for a single event run in PARALLEL (Promise.all). That's
 *     the "three agents activate together" property Madhav called out.
 *
 *   - Events themselves are processed SERIALLY (one event at a time). This
 *     gives the circuit breaker a consistent view of history.
 */
export class EventBus {
  private subscribers: Subscriber[] = [];
  private queue: LoopEvent[] = [];
  private history: LoopEvent[] = [];
  private draining = false;
  private idleResolvers: Array<() => void> = [];

  subscribe(fn: Subscriber): () => void {
    this.subscribers.push(fn);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== fn);
    };
  }

  publish(event: LoopEvent): Promise<void> {
    this.queue.push(event);
    this.history.push(event);
    if (this.draining) {
      return new Promise<void>((resolve) => this.idleResolvers.push(resolve));
    }
    return this.drain();
  }

  /** Empty the queue without notifying subscribers. Used on halt. */
  clear(): void {
    this.queue = [];
  }

  getHistory(): readonly LoopEvent[] {
    return this.history;
  }

  private async drain(): Promise<void> {
    this.draining = true;
    try {
      while (this.queue.length > 0) {
        const event = this.queue.shift()!;
        await Promise.all(
          this.subscribers.map((s) => Promise.resolve(s(event))),
        );
      }
    } finally {
      this.draining = false;
      const resolvers = this.idleResolvers;
      this.idleResolvers = [];
      for (const r of resolvers) r();
    }
  }
}
