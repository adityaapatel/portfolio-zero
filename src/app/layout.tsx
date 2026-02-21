import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "Aditya Patel | Software Engineer",
  description: "Portfolio of Aditya Patel - Incoming SWE Intern @ Fidelity Investments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className="bg-[#0a0a0a] text-[#f5f5f5] font-sans selection:bg-emerald-500/20 antialiased"
        suppressHydrationWarning={true}
      >
        {/* FIXED NAVIGATION: High Z-Index to stay above background effects */}
        <Navbar />
        
        {/* MAIN CONTENT WRAPPER */}
        <div className="relative flex flex-col min-h-screen">
          {children}
        </div>

        {/* PERSISTENT CHATBOT: Matches the "Sera" glowing theme */}
        <ChatBot />

        {/* GLOBAL BACKGROUND DEPTH: Subtle radial glow across all pages */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.02),transparent_100%)]" />
      </body>
    </html>
  );
}