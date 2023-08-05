import EthLabHardhatModal from "./EthLabHardhatModal";
import { useState } from "react";

const EthLabHardhatButton = () => {
  const [openModal, setOpenModal] = useState<string | undefined>(undefined);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setOpenModal("dismissible")}
      >
        Hardhat
      </button>
      <EthLabHardhatModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default EthLabHardhatButton;
