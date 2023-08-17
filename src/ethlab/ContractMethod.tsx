import { Contract, type ContractTransactionResponse } from "ethers";
import { useState } from "react";
import { toast } from "react-toastify";
import { isPayable, stringifyWithBigInts } from "./utils";
import { Accordion, Badge, Button, Spinner, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

interface ContractMethodProps {
  contract: Contract;
  method: string;
}

const ContractMethod: React.FC<ContractMethodProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [value, setValue] = useState<string>("0");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 0. set value if needed
      let opts: any = {};
      if (isPayable(props.contract, props.method)) opts.value = value;

      // 1. get form data
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const entries = Object.fromEntries(formData.entries());

      // 2. call contract method
      const func = props.contract.getFunction(props.method);
      const result = await func(...Object.values(entries));

      // 3. if it is a read method return the result
      if (
        func.fragment.stateMutability == "view" ||
        func.fragment.stateMutability == "pure"
      )
        setResult(stringifyWithBigInts(result, 2));
      else {
        // otherwise return a transaction
        const tx = result as ContractTransactionResponse;

        const receipt = await tx.wait();
        setResult(
          <>
            {receipt?.status == 1 ? (
              <Badge className="inline-block mb-2 mr-2" color="success">
                ✔️ Success
              </Badge>
            ) : (
              <Badge className="inline-block mb-2 mr-2" color="danger">
                ✕ Reverted
              </Badge>
            )}
            Transaction Completed:{" "}
            <Link
              className="text-blue-600 dark:text-blue-500 underline"
              to={`/transactions/${tx.hash}`}
            >
              {tx.hash.slice(0, 8)}...{tx.hash.slice(-6)}
            </Link>
          </>
        );
      }
    } catch (error: any) {
      toast.error(
        `Error: '${props.method}()' failed: ${
          error?.data || error?.message || error
        }`
      );
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Accordion className="bg-gray-100 dark:bg-gray-800">
      <Accordion.Panel>
        <Accordion.Title className="p-3">
          <h4 className="font-bold text-lg">
            {props.method}()
            <small className="text-gray-400 ml-2 font-normal text-sm">
              returns (
              {props.contract
                .getFunction(props.method)
                .fragment.outputs.map((output) =>
                  output.name ? `${output.name}: ${output.type}` : output.type
                )
                .join(", ")}
              )
            </small>
          </h4>
        </Accordion.Title>
        <Accordion.Content className="p-4 bg-white dark:bg-gray-800">
          <div className="space-y-4">
            <div></div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              {props.contract
                .getFunction(props.method)
                .fragment.inputs.map((input, i) => (
                  <div key={i}>
                    <TextInput
                      className="w-full"
                      type="text"
                      name={input.name}
                      id={input.name}
                      placeholder={
                        input.name ? `${input.name}: ${input.type}` : input.type
                      }
                    />
                  </div>
                ))}
              {isPayable(props.contract, props.method) && (
                <div className="w-full">
                  <label className="block" htmlFor="value">
                    Eth Value
                  </label>
                  <TextInput
                    type="text"
                    name="value"
                    id="value"
                    placeholder="0"
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-4 justify-between">
                <Button type="button" color="gray">
                  More Options
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? <Spinner /> : "Send →"}
                </Button>
              </div>
            </form>

            {result && (
              <div className="mt-4">
                <hr />
                <small className="mt-4 mb-2 block">Result:</small>
                <div className="w-full overflow-x-scroll border border-gray-300 dark:border-gray-900 bg-gray-100 dark:bg-gray-900 rounded p-4">
                  <pre className="text-xs">{result}</pre>
                </div>
              </div>
            )}
          </div>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default ContractMethod;
