import { Table, Textarea } from "flowbite-react";
import { TransactionDetails } from "./types";
import { formatEther } from "ethers";
import EthLabTransactionAction from "./EthLabTransactionAction";
import { Link } from "react-router-dom";
import EthLabAccountTooltip from "./EthLabAccountTooltip";

interface EthLabTransactionTableProps {
  details: TransactionDetails;
}

const EthLabTransactionTable: React.FC<EthLabTransactionTableProps> = ({
  details,
}) => {
  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.HeadCell>Hash</Table.HeadCell>
          <Table.Cell>{details.hash}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.HeadCell>Block Number</Table.HeadCell>
          <Table.Cell>{details.block}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.HeadCell>Timestamp</Table.HeadCell>
          <Table.Cell>{details.timestamp}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.HeadCell>Transaction Action</Table.HeadCell>
          <Table.Cell>
            <EthLabTransactionAction details={details} />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.HeadCell>From</Table.HeadCell>
          <Table.Cell>
            <EthLabAccountTooltip address={details.from}>
              <span className="font-bold text-black dark:text-white">
                {details.from}
              </span>
            </EthLabAccountTooltip>
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.HeadCell>To</Table.HeadCell>
          <Table.Cell>
            {details.action.type === "call" && (
              <Link
                to={`/contracts/${details.to}`}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                {details.to}
              </Link>
            )}
            {details.action.type === "send" && (
              <EthLabAccountTooltip address={details.to!}>
                <span className="font-bold text-black dark:text-white">
                  {details.to}
                </span>
              </EthLabAccountTooltip>
            )}
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.HeadCell>Value</Table.HeadCell>
          <Table.Cell>
            {formatEther(details.value)} <small>ETH</small>
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.HeadCell>Gas Limit</Table.HeadCell>
          <Table.Cell>{details.gasLimit}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.HeadCell>Gas Price</Table.HeadCell>
          <Table.Cell>{details.gasPrice}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.HeadCell>Data</Table.HeadCell>
          <Table.Cell>
            <Textarea
              rows={6}
              className="w-full"
              disabled
              value={details.data}
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default EthLabTransactionTable;
