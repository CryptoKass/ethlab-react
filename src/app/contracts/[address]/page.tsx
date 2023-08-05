"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Contract } from "ethers";
import ContractView from "@/internal/ContractView";
import { Spinner, TextInput } from "flowbite-react";
import { useProvider, useSigner } from "@/internal/hooks";

const ContractPage = () => {
  const { address } = useParams();
  const signer = useSigner();
  const provider = useProvider();
  const [contract, setContract] = useState<Contract | null>(null);
  const [name, setName] = useState<string>("Contract");

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
    <div className="container mx-auto my-10 px-4">
      <article className="format dark:text-white mx-auto">
        <h3 className="dark:text-white">Contract: {name}</h3>
        <TextInput className="my-4" value={address} readOnly />
        <p>Interact with this contract below.</p>
      </article>
      <div className="my-10 mx-auto max-w-2xl p-4 rounded">
        {contract ? (
          <ContractView contract={contract} name={name} />
        ) : (
          <Spinner className="mx-auto" />
        )}
      </div>
    </div>
  );
};

export default ContractPage;
