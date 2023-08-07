import ContractsPage from "./ContractsPage";
import ScratchPadPage from "./ScratchPadPage";
import ContractPage from "./ContractPage";

export const routes = {
  dev: [
    { path: "/scratchpad", element: <ScratchPadPage /> },
    { path: "/contracts", element: <ContractsPage /> },
    { path: "/contracts/:address", element: <ContractPage /> },
  ],
};
