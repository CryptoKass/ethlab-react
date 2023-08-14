import { Table, TextInput, Textarea } from "flowbite-react";
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
        <Table.Row className="border-none">
          <Table.HeadCell className="font-medium text-right pl-2 text-sm">
            Hash →
          </Table.HeadCell>
          <Table.Cell className="break-all">
            <TextInput value={details.hash} disabled />
          </Table.Cell>
        </Table.Row>

        <Table.Row className="border-none">
          <Table.HeadCell className="font-medium text-right pl-2 text-sm">
            Block Number →
          </Table.HeadCell>
          <Table.Cell>{details.block}</Table.Cell>
        </Table.Row>

        <Table.Row className="border-none">
          <Table.HeadCell className="font-medium text-right pl-2 text-sm">
            Timestamp →
          </Table.HeadCell>
          <Table.Cell>{details.timestamp}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.HeadCell className="bg-gray-200 font-medium text-right pl-2 text-sm">
            Transaction Action
          </Table.HeadCell>
          <Table.Cell className="break-words py-6">
            <EthLabTransactionAction details={details} />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.HeadCell className="font-medium text-right pl-2 text-sm">
            From →
          </Table.HeadCell>
          <Table.Cell className="break-all">
            <EthLabAccountTooltip address={details.from}>
              <TextInput
                className="w-[400px] max-w-full"
                value={details.from}
                disabled
              />
            </EthLabAccountTooltip>
          </Table.Cell>
        </Table.Row>

        <Table.Row className="border-none">
          <Table.HeadCell className="font-medium text-right pl-2 text-sm">
            To →
          </Table.HeadCell>
          <Table.Cell className="break-all">
            {details.action.type === "call" && (
              <>
                <EthLabAccountTooltip address={details.to || "0x"}>
                  <TextInput
                    className="w-[400px] max-w-full"
                    value={details.to || "-"}
                    disabled
                  />
                </EthLabAccountTooltip>
                <Link
                  to={`/contracts/${details.to}`}
                  className="font-medium text-sm text-blue-600 dark:text-blue-500 hover:underline mt-2 inline-block"
                >
                  View Contract ⤴
                </Link>
              </>
            )}
            {details.action.type === "send" && (
              <EthLabAccountTooltip address={details.to!}>
                <TextInput
                  className="w-[400px] max-w-full"
                  value={details.to || "-"}
                  disabled
                />
              </EthLabAccountTooltip>
            )}
            {details.action.type === "create" && (
              <TextInput value={details.to || "-"} disabled />
            )}
          </Table.Cell>
        </Table.Row>

        <Table.Row className="border-none">
          <Table.HeadCell className="font-medium text-right pl-2 text-sm">
            Value →
          </Table.HeadCell>
          <Table.Cell>
            {formatEther(details.value)} <small>ETH</small>
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.HeadCell className="font-medium text-right pl-2 text-sm">
            Gas Limit →
          </Table.HeadCell>
          <Table.Cell>{details.gasLimit}</Table.Cell>
        </Table.Row>

        <Table.Row className="border-none">
          <Table.HeadCell className="font-medium text-right pl-2 text-sm">
            Gas Price →
          </Table.HeadCell>
          <Table.Cell>{details.gasPrice}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.HeadCell className="font-medium text-right pl-2 text-sm">
            Data →
          </Table.HeadCell>
          <Table.Cell>
            <Textarea
              rows={6}
              className="w-full disabled:cursor-text"
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
