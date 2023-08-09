import { PropsWithChildren, useState } from "react";
import { useProvider } from "./hooks";
import { Spinner, TextInput, Tooltip } from "flowbite-react";
import { formatEther } from "ethers";
import { humanizeNumber } from "./utils";

interface EthLabAccountTooltipProps extends PropsWithChildren {
  address: string;
}

const UPDATE_DELAY = 10_000;

const EthLabAccountTooltip: React.FC<EthLabAccountTooltipProps> = (props) => {
  const provider = useProvider();
  const [balance, setBalance] = useState<BigInt>(BigInt(0));
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState(0);

  const fetchBalance = () => {
    if (!provider) return;
    if (Date.now() - lastUpdate < UPDATE_DELAY) return;
    setLoading(true);
    setLastUpdate(Date.now());
    provider
      .getBalance(props.address)
      .then((balance) => setBalance(balance))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <Tooltip
      style="light"
      className="shadow-2xl max-w-xs w-full"
      content={
        <div className="space-y-2">
          <h4 className="text-lg opacity-50">Balance</h4>
          <span className="text-2xl">
            {loading && <Spinner className="mr-2" />}
            {!loading &&
              humanizeNumber(
                parseInt(formatEther(balance?.toString() || "0"))
              )}{" "}
            <small>ETH</small>
          </span>
          <TextInput className="w-full" readOnly value={props.address} />
        </div>
      }
    >
      <span onMouseEnter={() => fetchBalance()}>{props.children}</span>
    </Tooltip>
  );
};

export default EthLabAccountTooltip;
