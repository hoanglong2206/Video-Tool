import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Motion Studio - Video Production Platform",
  description: "AI-native production pipeline orchestrating 3D, motion graphics, and video rendering",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B0F17] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}

