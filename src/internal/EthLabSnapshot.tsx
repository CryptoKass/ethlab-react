"use client";

import { JsonRpcProvider } from "ethers";
import { useState } from "react";
import EthLabEvmButton from "./EthLabEvmButton";

export const EthLabSnapshot = () => {
  const provider = new JsonRpcProvider("http://127.0.0.1:8545");
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
