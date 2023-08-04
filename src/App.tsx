import { useState } from "react";
import EthLabWalletButton from "./internal/EthLabWalletButton";
import { DarkThemeToggle } from "flowbite-react";
import EthLabScratchPad from "./internal/EthLabScratchPad";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto my-10 px-4">
      <h1>Hello World</h1>
      <EthLabWalletButton />
      <EthLabScratchPad />
    </div>
  );
}

export default App;
