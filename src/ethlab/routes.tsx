import ContractsPage from "./ContractsPage";
import ScratchPadPage from "./ScratchPadPage";
import ContractPage from "./ContractPage";
import TransactionsPage from "./TransactionsPage";
import TransactionPage from "./TransactionPage";

export const routes = {
  dev: [
    { path: "/scratchpad", element: <ScratchPadPage /> },
    { path: "/contracts", element: <ContractsPage /> },
    { path: "/contracts/:address", element: <ContractPage /> },
    { path: "/transactions", element: <TransactionsPage /> },
    { path: "/transactions/:address", element: <TransactionPage /> },
  ],
};
