import { formatEther } from "ethers";
import { Button, Modal, TextInput } from "flowbite-react";

interface EthLabWalletModalProps {
  address: string;
  balance: BigInt;
  openModal: string | undefined;
  setOpenModal: (openModal: string | undefined) => void;
}

const EthLabWalletModal: React.FC<EthLabWalletModalProps> = (props) => {
  return (
    <Modal
      className="font-mono"
      size="md"
      show={props.openModal === "dismissible"}
      onClose={() => props.setOpenModal(undefined)}
    >
      <Modal.Header>My Wallet</Modal.Header>

      <Modal.Body>
        <div className="space-y-8">
          <div className="space-y-2">
            <h4 className="text-lg">Balance</h4>
            <span className="text-4xl">
              {formatEther(props.balance?.toString() || "0")}
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
            <div className="flex flex-wrap gap-4 w-full">
              <TextInput size={15} placeholder="Address" />
              <TextInput size={8} placeholder="Amount" />
              <Button color="gray">Send</Button>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg">Misc</h4>
            <div className="flex flex-wrap gap-4">
              <Button color="gray">Get Eth From Faucet</Button>
            </div>
          </div>
          <Button className="w-full">Disconnect</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EthLabWalletModal;
