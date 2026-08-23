import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Conference Impact & Momentum Infrastructure",
  description:
    "PCG creates your conference moment — keynotes, activations, and roadshow presence — then builds the momentum engine that turns the event into pipeline, content, and revenue.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Conference Impact & Momentum Infrastructure",
    description:
      "PCG creates your conference moment — then builds the machine that captures it.",
  },
};

export default function Home() {
  return <HomeClient />;
}
