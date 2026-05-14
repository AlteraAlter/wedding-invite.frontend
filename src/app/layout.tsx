import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Noto_Sans } from "next/font/google";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

const bodyFont = Noto_Sans({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

const scriptFont = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Заринаның ұзату тойы | Jaiyq Hall",
  description: "01.08.2026 күні сағат 19:00-де өтетін Заринаның ұзату тойына арналған шақыру парағы.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="kk"
      className={`${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
