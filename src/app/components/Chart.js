import { Bar } from "react-chartjs-2"; // Import Bar chart instead of Line
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns"; // Import the date adapter for handling date formats

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const Chart = ({ aggregatedData }) => {
  // Data for the chart
  const labels = aggregatedData.map((data) => data.date); // Extract dates from the aggregated data
  const incomeData = aggregatedData.map((data) => data.income); // Extract income values
  const expensesData = aggregatedData.map((data) => data.expenses); // Extract expenses values

  const data = {
    labels: labels, // Dates on the x-axis
    datasets: [
      {
        label: "Income",
        data: incomeData, // Income values for each date
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: expensesData, // Expenses values for each date
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 1,
      },
    ],
  };

  // Chart options to center the bars and fix the background
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `$${value.toFixed(2)}`; // Format as currency
          },
        },
      },
    },
    scales: {
      x: {
        type: "time", // Time scale for x-axis to display dates
        time: {
          unit: "day", // Show one tick per day
          tooltipFormat: "P", // Use 'P' for full date format (e.g., February 22, 2025)
          unitStepSize: 1, // Step size for the time unit (1 day at a time)
        },
        ticks: {
          font: {
            size: 14,
          },
          autoSkip: true,
          maxRotation: 0, // Prevent label rotation
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
        borderRadius: 5,
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    barPercentage: 0.8,
    categoryPercentage: 0.5,
  };

  return <Bar data={data} options={options} />;
};

export default Chart;
