"use client";
import EthLabBlockNumber from "@/internal/EthLabBlockNumber";
import EthLabHardhatButton from "@/internal/EthLabHardhatButton";
import { DarkThemeToggle } from "flowbite-react";
import { ToastContainer } from "react-toastify";

const RPC_MODE = import.meta.env.VITE_RPC_MODE || "default";

const Footer = () => (
  <>
    <ToastContainer position="bottom-right" />

    <div className="fixed bottom-0 left-0 px-4 p-4 z-10">
      <div className="flex gap-2">
        {RPC_MODE == "hardhat" && <EthLabHardhatButton />}
        <DarkThemeToggle />
      </div>
    </div>

    <div className="fixed bottom-0 right-0 p-4 z-10">
      <EthLabBlockNumber />
    </div>

    <footer className="text-center absolute bottom-0 p-4 w-full">
      <small className="block text-center">
        <b>🧪 EthLab</b> version: hydrogen <code>(0.0.1)</code>
      </small>
      <small className="block text-center">
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by{" "}
        <a
          className="text-blue-500 hover:underline"
          href="https://twitter.com/ethlabxyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          @ethlabxyz
        </a>
      </small>
    </footer>
  </>
);

export default Footer;
