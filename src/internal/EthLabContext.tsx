"use client";

import { JsonRpcProvider } from "ethers";
import { Contract } from "ethers";
import { Wallet } from "ethers";
import { BrowserProvider, type Provider, type Signer } from "ethers";
import AccountsJSON from "@/assets/accounts.json";

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

export const useConnect = () => {
  const { setProvider, setSigner, setAddress } = useContext(EthLabContext);

  return {
    connectMetamask: async () => {
      if (typeof (window as any).ethereum !== "undefined") {
        const provider = new BrowserProvider((window as any).ethereum);
        const signer: Signer = await provider.getSigner();
        const address = await signer.getAddress();

        setProvider(provider);
        setSigner(signer);
        setAddress(address);
        return signer;
      } else throw new Error("Metamask not found");
    },
    connectBurner: async (
      // VITE_RPC_URL: defined inside the .env file
      rpc = import.meta.env.VITE_RPC_URL || "http://127.0.0.1:8545"
    ) => {
      const provider = new JsonRpcProvider(rpc);
      const wallet = Wallet.createRandom();
      const signer: Signer = wallet.connect(provider);

      setProvider(provider);
      setSigner(signer);
      setAddress(wallet.address);
      return signer;
    },
    connectInternalAccount: async (
      address: string,
      // VITE_RPC_URL: defined inside the .env file
      rpc = import.meta.env.VITE_RPC_URL || "http://127.0.0.1:8545"
    ) => {
      const acc = AccountsJSON.find(
        (account) => account.address.toLowerCase() === address.toLowerCase()
      );

      if (!acc) throw new Error("Account not found");

      const provider = new JsonRpcProvider(rpc);
      const wallet = new Wallet(acc.key, provider);

      setProvider(provider);
      setSigner(wallet);
      setAddress(wallet.address);
    },
  };
};
