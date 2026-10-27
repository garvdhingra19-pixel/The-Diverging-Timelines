import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fourlandscapes.climate"),
  title: {
    default: "The Four Landscapes · Climate Projections & Human Impact (2025–2100)",
    template: "%s | The Four Landscapes",
  },
  description:
    "Interactive multi-decadal climate scenario simulator tracking four critical Indian landscapes—Gangotri (Mountains), Karnal (Plains), Marathwada (Plateau), and Mumbai (Coast)—under 'carry on' vs 'protect it' pathways with deep-linkable URL state.",
  keywords: [
    "climate change",
    "India climate projections",
    "Gangotri glacier retreat",
    "Karnal groundwater heat stress",
    "Marathwada watershed",
    "Mumbai sea level rise",
    "IPCC AR6",
    "NEX-GDDP-CMIP6",
    "climate adaptation",
  ],
  authors: [{ name: "The Four Landscapes Research Team" }],
  openGraph: {
    title: "The Four Landscapes · Climate Projections & Human Impact (2025–2100)",
    description:
      "Interactive multi-decadal climate scenario simulator tracking four critical landscapes with real NASA & IPCC AR6 downscaled projections.",
    url: "https://fourlandscapes.climate",
    siteName: "The Four Landscapes",
    images: [
      {
        url: "/img/mumbai.webp",
        width: 1280,
        height: 720,
        alt: "The Four Landscapes Climate Projection Simulator",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Four Landscapes · Climate Projections & Human Impact (2025–2100)",
    description:
      "Explore 2025–2100 climate futures across Mountains, Plains, Plateau, and Coast. Data-based projections paired with agency and adaptation.",
    images: ["/img/mumbai.webp"],
  },
};

// Strict CSP permitting local resources and privacy-first Plausible analytics (cookie-free)
const STATIC_CSP =
  "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://tile.openstreetmap.org; font-src 'self' data:; connect-src 'self' https://plausible.io https://tile.openstreetmap.org; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://fourlandscapes.climate/#website",
      "url": "https://fourlandscapes.climate",
      "name": "The Four Landscapes",
      "description":
        "Interactive scientific climate simulation platform tracking Mountains, Plains, Plateau, and Coast in India.",
    },
    {
      "@type": "Dataset",
      "name": "The Four Landscapes Downscaled Regional Climate Synthesis",
      "description":
        "Synthesized regional multi-decadal metrics from NASA NEX-GDDP-CMIP6, NASA Sea Level Projection Tool (IPCC AR6), CGWB, and GSDA.",
      "license": "https://creativecommons.org/licenses/by/4.0/",
      "creator": {
        "@type": "Organization",
        "name": "The Four Landscapes Research Initiative",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <head>
        <meta httpEquiv="Content-Security-Policy" content={STATIC_CSP} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {/* Plausible Privacy-Friendly Analytics (No Cookies, GDPR Compliant, No Cookie Banner Required) */}
        <script
          defer
          data-domain="fourlandscapes.climate"
          src="https://plausible.io/js/script.js"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
        {children}
      </body>
    </html>
  );
}
