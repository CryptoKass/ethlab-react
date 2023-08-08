"use client";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Contract, formatEther } from "ethers";
import ContractView from "@/internal/ContractView";
import { Spinner, TextInput } from "flowbite-react";
import { useBalance, useProvider, useSigner } from "@/internal/hooks";
import { ReactComponent as FileShieldSVG } from "@/assets/file-shield.svg";
import EthLabPage from "./EthLabPage";
import Avvvatars from "avvvatars-react";

const ContractPage = () => {
  const { address } = useParams();
  const signer = useSigner();
  const provider = useProvider();
  const [contract, setContract] = useState<Contract | null>(null);
  const [name, setName] = useState<string>("Unknown");
  const balance = useBalance(address || "0x0");

  useEffect(() => {
    const connector = signer || provider;

    fetch("/contracts.json")
      .then((response) => response.json())
      .then((deployments) => {
        // get the deployment for the contract at the given address
        const _contractName: any = Object.keys(deployments.contracts).find(
          (_name: string) => deployments.contracts[_name].address == address
        );
        // if the deployment is not found, return
        if (!_contractName) return;
        // otherwise, create a new contract instance
        const { abi } = deployments.contracts[_contractName];
        const contract = new Contract(address as string, abi, connector);
        setName(_contractName);
        setContract(contract);
      });
  }, [address, signer, provider]);

  return (
    <EthLabPage>
      <article className="format dark:text-white mx-auto mb-2">
        <div className="flex gap-4">
          <div>
            <Avvvatars
              value={address || ""}
              size={100}
              style="shape"
              radius={10}
              border
            />
          </div>
          <div className="w-full">
            <h5 className="dark:text-white text-black flex items-stretch">
              <FileShieldSVG className="w-5 h-5 mr-2 inline" />
              <span>Contract: {name}</span>
            </h5>
            <TextInput className="mt-2" value={address} readOnly />
            <p className="text-sm mt-2">
              Contract Balance: {formatEther(balance?.toString() || "0")}{" "}
              <small>ETH</small>
            </p>
          </div>
        </div>
      </article>

      <div className="mb-10 mx-auto max-w-2xl p-4 rounded">
        {contract ? (
          <ContractView contract={contract} name={name} />
        ) : (
          <Spinner className="mx-auto" />
        )}
      </div>
    </EthLabPage>
  );
};

export default ContractPage;
