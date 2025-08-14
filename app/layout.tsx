import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Link from "next/link";
import Image from "next/image";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "PrepWise",
  description: "AI-Powered Platform for preparing for mock interview",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.variable} antialiased pattern`}>
        <div className="root-layout">
          <nav className="flex items-center gap-4 p-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Logo" width={38} height={32} />
              <h2 className="text-primary-100">PrepWise</h2>
            </Link>
          </nav>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
