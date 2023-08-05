import { TransactionResponse, TransactionReceipt } from "ethers";

export interface TransactionSnippet {
  hash: string;
  block: number;
  from: string;
  to: string | null;
  value: string;
}
