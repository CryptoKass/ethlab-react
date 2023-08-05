import { EthLabSnapshot } from "@/internal/EthLabSnapshot";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto my-10 px-4">
      <article className="format mx-auto text-center">
        <img
          className="mx-auto max-h-[500px] h-[50vh] min-h-[200px]"
          src="/images/hero.png"
          alt="EthLab"
        />
        <h1 className="dark:text-white">EthLab</h1>
        <p className="text-lg">
          EthLab is a playground for Ethereum developers. It is a place to
          experiment with smart contracts, transactions, and more.
        </p>
        <EthLabSnapshot />
      </article>
    </div>
  );
}
