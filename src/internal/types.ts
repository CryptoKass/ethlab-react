import { Log } from "ethers";

export interface TransactionSnippet {
  hash: string;
  block: number;
  from: string;
  to: string | null;
  value: string;
}

export interface TransactionDetails extends TransactionSnippet {
  contract: string | null;
  data: string;
  method: string | null;
  gasLimit: string;
  gasPrice: string;
  logs: readonly Log[];
  timestamp: number;
  action: {
    type: "send" | "call" | "create";
  };
}

export interface ContractInfo {
  name: string;
  address: string;
  abi: any;
}
