"use client";
import { useEffect, useState } from "react";
import BalanceCard from "../components/BalanceCard";
import TransactionList from "../components/TransactionList";
import Chart from "../components/Chart";
import styles from "../styles/Home.module.css";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [aggregatedData, setAggregatedData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch("/api/transactions");
      const data = await response.json();
      setTransactions(data);
      calculateBalance(data);
      aggregateDataByDate(data);
    };
    fetchTransactions();
  }, []);

  // Calculate total balance
  const calculateBalance = (transactions) => {
    const total = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    setBalance(total);
  };

  // Aggregate income and expenses by date
  const aggregateDataByDate = (transactions) => {
    const dateData = {};

    transactions.forEach((transaction) => {
      const date = transaction.date;
      // Initialize a new object that has income and expenses
      if (!dateData[date]) {
        dateData[date] = { income: 0, expenses: 0 };
      }

      if (transaction.amount > 0) {
        dateData[date].income += transaction.amount; // Add to income
      } else {
        dateData[date].expenses += Math.abs(transaction.amount); // Add to expenses (remove negative sign)
      }
      console.log(dateData);
    });

    // Object.keys() gives us an array of all the unique dates in dateData (the keys).
    const aggregated = Object.keys(dateData).map((date) => ({
      date,
      income: dateData[date].income,
      expenses: dateData[date].expenses,
    }));

    setAggregatedData(aggregated); // Set aggregated data for use in the chart
  };

  return (
    <div className={styles.container}>
      <h1 className="font-bold">Financial Dashboard</h1>
      <BalanceCard balance={balance} />
      <div className={styles.chart}>
        <Chart aggregatedData={aggregatedData} />
      </div>
      <TransactionList transactions={transactions} />
    </div>
  );
}
