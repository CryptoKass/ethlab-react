export interface ContractInfo {
  name: string;
  abi: string;
}

export interface DeploymentInfo {
  name: string;
  tx: string;
  block: number;
  address: string;
}

export interface ContractInstanceInfo extends DeploymentInfo, ContractInfo {}
