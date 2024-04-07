import React from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

const PieChart = () => {
  const { orders } = useSelector((state) => state.admin);

  const statuses = ["Ordered","Processing", "Shipped", "Delivered"];
  const data = {
    labels: statuses,
    datasets: [
      {
        data: statuses.map(
          (status) =>
            orders?.filter((item) => item.orderStatus === status).length
        ),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "#46f266",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="charts">
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
