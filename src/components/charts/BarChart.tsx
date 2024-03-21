import React from "react";
import { Chart } from "react-google-charts";

interface BarChartProps {
  data: any;
}
const options = {
  //   chart: {
  //     title: "Company Performance",
  //     subtitle: "Sales, Expenses, and Profit: 2014-2017",
  //   },
};

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};
export default BarChart;
