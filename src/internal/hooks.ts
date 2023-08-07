import { useContext, useEffect, useState } from "react";
import { EthLabContext } from "./EthLabContext";
import { Contract } from "ethers";

/** Returns the provider if it exists, otherwise returns null */
export const useProvider = () => {
  const { provider } = useContext(EthLabContext);
  return provider;
};

/** Returns the signer if it exists, otherwise returns null */
export const useSigner = () => {
  const { signer } = useContext(EthLabContext);
  return signer;
};

/** Returns the address of the signer if it exists, otherwise returns null */
export const useSignerAddress = () => {
  const { address } = useContext(EthLabContext);
  return address;
};

/** Returns balance of the given address.
 * @param address - address to get balance of
 * @param refresh - if true, will update balance when block changes
 * @returns balance of the given address or null
 * */
export const useBalance = (address: string, refresh = true) => {
  const [balance, setBalance] = useState<BigInt | null>(null);
  const { provider } = useContext(EthLabContext);

  const setBalanceFromProvider = async () => {
    if (!provider || !address) return;
    const newBalance = await provider.getBalance(address);
    console.log("address", address.toString());
    if (newBalance !== balance) setBalance(newBalance);
  };

  useEffect(() => {
    if (!provider) return;
    if (address == null) return;
    // set initial balance
    provider.getBalance(address).then(setBalance).catch(console.error);

    // listen for balance updates
    if (refresh) provider.on("block", setBalanceFromProvider);

    // cleanup
    return () => {
      provider.removeListener("block", setBalanceFromProvider);
    };
  }, [provider, address, refresh]);

  return balance;
};

/** Returns the current block number,
 * @param refresh - if true, will update block number when block changes
 * @returns current block number or null
 * */
export const useBlockNumber = (refresh = true) => {
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const { provider } = useContext(EthLabContext);

  const setBlockNumberFromProvider = async () => {
    if (!provider) return;
    const newBlockNumber = await provider.getBlockNumber();
    if (newBlockNumber !== blockNumber) setBlockNumber(newBlockNumber);
  };

  useEffect(() => {
    if (!provider) return;
    // set initial blockNumber
    provider.getBlockNumber().then(setBlockNumber).catch(console.error);

    // listen for blockNumber updates
    if (refresh) provider.on("block", setBlockNumberFromProvider);

    // cleanup
    return () => {
      provider.removeListener("block", setBlockNumberFromProvider);
    };
  }, [provider, refresh]);

  return blockNumber;
};

/** useContractRead returns the result of a contract read method.
 * @param address - address of the contract
 * @param abi - abi of the contract
 * @param method - method to call
 * @param args - arguments to pass to the method
 * @param refresh - if true, will update result when block changes
 * */
export const useContractRead = <T>(
  address: string,
  abi: any,
  method: string,
  args: any[] = [],
  refresh = true
) => {
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { provider } = useContext(EthLabContext);

  const setContractReadFromProvider = async () => {
    if (!provider) return;
    const contract = new Contract(abi, address);
    contract
      .getFunction(method)(...args)
      .then(setResult)
      .catch(setError);
  };

  useEffect(() => {
    if (!provider) return;
    // set initial result
    setContractReadFromProvider();

    // listen for result updates
    if (refresh) provider.on("block", setContractReadFromProvider);

    // cleanup
    return () => {
      provider.removeListener("block", setContractReadFromProvider);
    };
  }, [provider, address, abi, method, args]);

  return { result, error };
};

/** useContractWrite returns the result of a contract write method.
 * @param address - address of the contract
 * @param abi - abi of the contract
 * @param method - method to call
 * @param args - arguments to pass to the method
 * */
export const useContractWrite = <T>(
  address: string,
  abi: any,
  method: string,
  args: any[] = []
) => {
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const { signer } = useContext(EthLabContext);

  const write = async () => {
    if (!signer) return;
    setLoading(true);
    const contract = new Contract(abi, address, signer);
    contract
      .getFunction(method)(...args)
      .then(setResult)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  return { result, error, write, loading };
};
