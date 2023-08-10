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
import { getContractInfo } from "./contracts";

const ContractPage = () => {
  const { address } = useParams();
  const signer = useSigner();
  const provider = useProvider();
  const [contract, setContract] = useState<Contract | null>(null);
  const [name, setName] = useState<string>("Unknown");
  const balance = useBalance(address || "0x0");

  useEffect(() => {
    const connector = signer || provider;
    if (!connector) return;
    if (!address) return;

    const _contractInfo = getContractInfo(address);
    const _contract = new Contract(address, _contractInfo.abi, connector);

    setName(_contractInfo.name);
    setContract(_contract);
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
