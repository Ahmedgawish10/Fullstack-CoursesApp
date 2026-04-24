"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Scrollup from './scrollup/Scrollup';
import { Provider } from "react-redux";
import store from "./_redux/store";
import React from 'react'
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
import { ClerkProvider } from "@clerk/nextjs";

const inter = Roboto({ subsets: ["latin"], weight: "700" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <html lang="en">
          <body className={inter.className} suppressHydrationWarning={true}>
            <NextTopLoader color="#FFB800" showSpinner={false} />
            <Toaster position="top-right" />
            <div className="flex flex-col min-h-screen w-full">
              <Header />
              <main className="flex-1 w-full mx-auto">
                {children}
              </main>
              <Footer />
              <Scrollup />
            </div>
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  );
}
