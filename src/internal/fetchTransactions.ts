import type { Provider } from "ethers";
import { TransactionDetails, TransactionSnippet } from "./types";
import { TransactionResponse } from "ethers";

export const fetchAllTransactions = async (
  provider: Provider,
  fromBlock: number,
  toBlock: number
) => {
  const txs: TransactionSnippet[] = [];
  if (fromBlock < 0) fromBlock = 0;
  if (toBlock < 0) toBlock = 0;

  for (let i = fromBlock; i <= toBlock; i++) {
    const block = await provider.getBlock(i, true);
    block?.transactions.forEach(async (txHash) => {
      const tx = block.getPrefetchedTransaction(txHash);
      const method = tx.data.slice(0, 10);
      txs.push({
        hash: tx.hash,
        block: i,
        from: tx.from,
        to: tx.to,
        value: tx.value.toString(),
        method: method,
        action: {
          type: inferActionType(tx),
        },
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
      type: inferActionType(tx),
    },
  };
};

const inferActionType = (
  tx: TransactionResponse
): "create" | "call" | "send" => {
  if (tx.to == null) return "create";
  else if (tx.data.length > 2) return "call";
  return "send";
};
