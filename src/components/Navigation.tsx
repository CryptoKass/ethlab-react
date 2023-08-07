"use client";

import { Navbar } from "flowbite-react";
import EthLabWalletButton from "@/internal/EthLabWalletButton";
import EthLabThemeSelect from "@/internal/EthLabThemeSelect";
import { Link } from "react-router-dom";
import EthLabHardhatButton from "@/internal/EthLabHardhatButton";

const Navigation = () => {
  return (
    <Navbar>
      <Link to="/">
        <Navbar.Brand as="div" className="text-2xl font-bold">
          🧪
          <small className="ml-2 text-gray-900 dark:text-white">EthLab</small>
        </Navbar.Brand>
      </Link>
      <Navbar.Collapse>
        <Link to="/contracts">
          <Navbar.Link as="div">🔍 Contracts</Navbar.Link>
        </Link>
        <Link to="/transactions">
          <Navbar.Link as="div">📒 Transactions</Navbar.Link>
        </Link>
        <Link to="/scratchpad">
          <Navbar.Link as="div">📝 ScratchPad</Navbar.Link>
        </Link>
      </Navbar.Collapse>

      <div className="flex gap-2">
        <EthLabHardhatButton />
        <EthLabThemeSelect />
        <EthLabWalletButton />
      </div>
      <Navbar.Toggle />
    </Navbar>
  );
};

export default Navigation;
