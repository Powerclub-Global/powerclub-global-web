import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://powerclubglobal.com"),
  title: {
    default: "Powerclub Global — Conference Impact & Momentum Infrastructure",
    template: "%s · Powerclub Global",
  },
  description:
    "PCG manages high-impact conference engagements for technology startups — and builds the momentum engine that turns the event into pipeline, content, and revenue.",
  openGraph: {
    type: "website",
    siteName: "Powerclub Global",
    url: "https://powerclubglobal.com",
    title: "Powerclub Global — Conference Impact & Momentum Infrastructure",
    description:
      "We create your conference moment — and build the machine that captures it.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Powerclub Global" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Powerclub Global — Conference Impact & Momentum Infrastructure",
    description:
      "We create your conference moment — and build the machine that captures it.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "/" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Powerclub Global",
  alternateName: "PCG",
  url: "https://powerclubglobal.com",
  logo: "https://powerclubglobal.com/logo-black.png",
  foundingDate: "2018",
  founder: { "@type": "Person", name: "Jessy Artman" },
  description:
    "Conference impact agency for technology startups: high-impact event engagements, afterparties, and the post-event momentum infrastructure that converts them into pipeline.",
  email: "innovate@powerclubglobal.com",
  address: { "@type": "PostalAddress", addressLocality: "Miami", addressRegion: "FL", addressCountry: "US" },
  sameAs: [
    "https://x.com/powerclubglobal",
    "https://www.instagram.com/powerclub.global/",
    "https://www.youtube.com/@powerclubglobal",
    "https://www.facebook.com/p/Powerclub-Global-100093219199164/",
    "https://t.me/powerclubglboal",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
