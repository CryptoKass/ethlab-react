import { useState } from "react";
import EthLabScratchPad from "./internal/EthLabScratchPad";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto my-10 px-4">
      <EthLabScratchPad />
    </div>
  );
}

export default App;
