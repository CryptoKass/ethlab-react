import { TransactionSnippet } from "./types";
import { getMethodSignature } from "./contracts";

interface EthLabTransactionIntentProps {
  details: TransactionSnippet;
  className?: string;
  lite?: boolean;
}

const EthLabTransactionIntent: React.FC<EthLabTransactionIntentProps> = ({
  details,
  className,
  lite,
}) => {
  let label = "_";
  if (details.action.type === "send") label = "Send";
  if (details.action.type === "create") label = "Deploy";
  if (details.action.type === "call")
    label = getMethodSignature(details.method || "0x0");

  if (lite) label = label.split("(")[0];
  return <span className={className}>{label}</span>;
};

export default EthLabTransactionIntent;
