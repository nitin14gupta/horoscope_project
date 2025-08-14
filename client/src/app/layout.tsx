import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AstroScope",
    template: "%s | AstroScope",
  },
  description: "AstroScope is a modern astrology platform that provides personalized horoscopes, birth charts, and cosmic insights for each zodiac sign.",
  keywords: [
    "astrology",
    "horoscope",
    "daily horoscope",
    "zodiac sign",
    "birth chart",
    "astrology app",
    "cosmic insights",
  ],
  authors: [{ name: "AstroScope" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://astroscope.com/",
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: "website",
    url: "https://astroscope.com/",
    title: "AstroScope – Modern Astrology & Cosmic Insights",
    description: "AstroScope is a modern astrology platform that provides personalized horoscopes, birth charts, and cosmic insights for each zodiac sign.",
    images: [
      {
        url: "https://astroscope.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "AstroScope app screenshot",
      },
    ],
    siteName: "AstroScope",
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroScope – Modern Astrology & Cosmic Insights",
    description: "Discover AstroScope: Modern astrology platform with personalized horoscopes and cosmic insights.",
    site: "@astroscopeapp",
    images: ["https://astroscope.com/logo.jpeg"],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="bJ8ghdRIhSi2FZ_KKAJn4WYPQN80WZq0uabH4U4vItU" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />

        {/* Structured Data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AstroScope",
              url: "https://astroscope.com",
              logo: "https://astroscope.com/logo.png",
              sameAs: [
                "https://instagram.com/astroscopeofficial",
                "https://twitter.com/astroscopeapp",
              ],
              description: "AstroScope is a modern astrology platform that provides personalized horoscopes, birth charts, and cosmic insights for each zodiac sign.",
              foundingDate: "2025",
              founder: {
                "@type": "Person",
                name: "Nitin Gupta",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-7977876609",
                contactType: "Customer Service",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Andheri East, Mumbai",
                addressLocality: "Mumbai",
                addressRegion: "Maharashtra", 
                addressCountry: "IN",
              },
            }),
          }}
        />

        {/* Structured Data: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://astroscope.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://astroscope.com/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Structured Data: WebPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "AstroScope – Modern Astrology & Cosmic Insights",
              url: "https://astroscope.com",
              description: "AstroScope is a modern astrology platform that provides personalized horoscopes, birth charts, and cosmic insights for each zodiac sign.",
              inLanguage: "en-IN",
              isPartOf: {
                "@type": "WebSite",
                url: "https://astroscope.com",
              },
            }),
          }}
        />
      </head>

      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} bg-charcoal text-foreground antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
