import { useEffect, useState } from "react";
import EthLabPage from "./EthLabPage";
import { TransactionSnippet } from "./types";
import { useBlockNumber, useProvider } from "./hooks";
import { fetchAllTransactions } from "./fetchTransactions";
import { ReactComponent as FileSearchSVG } from "@/assets/file-search.svg";
import EthLabTransactionsTable from "./EthLabTxTable";
import { toast } from "react-toastify";
import { ToggleSwitch } from "flowbite-react";

const TransactionsPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const provider = useProvider();
  const [isLive, setIsLive] = useState<boolean>(false);
  const blockNum = useBlockNumber(true);
  const [txs, setTxs] = useState<TransactionSnippet[]>([]);
  const [lastBlock, setLastBlock] = useState<number>(-1);
  const [firstBlock, setFirstBlock] = useState<number>(-1);

  useEffect(() => {
    if (!provider || !blockNum) return;
    if (!isLive && lastBlock > -1) return;

    setLoading(true);
    // calculate the fromBlock
    const _fromBlock = lastBlock === -1 ? blockNum - 10 : lastBlock;
    // update the first block if needed
    if (_fromBlock < firstBlock || firstBlock === -1) setFirstBlock(_fromBlock);
    // update the last block
    setLastBlock(blockNum);

    // fetch all transactions
    fetchAllTransactions(provider, _fromBlock, blockNum)
      .then((txs) => {
        setTxs((t) => [...t, ...txs]);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [provider, blockNum, isLive]);

  return (
    <EthLabPage>
      <article className="format dark:text-white mx-auto mb-8">
        <h5 className="dark:text-white text-black flex items-stretch">
          <FileSearchSVG className="w-5 h-5 mr-2 inline" />
          <span className="uppercase">Transactions</span>
        </h5>
        <p className="text-sm">
          Showing all transactions ({txs.length}) from block {firstBlock} to{" "}
          {blockNum} ({lastBlock - firstBlock} blocks). Click on a transaction
          to view details.
        </p>
        <ToggleSwitch label="Live mode" checked={isLive} onChange={setIsLive} />
      </article>
      <div className="mx-auto max-w-3xl">
        <EthLabTransactionsTable txs={[...txs.reverse()]} loading={loading} />
      </div>
    </EthLabPage>
  );
};

export default TransactionsPage;
