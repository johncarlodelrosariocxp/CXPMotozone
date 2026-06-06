import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    template: "CXPMotoZone",
    default: "CXPMotoZone",
  },
  description: "CXP online store for motorcycle parts and accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        {/* Sticky header so it remains visible */}
        <Header />

        {/* Main content: padding top to avoid overlap with header */}
        <main className="flex-1 w-full  bg-white overflow-x-hidden">
          {children}
        </main>

        {/* Footer always at bottom */}
        <Footer />
      </div>
    </ClerkProvider>
  );
}
