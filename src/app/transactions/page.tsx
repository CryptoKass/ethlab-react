"use client";
import { TransactionSnippet } from "@/internal/types";
import { shortAddress } from "@/internal/utils";
import { Table } from "flowbite-react";
import { formatEther } from "ethers";
import { useEffect } from "react";

const TransactionsPage = () => {
  let transactions: TransactionSnippet[] = [];

  useEffect(() => {
    fetch("/api/transactions")
      .then(async (res) => {
        transactions = await res.json();
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto my-10 px-4">
      <article className="format">
        <h1>Recent Transactions</h1>
      </article>
      <Table>
        <Table.Head>
          <Table.HeadCell>Hash</Table.HeadCell>
          <Table.HeadCell>Block</Table.HeadCell>
          <Table.HeadCell>From</Table.HeadCell>
          <Table.HeadCell>To</Table.HeadCell>
          <Table.HeadCell>Value</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {transactions.map((transaction) => (
            <Table.Row key={transaction.hash}>
              <Table.Cell>{transaction.hash.slice(0, 8) + "..."}</Table.Cell>
              <Table.Cell>{transaction.block}</Table.Cell>
              <Table.Cell>{shortAddress(transaction.from)}</Table.Cell>
              <Table.Cell>{shortAddress(transaction.to)}</Table.Cell>
              <Table.Cell>{formatEther(transaction.value)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TransactionsPage;
