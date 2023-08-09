import { Button as Btn, Modal, Spinner } from "flowbite-react";
import { useConnect } from "./EthLabContext";
import { useState } from "react";
import { toast } from "react-toastify";
import EthLabConnectInternal from "./EthLabConnectInternal";

interface EthLabWalletModalProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

const EthLabWalletConnectModal: React.FC<EthLabWalletModalProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { connectMetamask, connectBurner } = useConnect();

  const connect = async (connectFn: () => Promise<any>) => {
    setLoading(true);
    try {
      await connectFn();
      toast.success(`Success: Connected to Wallet`);
      props.setOpenModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Error: Failed to connect to wallet");
    }
    setLoading(false);
  };

  return (
    <Modal
      dismissible
      size={"sm"}
      show={props.openModal}
      onClose={() => props.setOpenModal(false)}
    >
      <Modal.Header>Connect Wallet</Modal.Header>

      <Modal.Body>
        {loading && (
          <div className="flex justify-center h-96">
            <Spinner aria-label="Please wait, connecting to wallet..." />
          </div>
        )}
        {!loading && (
          <div className="flex flex-col gap-4">
            <Btn
              color="gray"
              size="xl"
              className="text-left justify-start"
              onClick={() => connect(connectMetamask)}
            >
              <img
                className="h-8 mr-2"
                src="/images/metamask.png"
                alt="Metamask"
              />
              <div className="flex justify-center items-center text-xl">
                Metamask
              </div>
            </Btn>
            <Btn
              color="gray"
              size="xl"
              className="text-left justify-start"
              onClick={() => connect(connectBurner)}
            >
              <img
                className="h-8 mr-2"
                src="/images/burner.png"
                alt="BurnerWallet"
              />
              <div className="flex justify-center items-center text-xl">
                Burner Wallet
              </div>
            </Btn>

            <EthLabConnectInternal
              onConnected={() => {
                props.setOpenModal(false);
              }}
            />

            <article className="format text-sm text-gray-500 dark:text-gray-400">
              <p>
                You can assign additional named accounts in your
                ./src/assets/accounts.json file.
              </p>
            </article>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EthLabWalletConnectModal;
