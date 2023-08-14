import { useState } from "react";
import { useConnect } from "./hooks";
import { Button, Select, Spinner } from "flowbite-react";
import AccountsJSON from "@/assets/accounts.json";
import { shortAddress } from "./utils";

interface EthLabConnectInternalProps {
  onConnected?: (a: any) => void;
}

const EthLabConnectInternal: React.FC<EthLabConnectInternalProps> = (props) => {
  const [address, setAddress] = useState<string>(AccountsJSON[0].address);
  const [loading, setLoading] = useState<boolean>(false);
  const { connectInternalAccount } = useConnect();

  const connect = () => {
    setLoading(true);
    connectInternalAccount(address)
      .then((res) => {
        if (props.onConnected) props.onConnected(res);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-stretch">
      <Select
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full"
        sizing="3xl"
      >
        {AccountsJSON.map((account) => (
          <option key={account.address} value={account.address}>
            {account.name || shortAddress(account.address)}
          </option>
        ))}
      </Select>
      <Button
        color="gray"
        onClick={() => connect()}
        className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-md"
        disabled={loading || address == ""}
      >
        {loading ? <Spinner /> : "Connect"}
      </Button>
    </div>
  );
};

export default EthLabConnectInternal;
