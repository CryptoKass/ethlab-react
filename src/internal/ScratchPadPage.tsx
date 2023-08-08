import EthLabScratchPad from "@/internal/EthLabScratchPad";
import EthLabPage from "./EthLabPage";

const ScratchPadPage = () => (
  <EthLabPage>
    <div className="max-w-2xl mx-auto">
      <EthLabScratchPad />
    </div>
  </EthLabPage>
);

export default ScratchPadPage;
