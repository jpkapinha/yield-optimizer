import type { Metadata } from "next";
import "./globals.css";

import { Web3Provider } from "@/components/layout/Web3Provider";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YieldForge | AI-Powered DeFi Yield Optimizer",
  description: "Discover, analyze, and simulate the smartest DeFi yield opportunities across multiple chains with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}>
        <Web3Provider>
          {children}
          <Toaster theme="dark" position="bottom-right" />
        </Web3Provider>
      </body>
    </html>
  );
}
