"use client";
import EthLabFloatingBlockNumber from "@/internal/EthLabFloatingBlockNumber";
import { ToastContainer } from "react-toastify";

const Footer = () => (
  <>
    <EthLabFloatingBlockNumber />
    <ToastContainer position="bottom-right" />
    <footer className="text-center">
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
