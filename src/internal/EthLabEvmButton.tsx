import React, { useState } from "react";
import { JsonRpcProvider } from "ethers";
import { Button } from "flowbite-react";

interface EthLabEvmButtonProps {
  provider: JsonRpcProvider;
  method: string;
  args?: any[];
  children?: React.ReactNode;
}

const EthLabEvmButton: React.FC<EthLabEvmButtonProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const evmRequest = async (method: string, args?: any[]) => {
    if (!props.provider) return;
    setLoading(true);
    props.provider
      .send(method, args || [])
      .then(console.log)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <Button onClick={() => evmRequest(props.method, props.args)} color="gray">
      {props.children}
    </Button>
  );
};

export default EthLabEvmButton;
