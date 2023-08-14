import { formatEther } from "ethers";
import { TransactionDetails } from "./types";
import { shortAddress } from "./utils";
import { Link } from "react-router-dom";
import { Badge } from "flowbite-react";
import EthLabAccountTooltip from "./EthLabAccountTooltip";
import EthLabTransactionIntent from "./EthLabTransactionIntent";

interface EthLabTransactionActionProps {
  details: TransactionDetails;
}

const EthLabTransactionAction: React.FC<EthLabTransactionActionProps> = ({
  details,
}) => {
  return (
    <>
      <Badge color="indigo" className="inline-block px-2 mb-2">
        <EthLabTransactionIntent details={details} />
      </Badge>
      <br />

      {/* SEND */}
      {details.action.type === "send" && (
        <div className="flex flex-wrap gap-2">
          <EthLabAccountTooltip address={details.from}>
            <span className="text-black dark:text-white font-bold">
              {shortAddress(details.from)}
            </span>
          </EthLabAccountTooltip>
          <span className="opacity-50">→</span>
          <span>
            {formatEther(details.value)}
            <small> ETH</small>
          </span>
          <span className="opacity-50">→</span>

          <EthLabAccountTooltip address={details.to!}>
            <span className="text-black dark:text-white font-bold">
              {shortAddress(details.to)}
            </span>
          </EthLabAccountTooltip>
        </div>
      )}

      {/* CONTRACT CREATED */}
      {details.action.type === "create" && (
        <div className="flex flex-wrap gap-2">
          <span>Contract Created</span>
          <span className="opacity-50">→</span>
          <Link
            to={`/contract/${details.contract}`}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {shortAddress(details.contract)}
          </Link>
        </div>
      )}

      {/* CONTRACT CALLED */}
      {details.action.type === "call" && (
        <div className="flex flex-wrap gap-2 max-w-full">
          <EthLabAccountTooltip address={details.from}>
            CALLER
            <small className="text-black dark:text-white font-bold">
              {" "}
              ({shortAddress(details.from)})
            </small>
          </EthLabAccountTooltip>
          <span className="opacity-50">→</span>
          <Link to={`/contracts/${details.to}`}>
            (CONTRACT)
            <small className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              {" "}
              ({shortAddress(details.to)})
            </small>
          </Link>
          <span className="opacity-50">→</span>
          CALL
        </div>
      )}
    </>
  );
};

export default EthLabTransactionAction;
