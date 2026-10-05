import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600"] });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "AURELIA ONE — The Next Address of Luxury Living",
  description: "A private collection of meticulously designed residences in Mumbai. Discover AURELIA ONE by Aurelia Developments.",
  openGraph: {
    title: "AURELIA ONE — The Next Address of Luxury Living",
    description: "A private collection of residences where architecture, light and landscape come together.",
    type: "website",
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"],
  },
};

export const viewport: Viewport = { themeColor: "#171916", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${sans.variable}`}><body>{children}</body></html>;
}
