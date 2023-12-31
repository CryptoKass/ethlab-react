import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { Flowbite } from "flowbite-react";
import { EthLabProvider } from "../ethlab/EthLabContext";
import { ethlabTheme } from "../ethlab/theme";
import Footer from "./Footer";
import config from "@/ethlab/config";

const Layout = () => {
  return (
    <Flowbite theme={{ theme: ethlabTheme }}>
      <EthLabProvider initialRPC={config.RPC_URL}>
        <div className="font-mono text-gray-950 dark:text-white">
          <div className="min-h-screen relative pb-20">
            <Navigation />
            <Outlet />
            <Footer />
          </div>
        </div>
      </EthLabProvider>
    </Flowbite>
  );
};

export default Layout;
