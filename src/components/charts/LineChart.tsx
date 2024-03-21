import React from "react";
import { Chart } from "react-google-charts";

interface LineChartProps {
  data: any;
}
const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
      legendToggle
    />
  );
};
export default LineChart;
