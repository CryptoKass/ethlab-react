import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { Flowbite } from "flowbite-react";
import { EthLabProvider } from "../internal/EthLabContext";
import { ethlabTheme } from "../internal/theme";
import Footer from "./Footer";

// VITE_RPC_URL: defined inside the .env file
const RPC_URL = import.meta.env.VITE_RPC_URL || "http://127.0.0.1:8545";

const Layout = () => {
  return (
    <Flowbite theme={{ theme: ethlabTheme }}>
      <EthLabProvider initialRPC={RPC_URL}>
        <div className="font-mono text-gray-950 dark:text-white">
          <Navigation />
          <div className="min-h-[80vh]">
            <Outlet />
          </div>
          <Footer />
        </div>
      </EthLabProvider>
    </Flowbite>
  );
};

export default Layout;
