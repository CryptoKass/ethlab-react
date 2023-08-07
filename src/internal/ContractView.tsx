import { Contract } from "ethers";
import ContractMethod from "./ContractMethod";
import { Button } from "flowbite-react";
import ButtonGroup from "flowbite-react/lib/esm/components/Button/ButtonGroup";
import { useState } from "react";
import ContractOptions from "./ContractOptions";

interface ContractViewProps {
  name: string;
  contract: Contract;
}

const ContractView: React.FC<ContractViewProps> = (props) => {
  const abi = JSON.parse(props.contract.interface.formatJson());
  const [view, setView] = useState<string>("read");

  // filter for methods that can be read as opposed to sending a transaction
  // i.e. use view, pure or constant
  const readMethods = abi.filter(
    (method: any) =>
      method.stateMutability === "view" ||
      method.stateMutability === "pure" ||
      method.stateMutability === "constant"
  );

  // filter for methods that can be sent as a transaction
  // i.e. use payable or nonpayable
  const writeMethods = abi.filter(
    (method: any) =>
      method.type === "function" &&
      method.stateMutability != "view" &&
      method.stateMutability != "pure" &&
      method.stateMutability != "constant"
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-4 justify-between">
        <ButtonGroup>
          <Button
            color="gray"
            onClick={() => setView("read")}
            className={view === "read" ? "bg-gray-200 dark:bg-gray-800" : ""}
          >
            Read
          </Button>
          <Button
            color="gray"
            onClick={() => setView("write")}
            className={view === "write" ? "bg-gray-200 dark:bg-gray-800" : ""}
          >
            Write
          </Button>
        </ButtonGroup>
        <ContractOptions contract={props.contract} name={props.name} />
      </div>
      {view === "read" && (
        <div className="space-y-10">
          {readMethods.map((method: any, i: number) => (
            <ContractMethod
              key={i}
              contract={props.contract}
              method={method.name}
            />
          ))}
        </div>
      )}
      {view === "write" && (
        <div className="space-y-10">
          {writeMethods.map((method: any, i: number) => (
            <ContractMethod
              key={i}
              contract={props.contract}
              method={method.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContractView;
