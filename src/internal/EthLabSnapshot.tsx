"use client";

import { JsonRpcProvider } from "ethers";
import { useState } from "react";
import EthLabEvmButton from "./EthLabEvmButton";

const RPC_URL = import.meta.env.VITE_RPC_URL || "http://127.0.0.1:8545";

export const EthLabSnapshot = () => {
  const provider = new JsonRpcProvider(RPC_URL);
  const [snapshotId, setSnapshotId] = useState<string>("");

  return (
    <>
      {snapshotId && (
        <EthLabEvmButton
          provider={provider}
          method="evm_revert"
          message="EVM: Reverted to snapshot."
          color="warning"
          callback={() => setSnapshotId("")}
          args={[snapshotId]}
        >
          ↙ Revert Snapshot
        </EthLabEvmButton>
      )}
      {!snapshotId && (
        <EthLabEvmButton
          provider={provider}
          method="evm_snapshot"
          callback={setSnapshotId}
          message="EVM: Snapshot created."
        >
          + Snapshot
        </EthLabEvmButton>
      )}
    </>
  );
};
