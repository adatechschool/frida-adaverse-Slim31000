import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdaVerse",
  description: "bibliothèque de project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="h-full">
      <body
        className={cn(`${geistSans.variable},${geistMono.variable},antialiased`,"h-full")}
      >
        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem={false}
            
          >
        {children}
        <Toaster/>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
