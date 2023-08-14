"use client";

import { JsonRpcProvider } from "ethers";
import { Contract } from "ethers";
import { type Provider, type Signer } from "ethers";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface EthLabContext {
  provider: Provider | null;
  signer: Signer | null;
  address: string;
  contracts: Record<string, Contract> | Contract;
  setProvider: (provider: Provider) => void;
  setSigner: (signer: Signer) => void;
  setAddress: (address: string) => void;
  setContracts: (contracts: Record<string, Contract>) => void;
  addContract: (name: string, contract: Contract) => void;
  disconnect: () => void;
}

export const EthLabContext = createContext<EthLabContext>({
  provider: null,
  signer: null,
  address: "",
  contracts: {},
  setProvider: () => {},
  setSigner: () => {},
  setAddress: () => {},
  setContracts: () => {},
  addContract: () => {},
  disconnect: () => {},
});

interface EthLabProviderProps extends PropsWithChildren<{}> {
  initialRPC?: string;
}

export const EthLabProvider: React.FC<EthLabProviderProps> = ({
  children,
  initialRPC,
}) => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [address, setAddress] = useState<string>("");
  const [contracts, setContracts] = useState<Record<string, Contract>>({});

  useEffect(() => {
    if (initialRPC) setProvider(new JsonRpcProvider(initialRPC));
  }, [initialRPC]);

  const addContract = (name: string, contract: Contract) => {
    setContracts((contracts) => ({ ...contracts, [name]: contract }));
  };

  const disconnect = () => {
    setSigner(null);
    setAddress("");
    if (initialRPC) setProvider(new JsonRpcProvider(initialRPC));
    else setProvider(null);
  };

  return (
    <EthLabContext.Provider
      value={{
        provider,
        signer,
        address,
        contracts,
        setProvider,
        setSigner,
        setAddress,
        setContracts,
        addContract,
        disconnect,
      }}
    >
      {children}
    </EthLabContext.Provider>
  );
};
