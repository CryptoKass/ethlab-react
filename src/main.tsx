import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { EthLabProvider } from "./internal/EthLabContext.tsx";
import { JsonRpcProvider } from "ethers";
import Navigation from "./components/Navigation.tsx";
import { Flowbite } from "flowbite-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
