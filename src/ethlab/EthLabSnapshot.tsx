"use client";

import { JsonRpcProvider } from "ethers";
import { useState } from "react";
import EthLabEvmButton from "./EthLabEvmButton";
import config from "./config";

export const EthLabSnapshot = () => {
  const provider = new JsonRpcProvider(config.RPC_URL);
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
