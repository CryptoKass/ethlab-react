import { Badge, Spinner, Table } from "flowbite-react";
import { TransactionSnippet } from "./types";
import { Link } from "react-router-dom";
import { humanizeNumber, shortAddress } from "./utils";
import { formatEther } from "ethers";
import EthLabAccountTooltip from "./EthLabAccountTooltip";
import EthLabTransactionIntent from "./EthLabTransactionIntent";

interface EthLabTxTableProps {
  txs: TransactionSnippet[];
  loading?: boolean;
}

const EthLabTxTable: React.FC<EthLabTxTableProps> = (props) => {
  return (
    <Table>
      <Table.Head>
        <Table.HeadCell className="text-left">Hash</Table.HeadCell>
        <Table.HeadCell className="text-left">Method</Table.HeadCell>
        <Table.HeadCell className="text-left">From</Table.HeadCell>
        <Table.HeadCell className="text-left"></Table.HeadCell>
        <Table.HeadCell className="text-left">To</Table.HeadCell>
        <Table.HeadCell className="text-left">Value</Table.HeadCell>
        <Table.HeadCell className="text-left">Block</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {props.txs.map((tx) => (
          <Table.Row key={tx.hash}>
            <Table.Cell>
              <Link
                className=" hover:underline"
                to={`/transactions/${tx.hash}`}
              >
                <div className="text-blue-600 dark:text-blue-500">
                  {tx.hash.slice(0, 16)}...
                </div>
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Badge
                color="indigo"
                className="justify-center px-2 overflow-x-scroll"
              >
                <EthLabTransactionIntent lite details={tx} />
              </Badge>
            </Table.Cell>
            <Table.Cell>
              <EthLabAccountTooltip address={tx.from}>
                {shortAddress(tx.from)}
              </EthLabAccountTooltip>
            </Table.Cell>
            <Table.Cell>
              <Badge color="success" className="mr-2 inline-block px-2">
                →
              </Badge>
            </Table.Cell>
            <Table.Cell>
              {tx.to === null && <>-</>}
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
