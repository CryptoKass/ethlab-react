import React, { useState } from "react";
import { JsonRpcProvider } from "ethers";
import { Button, Spinner } from "flowbite-react";
import { toast } from "react-toastify";

interface EthLabEvmButtonProps {
  provider: JsonRpcProvider;
  method: string;
  args?: any[];
  message?: string;
  children?: React.ReactNode;
  color?: string;
  className?: string;
  callback?: (a: any) => void;
}

const EthLabEvmButton: React.FC<EthLabEvmButtonProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSuccess = (res: any) => {
    console.log(res);
    toast.success(props.message || `Success: '${props.method}()' called`);
    if (props.callback != undefined) props.callback(res);
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
    <Button
      onClick={() => evmRequest(props.method, props.args)}
      color={props.color || "gray"}
      className={props.className}
      disabled={loading}
    >
      <span>{props.children}</span>
      {loading && <Spinner className="ml-2" />}
    </Button>
  );
};

export default EthLabEvmButton;
