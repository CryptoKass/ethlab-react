"use client";
import { formatEther } from "ethers";
import { Button, Modal, Tooltip } from "flowbite-react";
import EthLabSendEth from "./EthLabSendEth";
import EthLabGetFromFaucet from "./EthLabGetFromFaucet";
import { humanizeNumber } from "./utils";
import { useDisconnect } from "./hooks";
import { toast } from "react-toastify";

interface EthLabWalletModalProps {
  address: string;
  balance: BigInt;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

const EthLabWalletModal: React.FC<EthLabWalletModalProps> = (props) => {
  const balanceEth = formatEther(props.balance?.toString() || "0");
  const _disconnect = useDisconnect();

  const disconnect = () => {
    _disconnect();
    props.setOpenModal(false);
    toast.error("Wallet disconnected");
  };

  return (
    <Modal
      dismissible
      className="font-mono"
      size="md"
      show={props.openModal}
      onClose={() => props.setOpenModal(false)}
    >
      <Modal.Header>My Wallet</Modal.Header>

      <Modal.Body>
        <div className="space-y-8">
          <div className="space-y-2">
            <h4 className="text-lg">Balance</h4>
            <span className="text-4xl">
              <Tooltip content={`${balanceEth} ETH`}>
                {humanizeNumber(parseFloat(balanceEth))}
              </Tooltip>
              <span className="text-neutral-500 text-xl"> ETH</span>
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg">Address</h4>
            <div className="text-xl w-full p-2 overflow-x-scroll rounded font-mono bg-neutral-100">
              {props.address}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg">Send Eth</h4>
            <EthLabSendEth />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg">Misc</h4>
            <div className="flex flex-wrap gap-4">
              <EthLabGetFromFaucet />
            </div>
          </div>
          <Button onClick={disconnect} className="w-full">
            Disconnect
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EthLabWalletModal;
