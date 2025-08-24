import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { isAuthenticated, signOut } from "@/lib/actions/auth.actions";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PrepWise",
  description: "AI-Powered Platform for preparing for mock interview",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const isUserAuthenticated = await isAuthenticated();

  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.variable} antialiased pattern`}>
        <div className="root-layout">
          <nav className="flex items-center gap-4 p-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Logo" width={38} height={32} />
              <h2 className="text-primary-100">PrepWise</h2>
            </Link>

            {isUserAuthenticated ? (
              <form action={signOut} className="ml-auto">
                <button
                  type="submit"
                  className="ml-auto px-4 py-2 rounded-lg bg-primary-200 text-black hover:bg-primary-200 transition"
                >
                  Sign Out
                </button>
              </form>
            ) : (
              <Link
                href="/auth/sign-in"
                className="ml-auto px-4 py-2 rounded-lg bg-primary-200 text-black hover:bg-primary-200 transition"
              >
                Sign In
              </Link>
            )}
          </nav>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}