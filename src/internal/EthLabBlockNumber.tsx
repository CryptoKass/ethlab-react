import { useBlockNumber } from "./hooks";

const EthLabBlockNumber = () => {
  const num = useBlockNumber();
  return (
    <div className="text-xs opacity-75 hover:opacity-100">
      {num && (
        <div className="text-emerald-600 dark:text-emerald-300 flex gap-1 items-center">
          {num}
          <span className="block bg-emerald-600 dark:bg-emerald-300 w-2 h-2 rounded-full" />
        </div>
      )}
      {!num && (
        <div className="text-pink-700 dark:text-pink-300 flex gap-1 items-center">
          disconnected
          <span className="block bg-pink-700 dark:bg-pink-300 w-2 h-2 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default EthLabBlockNumber;
