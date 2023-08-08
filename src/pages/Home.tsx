import { Button } from "flowbite-react";
import { ReactComponent as FileShieldSVG } from "@/assets/file-shield.svg";
import { ReactComponent as FileSearchSVG } from "@/assets/file-search.svg";
import { ReactComponent as TerminalSvg } from "@/assets/terminal.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mx-auto my-10 px-4">
      <article className="max-w-4xl mx-auto">
        <div className="flex gap-4 items-center">
          <img
            className="mx-auto max-h-[500px] h-[50vh] min-h-[200px]"
            src="/images/hero.png"
            alt="EthLab"
          />
          <article className="format w-full">
            <h1 className="dark:text-white">My EthLab</h1>
            <p className="text-lg">
              EthLab is a playground for Ethereum developers. It is a place to
              experiment with smart contracts, transactions, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contracts">
                <Button>
                  <FileShieldSVG className="w-5 h-5 mr-2 inline" />
                  Contracts
                </Button>
              </Link>

              <Button outline color="gray">
                <FileSearchSVG className="w-5 h-5 mr-2 inline" />
                Txns
              </Button>
              <Link to="/scratchpad">
                <Button outline color="gray">
                  <TerminalSvg className="w-5 h-5 mr-2 inline" />
                  Scripting
                </Button>
              </Link>
            </div>
          </article>
        </div>
      </article>
    </div>
  );
};

export default HomePage;
