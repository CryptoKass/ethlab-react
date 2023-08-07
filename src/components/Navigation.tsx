"use client";

import { Navbar } from "flowbite-react";
import EthLabWalletButton from "@/internal/EthLabWalletButton";
import { Link } from "react-router-dom";

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
        <Navbar.Link as="div" className="flex gap-1 items-center h-full">
          <Link to="/contracts" className="font-bold">
            Contracts
          </Link>
        </Navbar.Link>
        <Navbar.Link as="div" className="flex gap-1 items-center h-full">
          <Link to="/scratchpad" className="font-bold">
            ScratchPad
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
      <EthLabWalletButton />
      <Navbar.Toggle />
    </Navbar>
  );
};

export default Navigation;
