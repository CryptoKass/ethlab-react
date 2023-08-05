"use client";

import { JsonRpcProvider } from "ethers";
import { Button, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import EthLabEvmButton from "./EthLabEvmButton";
import { EthLabSnapshot } from "./EthLabSnapshot";

interface EthLabWalletModalProps {
  openModal: string | undefined;
  setOpenModal: (openModal: string | undefined) => void;
}

const EthLabHardhatModal: React.FC<EthLabWalletModalProps> = (props) => {
  const provider = new JsonRpcProvider("http://127.0.0.1:8545");

  return (
    <Modal
      className="font-mono"
      size="md"
      show={props.openModal === "dismissible"}
      onClose={() => props.setOpenModal(undefined)}
    >
      <Modal.Header>Hardhat Controls</Modal.Header>

      <Modal.Body>
        <div>
          <div className="space-y-2">
            <h4 className="text-lg">Actions</h4>
            <div className="flex flex-wrap gap-4">
              <EthLabEvmButton
                provider={provider}
                method="hardhat_mine"
                message="EVM: Block mined!"
              >
                Mine Next Block
              </EthLabEvmButton>

              <EthLabEvmButton
                provider={provider}
                method="hard_reset"
                message="EVM: Chain reset!"
              >
                Reset Chain
              </EthLabEvmButton>

              <EthLabSnapshot />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EthLabHardhatModal;
