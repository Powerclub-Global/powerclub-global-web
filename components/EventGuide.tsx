import type { EventGuide } from "@/types/eventGuides";

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-white/70 text-sm">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

// Plain markup on purpose: this is the content search engines index for
// "[event] sponsorship cost" and "is [event] worth it", so it renders on the
// server with no animation wrapper.
export default function EventGuideBlock({ guide, eventName }: { guide: EventGuide; eventName: string }) {
  return (
    <section
      aria-labelledby={`guide-${guide.eventId}`}
      className="bg-gradient-to-br from-[#ae904c]/10 to-black/40 border border-[#ae904c]/30 rounded-xl p-8"
    >
      <h2 id={`guide-${guide.eventId}`} className="text-xl font-semibold text-[#ae904c] mb-4">
        Is {eventName} worth it?
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{guide.verdict}</p>

      <h3 className="text-white font-semibold mb-2">Tickets</h3>
      <p className="text-white/70 text-sm leading-relaxed mb-1">
        {guide.costs.ticket ?? "Ticket prices are not published yet."}
      </p>
      <p className="text-white/40 text-xs mb-6">
        {guide.costs.note ?? "Estimates from public pricing; check the organiser for current prices."} Sponsorship and exhibition packages are discussed privately with PCG.
      </p>

      <h3 className="text-white font-semibold mb-2">Who attends</h3>
      <p className="text-white/70 text-sm leading-relaxed mb-6">{guide.attendees}</p>

      <h3 className="text-white font-semibold mb-2">Side events</h3>
      <p className="text-white/70 text-sm leading-relaxed mb-6">{guide.sideEvents}</p>

      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-white font-semibold mb-2">Worth it if</h3>
          <List items={guide.worthItFor} />
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Skip it if</h3>
          <List items={guide.skipIf} />
        </div>
      </div>

      <h3 className="text-white font-semibold mb-2">What PCG does here</h3>
      <p className="text-white/70 text-sm leading-relaxed mb-6">{guide.pcgAngle}</p>

      {guide.sources.length > 0 && (
        <p className="text-white/40 text-xs">
          Checked {new Date(guide.updated).toLocaleDateString("en-US", { month: "long", year: "numeric" })} against:{" "}
          {guide.sources.map((s, i) => (
            <span key={s.url}>
              {i > 0 && ", "}
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#ae904c]">
                {s.label}
              </a>
            </span>
          ))}
        </p>
      )}
    </section>
  );
}
