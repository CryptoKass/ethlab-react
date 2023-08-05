import "./globals.css";
import type { Metadata } from "next";
import { Flowbite } from "flowbite-react";
import FlowbiteContext from "@/internal/FlowbiteContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { EthLabProvider } from "@/internal/EthLabContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Ethlab",
  description: "Your Smart-contract development lab",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-800 min-h-screen font-mono text-gray-950 dark:text-white">
        <FlowbiteContext>
          <EthLabProvider>
            <Navigation />
            <main className="min-h-[80vh]">{children}</main>
            <ToastContainer position="bottom-right" />
          </EthLabProvider>
          <Footer />
        </FlowbiteContext>
      </body>
    </html>
  );
};

export default RootLayout;
