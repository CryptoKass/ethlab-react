import { Spinner, Table } from "flowbite-react";
import { TransactionSnippet } from "./types";
import { Link } from "react-router-dom";
import { humanizeNumber, shortAddress } from "./utils";
import { formatEther } from "ethers";
import EthLabAccountTooltip from "./EthLabAccountTooltip";

interface EthLabTxTableProps {
  txs: TransactionSnippet[];
  loading?: boolean;
}

const EthLabTxTable: React.FC<EthLabTxTableProps> = (props) => {
  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Hash</Table.HeadCell>
        <Table.HeadCell>From</Table.HeadCell>
        <Table.HeadCell>To</Table.HeadCell>
        <Table.HeadCell>Value</Table.HeadCell>
        <Table.HeadCell>BlockNumber</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {props.txs.map((tx) => (
          <Table.Row key={tx.hash}>
            <Table.Cell className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              <Link to={`/transactions/${tx.hash}`}>
                {tx.hash.slice(0, 8)}...
              </Link>
            </Table.Cell>
            <Table.Cell>
              <EthLabAccountTooltip address={tx.from}>
                {shortAddress(tx.from)}
              </EthLabAccountTooltip>
            </Table.Cell>
            <Table.Cell>
              {tx.to === null && <>CONTRACT CREATION</>}
              {tx.to !== null && tx.to && (
                <EthLabAccountTooltip address={tx.to}>
                  {shortAddress(tx.to)}
                </EthLabAccountTooltip>
              )}
            </Table.Cell>
            <Table.Cell>
              {humanizeNumber(parseFloat(formatEther(tx.value.toString())))}
              <small> ETH</small>
            </Table.Cell>
            <Table.Cell>
              <Link to={`/blocks/${tx.block}`}>{tx.block}</Link>
            </Table.Cell>
          </Table.Row>
        ))}
        {props.loading && (
          <Table.Row>
            <Table.Cell colSpan={5}>
              <div className="flex justify-center">
                <Spinner />
              </div>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export default EthLabTxTable;
