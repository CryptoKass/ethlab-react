import { Contract, Interface } from "ethers";

export const shortAddress = (address?: string | null) => {
  if (address == null) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const humanizeNumber = (n: number) => {
  if (n < 0.001) return `<0.001`;
  if (n < 1) return n.toFixed(3);
  if (n < 1_000) return n.toFixed(2);
  if (n < 1_000_000) return `${(n / 1000).toFixed(2)}k`;
  if (n < 1_000_000_000) return `${(n / 1_000_000).toFixed(2)}m`;
  if (n < 1_000_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}b`;
  return `${(n / 1_000_000_000_000).toFixed(2)}t`;
};

export const isPayable = (contract: Contract, method: string) => {
  const fragment = contract.interface.getFunction(method);
  if (fragment == null) return false;
  return fragment.payable;
};

export const stringifyWithBigInts = (obj: any, spacing: any) => {
  return JSON.stringify(
    obj,
    (_, v) => (typeof v === "bigint" ? v.toString() : v),
    spacing
  );
};

// convert a contract type to a typescript type
// - uint256 -> bigint
// - uint8 -> number
// - string -> string
// - tuple -> any
// - address -> string
// - bool -> boolean
// - bytes32 -> string
// etc
const contractTypeToTypeScript = (type: string) => {
  if (type.startsWith("int8")) return "number";
  if (type.startsWith("uint8")) return "number";
  if (type.startsWith("uint")) return "bigint";
  if (type.startsWith("int")) return "bigint";
  if (type.startsWith("bytes")) return "string";
  if (type.startsWith("address")) return "string";
  if (type.startsWith("bool")) return "boolean";
  if (type.startsWith("string")) return "string";
  return "any";
};

// Converts a Contract Interface to a TypeScript interface declaration
export const contractToTypeScript = (name: string, i: Interface): string => {
  const abi = JSON.parse(i.formatJson());
  const functions = abi.filter((f: any) => f.type === "function");

  let ts = `export interface ${name} {\n`;

  for (const f of functions) {
    let inputs = f.inputs
      .map((i: any) =>
        i.name
          ? `${i.name}: ${contractTypeToTypeScript(i.type)}`
          : `${contractTypeToTypeScript(i.type)}`
      )
      .join(", ");

    let outputs = f.outputs
      .map((i: any) =>
        i.name
          ? `${i.name}: ${contractTypeToTypeScript(i.type)}`
          : `${contractTypeToTypeScript(i.type)}`
      )
      .join(", ");

    if (f.inputs.length < 1) inputs += `options?: any`;
    else inputs += `, options?: any`;
    if (f.outputs.length < 1) outputs = `void`;

    ts += `  ${f.name}(${inputs}): Promise<${outputs}>;\n`;
  }

  ts += "}\n";
  return ts;
};
