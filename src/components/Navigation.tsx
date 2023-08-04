import { Navbar } from "flowbite-react";
import EthLabWalletButton from "../internal/EthLabWalletButton";

const Navigation = () => {
  return (
    <Navbar>
      <Navbar.Brand href="/" className="text-2xl">
        🧪 <small className="ml-2 block text-emerald-600">EthLab</small>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Navbar.Link>Contracts</Navbar.Link>
        <Navbar.Link>Transactions</Navbar.Link>
        <Navbar.Link>ScratchPad</Navbar.Link>
      </Navbar.Collapse>

      <EthLabWalletButton />
      <Navbar.Toggle />
    </Navbar>
  );
};

export default Navigation;
