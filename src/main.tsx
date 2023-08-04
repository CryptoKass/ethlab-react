import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { EthLabProvider } from "./internal/EthLabContext.tsx";
import { JsonRpcProvider } from "ethers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EthLabProvider
      initialProvider={new JsonRpcProvider("http://127.0.0.1:8545")}
    >
      <App />
    </EthLabProvider>
  </React.StrictMode>
);
