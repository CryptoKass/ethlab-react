"use client";

import { Navbar } from "flowbite-react";
import EthLabWalletButton from "@/internal/EthLabWalletButton";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar fluid className="dark:bg-transparent">
      <Link to="/">
        <Navbar.Brand
          as="div"
          className="text-2xl text-gray-900 dark:text-white"
        >
          🧪
          <div className="hidden md:block">
            <div className="ml-2 font-bold ">EthLab</div>
            <div className="text-xs">Developer Workspace</div>
          </div>
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
        <Navbar.Link as="div" className="flex gap-1 items-center h-full">
          <Link to="/transactions" className="font-bold">
            Transactions
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
      <EthLabWalletButton />
      <Navbar.Toggle />
    </Navbar>
  );
};

export default Navigation;
