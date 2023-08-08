import { formatEther } from "ethers";
import { TransactionDetails } from "./types";
import { shortAddress } from "./utils";
import { Link } from "react-router-dom";
import { Badge } from "flowbite-react";

interface EthLabTransactionActionProps {
  details: TransactionDetails;
}

const EthLabTransactionAction: React.FC<EthLabTransactionActionProps> = ({
  details,
}) => {
  return (
    <>
      <Badge className="text-md inline-block px-4 mb-2">
        {details.action.type}
      </Badge>
      <br />

      {/* SEND */}
      {details.action.type === "send" && (
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/address/${details.from}`}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {shortAddress(details.from)}
          </Link>
          <span className="opacity-50">→</span>
          <span>
            {formatEther(details.value)}
            <small> ETH</small>
          </span>
          <span className="opacity-50">→</span>
          <Link
            to={`/address/${details.to}`}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {shortAddress(details.to)}
          </Link>
        </div>
      )}

      {/* CONTRACT CREATED */}
      {details.action.type === "create" && (
        <div className="flex flex-wrap gap-2">
          <span>Contract Created</span>
          <span className="opacity-50">→</span>
          <Link
            to={`/contract/${details.from}`}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {shortAddress(details.contract)}
          </Link>
        </div>
      )}

      {/* CONTRACT CALLED */}
      {details.action.type === "call" && (
        <div className="flex flex-wrap gap-2">
          <Link to={`/address/${details.from}`}>
            CALLER
            <small className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              {" "}
              ({shortAddress(details.from)})
            </small>
          </Link>
          <span className="opacity-50">→</span>
          <Link to={`/contracts/${details.to}`}>
            CONTRACT
            <small className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              {" "}
              ({shortAddress(details.to)})
            </small>
          </Link>
          <span className="opacity-50">→</span>
          <span>
            (METHOD) <b>{details.method}</b>
          </span>
        </div>
      )}
    </>
  );
};

export default EthLabTransactionAction;
