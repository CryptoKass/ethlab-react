import { Button } from "flowbite-react";
import EthLabHardhatModal from "./EthLabHardhatModal";
import { useState } from "react";

const EthLabHardhatButton = () => {
  const [openModal, setOpenModal] = useState<string | undefined>(undefined);

  return (
    <>
      <Button
        className="shadow-lg"
        color="gray"
        onClick={() => setOpenModal("dismissible")}
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
            />
          </svg>
          Hardhat
        </div>
      </Button>
      <EthLabHardhatModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default EthLabHardhatButton;
