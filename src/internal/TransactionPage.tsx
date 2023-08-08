import { useEffect, useState } from "react";
import { fetchTransactionDetails } from "./fetchTransactions";
import { TransactionDetails } from "./types";
import { useProvider } from "./hooks";
import { useParams } from "react-router-dom";
import EthLabPage from "./EthLabPage";
import EthLabTransaction from "./EthLabTransaction";
import { Spinner } from "flowbite-react";
import { ReactComponent as ReceiptSVG } from "@/assets/receipt.svg";
import { shortAddress } from "./utils";

const TransactionPage = () => {
  const { address } = useParams<{ address: string }>();
  const provider = useProvider();
  const [details, setDetails] = useState<TransactionDetails | null>(null);

  useEffect(() => {
    if (!provider) return;
    if (!address) return;
    fetchTransactionDetails(provider, address)
      .then((tx) => setDetails(tx))
      .catch((err) => console.error(err));
  }, [provider, address]);

  return (
    <EthLabPage>
      <article className="format dark:text-white mx-auto mb-8">
        <h5 className="dark:text-white text-black flex items-stretch">
          <ReceiptSVG className="w-5 h-5 mr-2 inline" />
          <span className="uppercase">Transaction:</span>
          <span>{details?.hash.slice(0, 8)}...</span>
        </h5>
      </article>
      <div className="mx-auto max-w-3xl">
        {details && <EthLabTransaction details={details} />}
        {!details && <Spinner className="mx-auto" />}
      </div>
    </EthLabPage>
  );
};

export default TransactionPage;
