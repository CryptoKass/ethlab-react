import { useEffect, useState } from "react";
import { useBlockNumber, useProvider, useSignerAddress } from "./hooks";
import { parseEther } from "ethers";
import EthLabEvmButton from "./EthLabEvmButton";
import { shortAddress } from "./utils";
import { JsonRpcProvider } from "ethers";

const EthLabGetFromFaucet = () => {
  const [newBalance, setNewBalance] = useState<BigInt>(BigInt(0));
  const address = useSignerAddress();
  const provider = useProvider();
  const block = useBlockNumber();

  useEffect(() => {
    if (!provider) return;
    if (!address) return;

    provider.getBalance(address).then((balance) => {
      setNewBalance(balance + parseEther("100"));
    });
  }, [provider, address, block]);

  return (
    <EthLabEvmButton
      provider={provider as any}
      method="hardhat_setBalance"
      args={[address, "0x" + newBalance.toString(16)]}
      message={`Success: Sent 100 Eth to ${shortAddress(address)}`}
      callback={() => (provider as JsonRpcProvider).send("evm_mine", [])}
      color="gray"
    >
      Get ETH from faucet
    </EthLabEvmButton>
  );
};

export default EthLabGetFromFaucet;
