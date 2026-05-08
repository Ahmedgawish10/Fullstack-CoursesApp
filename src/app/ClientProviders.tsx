"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "./_redux/store";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Scrollup from "./scrollup/Scrollup";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <NextTopLoader color="#FFB800" showSpinner={false} />
        <Toaster position="top-right" />
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="mx-auto w-full flex-1">{children}</main>
          <Footer />
          <Scrollup />
        </div>
      </Provider>
    </ClerkProvider>
  );
}
