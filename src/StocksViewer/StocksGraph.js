import React from "react";
import { LineChart, Line, XAxis, YAxis, Legend } from "recharts";
import { theme } from "./utils";
import { SCGraph } from "./styles";

const StockGraph = ({ stocks }) => {
  return (
    <SCGraph>
      <LineChart
        width={parseInt(theme.maxWidth) - 50}
        height={400}
        data={stocks}
      >
        <Legend verticalAlign="top" height={36} />

        <XAxis dataKey="index" />
        <YAxis />
        <Line
          type="monotone"
          dataKey="stocks.CAC40"
          name="CAC40"
          stroke="#63B3ED"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="stocks.NASDAQ"
          name="NASDAQ"
          stroke="#F6AD55"
          strokeWidth={3}
        />
      </LineChart>
    </SCGraph>
  );
};

export default StockGraph;
