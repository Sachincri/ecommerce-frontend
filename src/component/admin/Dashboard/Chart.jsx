// import React from "react";
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {  useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
  Filler
);

const LineChart = () => {
  const { orders } = useSelector((state) => state.admin);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly sale",
      },
    },
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = {
    labels:months,
    datasets: [
      {
        label: "TOTAL AMOUNT",
        data: months.map((m, i) =>
          orders
            ?.filter(
              (od) =>
                new Date(od.createdAt).getMonth() === i 
            )
            .reduce((total, od) => total + od.totalAmount, 0)
        ),
        borderJoinStyle: "round",
        borderColor: "#2874f0",
        backgroundColor: "#d2d7fa",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="charts">
      <Line data={data} options={options} />
    </div>
  );
};
export default LineChart;


