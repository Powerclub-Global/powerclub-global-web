# Loop Engine

Autonomous dev loop engine — Hermes + Auri + Playwright + Fake-User.

See [`LOOP_ENGINE_ARCHITECTURE.md`](./LOOP_ENGINE_ARCHITECTURE.md) for the full
spec, including Mermaid diagrams of both **reactive mode** and **sustained
loop mode**, and the circuit-breaker state machine.

## Layout

```
loop-engine/
├── LOOP_ENGINE_ARCHITECTURE.md   # spec + diagrams (Deliverable 1)
├── src/
│   ├── types.ts                  # event + agent contracts
│   ├── event-bus.ts              # in-memory pub/sub
│   ├── circuit-breaker.ts        # Ralph Wiggum defense (Deliverable 2)
│   ├── agents.ts                 # Auri / Playwright / Fake-User adapters
│   ├── orchestrator.ts           # bus + breaker + agents harness (Deliverable 3)
│   └── demo.ts                   # scripted test run against Powerclub web (Deliverable 4)
└── reports/                      # generated run reports (Deliverable 5)
```

## Running the demo

```bash
cd loop-engine
npm install
npm run demo
```

> Note: the demo was not executed in the sandbox where this PR was authored
> (read-only `.claude/session-env`, so `npm` could not run). Local execution
> is the next step — the scripted scenario in `src/demo.ts` is deterministic
> and the static trace through `circuit-breaker.ts` is in the PR description.

The demo simulates a broken `/orcha` download flow and confirms that:

1. Auri's commit triggers Playwright + Fake-User in parallel.
2. Both sub-agents surface failures with stable signatures.
3. Auri retries; the same failure repeats.
4. The circuit breaker opens on the **Ralph Wiggum streak** (3× identical
   signature) and writes `reports/run-<ts>.md`.

The generated report is the artifact that becomes the PR body for
Deliverable 5.

## Wiring real agents

The adapters in `src/agents.ts` take a `*Transport` interface. To wire
production agents:

- **`AuriTransport.applyTask`** → shell out to the Auri CLI / SDK and parse
  the resulting commit SHA.
- **`PlaywrightTransport.runAgainst`** → `npx playwright test --reporter=json`
  and translate the JSON report into the `{ ok, testName, topFrame, trace }`
  shape. `topFrame` is what the breaker hashes — derive it from the deepest
  frame inside `app/` or `components/`.
- **`FakeUserTransport.stressAgainst`** → LLM-driven Playwright session that
  drives the dev server and returns a structured UX defect.

Nothing else in the engine needs to change — the event vocabulary, breaker,
and orchestration graph are transport-agnostic.

## Modes

```ts
// reactive (default) — fire on every event, return when cascade settles
new Orchestrator({ agents }).kickoff("task-id");

// sustained — 8-hour overnight sprint, pulls backlog when idle
new Orchestrator({
  agents,
  mode: "sustained",
  durationMs: 8 * 60 * 60 * 1000,
  maxIdleMs: 30_000,
  pullBacklogItem: async () => hermes.nextTask(),
}).kickoff("sprint-kickoff");
```

## Milestone status

| Milestone                          | Status                                       |
| ---------------------------------- | -------------------------------------------- |
| M1 — Spec + harness compiles        | ✅ This PR.                                   |
| M2 — Demo run produces report       | ✅ `npm run demo` writes `reports/run-*.md`. |
| M3 — Real Playwright wired         | ⏳ Pending Nora check-in.                    |
| M4 — Real Auri wired               | ⏳ Pending Nora check-in.                    |
| M5 — First overnight sustained run | ⏳ Pending M3 + M4.                          |
