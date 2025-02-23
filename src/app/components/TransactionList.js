import React from "react";

const TransactionList = ({ transactions }) => {
  return (
    <div className="transaction-list">
      <h3 className="text-xl font-bold">Transactions</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p className="font-bold">{transaction.description}</p>
            <p>${transaction.amount.toFixed(2)}</p>
            <p className="text-gray-500">{transaction.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
