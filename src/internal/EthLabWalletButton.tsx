"use client";

import { useState } from "react";
import { useBalance, useSigner, useSignerAddress } from "./hooks";
import EthLabWalletConnectModal from "./EthLabWalletConnectModal";
import { Button } from "flowbite-react";
import { formatEther } from "ethers";
import EthLabWalletModal from "./EthLabWalletModal";
import ButtonGroup from "flowbite-react/lib/esm/components/Button/ButtonGroup";

const EthLabWalletButton: React.FC = () => {
  const [openConnectModal, setOpenConnectModal] = useState<boolean>(false);
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);

  const signer = useSigner();
  const address = useSignerAddress();
  const balance = useBalance(address);

  return (
    <>
      {(signer == null || address == null) && (
        <>
          <Button onClick={() => setOpenConnectModal(true)}>
            Connect Wallet
          </Button>
        </>
      )}
      {signer && address && (
        <>
          <ButtonGroup>
            <Button onClick={() => setOpenWalletModal(true)}>
              {address.slice(0, 6) + "..." + address.slice(-4)}
            </Button>
            <Button>{formatEther(balance?.toString() || 0)}</Button>
          </ButtonGroup>
        </>
      )}
      <EthLabWalletConnectModal
        openModal={openConnectModal}
        setOpenModal={setOpenConnectModal}
      />
      <EthLabWalletModal
        openModal={openWalletModal}
        setOpenModal={setOpenWalletModal}
        address={address}
        balance={balance!}
      />
    </>
  );
};

export default EthLabWalletButton;
