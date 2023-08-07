export interface TransactionSnippet {
  hash: string;
  block: number;
  from: string;
  to: string | null;
  value: string;
}

export interface ContractInfo {
  name: string;
  address: string;
  abi: any;
}
