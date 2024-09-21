import React from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);
const DoughnutChart = () => {
  const { inStock, outOfStock } = useSelector((state) => state.admin);
  const data = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#ed4e4e", "#46f266", "#7582f0"],
        hoverBackgroundColor: ["#ff0000", "#00ff00", "#003cff"],
        data: [outOfStock, inStock],
      },
    ],
  };
  return (
    <div className="charts">
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
