"use client";

import { ContractInfo } from "@/internal/types";
import { Spinner, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <div className="container mx-auto my-10 px-4">
      <article className="format dark:text-white mx-auto">
        <h1 className="dark:text-white">Contracts</h1>
        <p>
          This page lists all of the contracts that are deployed to the
          development network.
        </p>
      </article>
      <div className="my-10 max-w-2xl mx-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {contracts.map((contract) => (
              <Table.Row key={contract.name}>
                <Table.Cell>
                  <Link
                    className="w-full"
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
