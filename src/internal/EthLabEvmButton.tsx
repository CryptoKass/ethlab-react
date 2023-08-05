import React, { useState } from "react";
import { JsonRpcProvider } from "ethers";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";

interface EthLabEvmButtonProps {
  provider: JsonRpcProvider;
  method: string;
  args?: any[];
  message?: string;
  children?: React.ReactNode;
}

const EthLabEvmButton: React.FC<EthLabEvmButtonProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSuccess = (res: any) => {
    console.log(res);
    toast.success(props.message || `Success: '${props.method}()' called`);
  };

  const onError = (err: any) => {
    console.error(err);
    toast.error(`Error: '${props.method}()' failed: ${err?.message || err}`);
  };

  const evmRequest = async (method: string, args?: any[]) => {
    if (!props.provider) return;
    setLoading(true);
    props.provider
      .send(method, args || [])
      .then(onSuccess)
      .catch(onError)
      .finally(() => setLoading(false));
  };

  return (
    <Button onClick={() => evmRequest(props.method, props.args)} color="gray">
      {props.children}
    </Button>
  );
};

export default EthLabEvmButton;
