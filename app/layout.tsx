import type { Metadata } from "next";
import { Inter, Playfair_Display, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "LUXE VISION | Premium Eyewear",
  description: "Discover our collection of luxury sunglasses designed for those who appreciate exceptional craftsmanship and timeless elegance.",
  keywords: ["luxury sunglasses", "premium eyewear", "designer sunglasses", "polarized sunglasses"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} ${bodoni.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
