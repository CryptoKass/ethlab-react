import { isAddress, parseEther } from "ethers";
import { TextInput, Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSigner } from "./hooks";

const EthLabSendEth = () => {
  const signer = useSigner();
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEth = async () => {
    if (!signer) return toast.error("No signer available");
    if (address == "") return toast.error("Address is required");
    if (amount == "") return toast.error("Amount is required");

    // check if amount is valid
    let wei = 0n;
    try {
      wei = parseEther(amount);
    } catch (err) {
      return toast.error("Invalid amount");
    }

    // check if address is valid
    if (!isAddress(address)) return toast.error("Invalid address");

    setLoading(true);
    try {
      const tx = await signer.sendTransaction({
        to: address,
        value: wei,
      });
      await tx.wait();
      toast.success(`Success: Sent ${amount} ETH to ${address}`);
    } catch (err: any) {
      toast.error(`Error: ${err?.message || err}`);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap gap-4 w-full">
      <TextInput
        disabled={loading}
        size={15}
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextInput
        disabled={loading}
        value={amount}
        size={8}
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button onClick={sendEth} color="gray" disabled={loading}>
        {loading ? <Spinner /> : "Send"}
      </Button>
    </div>
  );
};

export default EthLabSendEth;
