import React from "react";
import { Chart } from "react-google-charts";

interface BarChartProps {
  data: any;
}
const options = {
   
    bars: "vertical", // Required for Material Bar Charts.
    backgroundColor:"#f4d774",



};

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      legendToggle={false}
      options={options}
    />
  );
};
export default BarChart;
