import { Navbar } from "flowbite-react";
import EthLabWalletButton from "../internal/EthLabWalletButton";
import EthLabThemeSelect from "../internal/EthLabThemeSelect";

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

      <div className="flex gap-2">
        <EthLabThemeSelect />
        <EthLabWalletButton />
      </div>
      <Navbar.Toggle />
    </Navbar>
  );
};

export default Navigation;
