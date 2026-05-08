import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import React from "react";
import ClientProviders from "./ClientProviders";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

const roboto = Roboto({ subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Courses App — Online Learning",
    template: "%s | Courses App",
  },
  description:
    "Browse online courses, learn new skills, and study at your own pace. Enroll, save favorites, and checkout securely.",
  applicationName: "Courses App",
  authors: [{ name: "Courses App" }],
  keywords: [
    "online courses",
    "learning",
    "education",
    "e-learning",
    "video courses",
  ],
  creator: "Courses App",
  publisher: "Courses App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Courses App",
    title: "Courses App — Online Learning",
    description:
      "Browse online courses and learn at your own pace. Explore topics, wishlists, and secure checkout.",
    images: [
      {
        url: "/courses-logo2.png",
        alt: "Courses App — Online Learning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Courses App — Online Learning",
    description:
      "Browse online courses and learn at your own pace.",
    images: ["/courses-logo2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/courses-logo2.png",
    shortcut: "/courses-logo2.png",
    apple: "/courses-logo2.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#130f40",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className} suppressHydrationWarning={true}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
