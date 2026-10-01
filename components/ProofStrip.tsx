import Link from "next/link";

export interface ProofCounts {
  tracked: number;
  upcoming: number;
  writeUps: number;
}

// Plain, countable facts about the work, pulled from the same data the site
// renders elsewhere so the numbers cannot drift from the pages they link to.
export default function ProofStrip({ tracked, upcoming, writeUps }: ProofCounts) {
  const items = [
    { value: tracked, label: "conferences tracked across crypto, AI and fintech", href: "/conferences" },
    { value: upcoming, label: "on the calendar from here to 2027", href: "/conferences" },
    { value: writeUps, label: "first-hand write-ups from events we attended", href: "/press" },
  ];
  return (
    <section className="w-full px-4 py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#ae904c]/20 rounded-xl overflow-hidden border border-[#ae904c]/20">
        {items.map((it) => (
          <Link
            key={it.label}
            href={it.href}
            className="bg-black px-6 py-7 hover:bg-[#ae904c]/5 transition-colors"
          >
            <p className="text-4xl text-[#ae904c] font-semibold">{it.value}</p>
            <p className="mt-2 text-white/65 text-sm">{it.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
