import { ContractInfo } from "@/ethlab/types";
import ContractJSON from "@/assets/contracts.data.json";
import MethodsJSON from "@/assets/contracts.methods.json";
import { Contract } from "ethers";

export const getContractInfo = (address: string): ContractInfo => {
  const _deployment = ContractJSON.deployments.find(
    (d: any) => d.address.toLowerCase() === address.toLowerCase()
  );

  if (!_deployment) throw new Error(`Could not find contract at ${address}`);

  const _interface = (ContractJSON.interfaces as any)[_deployment.contractName];
  if (!_interface) throw new Error(`Could not find interface for ${address}`);

  return {
    name: _deployment.contractName,
    address: _deployment.address,
    abi: _interface.abi,
  };
};

export const getContract = (address: string) => {
  const info = getContractInfo(address);
  return new Contract(info.address, info.abi);
};

export const getAllContractInfos = () => {
  return ContractJSON.deployments.map((d: any) => {
    return getContractInfo(d.address);
  });
};

export const getMethodSignature = (methodId: string, fallback?: string) => {
  const signature = (MethodsJSON as any)[methodId];
  if (signature == undefined && fallback) return fallback;
  return signature;
};
