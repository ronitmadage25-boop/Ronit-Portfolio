import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ronit Madage — AI Product Experience",
  description: "Futuristic AI product experience and digital ecosystem.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className="bg-[#03050C] text-white antialiased cursor-none selection:bg-accent-bright selection:text-white">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
