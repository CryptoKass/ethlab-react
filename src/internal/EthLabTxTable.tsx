import { Spinner, Table } from "flowbite-react";
import { TransactionSnippet } from "./types";
import { Link } from "react-router-dom";
import { humanizeNumber, shortAddress } from "./utils";
import { formatEther } from "ethers";

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
            <Table.Cell>
              <Link to={`/transactions/${tx.hash}`}>
                {tx.hash.slice(0, 8)}...
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Link to={`/accounts/${tx.from}`}>{shortAddress(tx.from)}</Link>
            </Table.Cell>
            <Table.Cell>
              <Link to={`/accounts/${tx.to}`}>{shortAddress(tx.to)}</Link>
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
