import { useState } from "react";
import { useBalance, useSigner, useSignerAddress } from "./hooks";
import EthLabWalletConnectModal from "./EthLabWalletConnectModal";
import { Button } from "flowbite-react";
import ButtonGroup from "flowbite-react/lib/esm/components/Button/ButtonGroup";
import { formatEther } from "ethers";
import EthLabWalletModal from "./EthLabWalletModal";

const EthLabWalletButton: React.FC = () => {
  const [openConnectModal, setOpenConnectModal] = useState<string | undefined>(
    undefined
  );
  const [openWalletModal, setOpenWalletModal] = useState<string | undefined>(
    undefined
  );

  const signer = useSigner();
  const address = useSignerAddress();
  const balance = useBalance(address);

  return (
    <>
      {(signer == null || address == null) && (
        <>
          <Button onClick={() => setOpenConnectModal("dismissible")}>
            Connect Wallet
          </Button>
          <EthLabWalletConnectModal
            openModal={openConnectModal}
            setOpenModal={setOpenConnectModal}
          />
        </>
      )}
      {signer && address && (
        <>
          <ButtonGroup>
            <Button onClick={() => setOpenWalletModal("dismissible")}>
              {address.slice(0, 6) + "..." + address.slice(-4)}
            </Button>
            <Button>{formatEther(balance?.toString() || 0)}</Button>
          </ButtonGroup>
          <EthLabWalletModal
            openModal={openWalletModal}
            setOpenModal={setOpenWalletModal}
            address={address}
            balance={balance!}
          />
        </>
      )}
    </>
  );
};

export default EthLabWalletButton;
