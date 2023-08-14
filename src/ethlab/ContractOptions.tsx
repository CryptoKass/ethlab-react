import { Contract } from "ethers";
import { Dropdown } from "flowbite-react";
import { toast } from "react-toastify";
import { contractToTypeScript } from "./utils";

interface ContractOptionsProps {
  name: string;
  contract: Contract;
}

const ContractOptions: React.FC<ContractOptionsProps> = (props) => {
  const copy = (text: string, message: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(message);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to copy to clipboard");
      });
  };

  return (
    <Dropdown color="gray" label="Options">
      <Dropdown.Item
        onClick={() =>
          copy(props.contract.interface.formatJson(), "Copied ABI to Clipboard")
        }
      >
        Copy ABI
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() =>
          copy(
            props.contract.interface.format().join("\n"),
            "Copied Human-readable ABI to Clipboard"
          )
        }
      >
        Copy Human-readable ABI
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() =>
          copy(
            contractToTypeScript(props.name, props.contract.interface),
            `Copied typescript interface for ${props.name} to Clipboard`
          )
        }
      >
        Copy TypeScript Interface
      </Dropdown.Item>
    </Dropdown>
  );
};

export default ContractOptions;
