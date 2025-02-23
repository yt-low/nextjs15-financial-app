import { NextResponse } from "next/server";

export const GET = () => {
  const transactions = [
    { id: 1, description: "Salary", amount: 2000, date: "2025-02-20" },
    { id: 2, description: "Groceries", amount: -150, date: "2025-02-21" },
    {
      id: 3,
      description: "Electricity Bill",
      amount: -100,
      date: "2025-02-22",
    },
    { id: 4, description: "Freelance Work", amount: 500, date: "2025-02-22" },
    { id: 5, description: "Dining Out", amount: -60, date: "2025-02-22" },
  ];
  return new NextResponse(JSON.stringify(transactions), { status: 200 });
};
