import { Log } from "ethers";

export interface TransactionSnippet {
  hash: string;
  block: number;
  from: string;
  to: string | null;
  value: string;
  method: string | null;
}

export interface TransactionDetails extends TransactionSnippet {
  contract: string | null;
  data: string;
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

export interface CodeLine {
  type?: "mute" | "focus" | "error";
  content: string;
}
