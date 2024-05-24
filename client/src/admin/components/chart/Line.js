import React from 'react'
import { LineChart } from "@mui/x-charts/LineChart";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const uData1 = [1000, 2000, 3000, 3780, 2890, 1390, 4490];
const pData2 = [3400, 2398, 8800, 4908, 5800, 2800, 6300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];


const Line = () => {
  return (
    <LineChart
      width={500}
      height={300}
      series={[
        { data: pData, label: "pv" },
        { data: uData, label: "uv" },
        { data: pData2, label: "pv" },
        { data: uData1, label: "uv" },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
    />
  );
}

export default Line