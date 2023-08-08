import type { Provider } from "ethers";
import { TransactionDetails, TransactionSnippet } from "./types";

export const fetchAllTransactions = async (
  provider: Provider,
  fromBlock: number,
  toBlock: number
) => {
  const txs: TransactionSnippet[] = [];

  for (let i = fromBlock; i <= toBlock; i++) {
    const block = await provider.getBlock(i, true);
    block?.transactions.forEach(async (txHash) => {
      const tx = block.getPrefetchedTransaction(txHash);
      txs.push({
        hash: tx.hash,
        block: i,
        from: tx.from,
        to: tx.to,
        value: tx.value.toString(),
      });
    });
  }

  return txs;
};

export const fetchTransactionDetails = async (
  provider: Provider,
  txHash: string
): Promise<TransactionDetails> => {
  const tx = await provider.getTransaction(txHash);
  const receipt = await provider.getTransactionReceipt(txHash);
  if (tx == null || !receipt)
    throw new Error(`Could not find transaction ${txHash}`);
  const block = await provider.getBlock(tx.blockNumber!);

  let actionType: "send" | "call" | "create" = "send";
  if (tx.to == null) actionType = "create";
  else if (tx.data.length > 2) actionType = "call";

  return {
    hash: tx.hash,
    block: receipt.blockNumber,
    from: tx.from,
    to: tx.to,
    value: tx.value.toString(),
    contract: receipt.contractAddress,
    data: tx.data,
    method: tx.data.slice(0, 10),
    gasLimit: tx.gasLimit.toString(),
    gasPrice: tx.gasPrice.toString(),
    logs: receipt.logs,
    timestamp: block?.timestamp || 0,
    action: {
      type: actionType,
    },
  };
};
