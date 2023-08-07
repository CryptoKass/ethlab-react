"use client";

import { ContractInfo } from "@/internal/types";
import { Spinner, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Avvvatars from "avvvatars-react";
import { ReactComponent as FileShieldSVG } from "@/assets/file-shield.svg";

const ContractsPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [contracts, setContracts] = useState<ContractInfo[]>([]);

  const loadContracts = async () => {
    const _response = await fetch("/contracts.json");
    const _deployments = await _response.json();

    const _contracts = Object.keys(_deployments.contracts).map((name) => {
      const { abi, address } = _deployments.contracts[name];
      return { name, address, abi } as ContractInfo;
    });

    setContracts(_contracts);
  };

  useEffect(() => {
    setLoading(true);
    loadContracts()
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto my-20 px-4">
      <article className="format dark:text-white mx-auto mb-8">
        <h5 className="dark:text-white text-black flex items-baseline">
          <FileShieldSVG className="w-5 h-5 mr-2 inline" />
          <span className="uppercase">Contracts</span>
        </h5>
        <p className="text-sm">
          This page lists all of the contracts that are registered in the
          `public/contracts.json` file. Click on a contract to interact.
        </p>
      </article>
      <hr />
      <div className="my-10 max-w-2xl mx-auto">
        <Table className="text-md">
          <Table.Head>
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {contracts.map((contract) => (
              <Table.Row
                key={contract.name}
                className="hover:text-black dark:hover:text-white"
              >
                <Table.Cell>
                  <Link to={`/contracts/${contract.address}`}>
                    <Avvvatars
                      value={contract.address}
                      style="shape"
                      size={32}
                      radius={4}
                    />
                  </Link>
                </Table.Cell>

                <Table.Cell>
                  <Link
                    className="w-full "
                    to={`/contracts/${contract.address}`}
                  >
                    {contract.name}
                  </Link>
                </Table.Cell>

                <Table.Cell>
                  <Link
                    className="w-full"
                    to={`/contracts/${contract.address}`}
                  >
                    {contract.address}
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
            {loading && (
              <Table.Row>
                <Table.Cell colSpan={2}>
                  <Spinner />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ContractsPage;
