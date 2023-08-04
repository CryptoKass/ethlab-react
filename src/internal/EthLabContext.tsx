import { JsonRpcProvider } from "ethers";
import { Wallet } from "ethers";
import { BrowserProvider, Provider, Signer } from "ethers";
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

  setProvider: (provider: Provider) => void;
  setSigner: (signer: Signer) => void;
  setAddress: (address: string) => void;
}

export const EthLabContext = createContext<EthLabContext>({
  provider: null,
  signer: null,
  address: "",
  setProvider: () => {},
  setSigner: () => {},
  setAddress: () => {},
});

interface EthLabProviderProps extends PropsWithChildren<{}> {
  initialProvider?: Provider;
}

export const EthLabProvider: React.FC<EthLabProviderProps> = ({
  children,
  initialProvider,
}) => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (initialProvider) setProvider(initialProvider);
  }, [initialProvider]);

  return (
    <EthLabContext.Provider
      value={{
        provider,
        signer,
        address,
        setProvider,
        setSigner,
        setAddress,
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
    connectBurner: async (rpc = "http://127.0.0.1:8545") => {
      const provider = new JsonRpcProvider(rpc);
      const wallet = Wallet.createRandom();
      const signer: Signer = wallet.connect(provider);

      setProvider(provider);
      setSigner(signer);
      setAddress(wallet.address);
      return signer;
    },
  };
};
