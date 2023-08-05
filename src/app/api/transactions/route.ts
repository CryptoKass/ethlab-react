import { NextApiResponse, NextApiRequest } from "next";
import { JsonRpcProvider } from "ethers";
import { TransactionSnippet } from "@/internal/types";

const provider = new JsonRpcProvider(
  process.env.RPC_PROVIDER || "http://127.0.0.1:8545"
);

export const GET = async (req: Request) => {
  const latestBlock = await provider.getBlockNumber();
  const transactions: TransactionSnippet[] = [];

  console.log(req.url);
  console.log("latestBlock", latestBlock);

  const { searchParams } = new URL(req.url);

  let toBlock = latestBlock;
  if (searchParams.has("to_block"))
    toBlock = parseInt(searchParams.get("to_block")!.toString());
  if (toBlock > latestBlock) toBlock = latestBlock;

  let fromBlock = latestBlock - 100;
  if (searchParams.has("from_block"))
    fromBlock = parseInt(searchParams.get("from_block")!.toString());
  if (fromBlock < 0) fromBlock = 0;

  for (let i = fromBlock; i <= toBlock; i++) {
    const block = await provider.getBlock(i, true);
    if (block == null) continue;

    for (const transaction of block.transactions) {
      const transactionResponse = await provider.getTransaction(transaction);
      if (!transactionResponse) continue;

      const transactionSnippet: TransactionSnippet = {
        hash: transactionResponse.hash,
        block: transactionResponse.blockNumber!,
        from: transactionResponse.from,
        to: transactionResponse.to,
        value: transactionResponse.value.toString(),
      };

      transactions.push(transactionSnippet);
    }
  }

  return new Response(JSON.stringify(transactions), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};
