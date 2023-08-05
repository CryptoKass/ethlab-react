import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { Flowbite } from "flowbite-react";
import { EthLabProvider } from "../internal/EthLabContext";
import { JsonRpcProvider } from "ethers";
import { ethlabTheme } from "../internal/theme";
import Footer from "./Footer";

const Layout = () => {
  return (
    <Flowbite theme={{ theme: ethlabTheme }}>
      <EthLabProvider
      // initialProvider={new JsonRpcProvider("http://127.0.0.1:8545")}
      >
        <div className="font-mono text-gray-950 dark:text-white">
          <Navigation />
          <Outlet />
          <Footer />
        </div>
      </EthLabProvider>
    </Flowbite>
  );
};

export default Layout;
