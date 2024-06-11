import React from "react";
import emptyGraph from "/graph_placeholder.png";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Tooltip } from "antd";

ChartJS.register(ArcElement, ChartTooltip, Legend);
interface MacroPieChartProps {
  proteins: number;
  carbohydrates: number;
  fat: number;
}

const MacroPieChart: React.FC<MacroPieChartProps> = ({
  proteins,
  carbohydrates,
  fat,
}) => {
  const calculatePercentage = (item: number, total: number) =>
    parseInt(((item * 100) / total).toFixed(0), 10) || 0;

  const getTotalMacroNutrients = () => {
    return proteins + carbohydrates + fat;
  };

  const pieChartData = () => {
    const total = getTotalMacroNutrients();
    return [
      { name: "Proteins", value: calculatePercentage(proteins, total) },
      { name: "Carbs", value: calculatePercentage(carbohydrates, total) },
      { name: "Fat", value: calculatePercentage(fat, total) },
    ];
  };

  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  // colors 2 ["#5ca0d3", "#64CEAA", "#f9fd50"]
  const info = pieChartData();
  const data = {
    labels: info.map((item) => item.name),
    datasets: [
      {
        label: "Percentage of Macro Nutrients",

        data: info.map((item) => item.value),
        backgroundColor: ["#5ca0d3", "#64CEAA", "#f9fd50"],
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className="macroNutrient macroChart">
      {getTotalMacroNutrients() === 0 ? (
        <Tooltip title="Macro Nutrients Ratio">
          <img className="macroChartEmpty" src={emptyGraph} alt="Empty Graph" />
        </Tooltip>
      ) : (
        <>
          <div style={{ width: "100px", height: "100px" }}>
            <Pie
              width={100}
              height={100}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        let label = context.label || "";
                        if (label) {
                          label += ": ";
                        }
                        if (context.parsed !== null) {
                          label += context.parsed + "%";
                        }
                        return label;
                      },
                    },
                  },
                },
              }}
              data={data}
            />
          </div>
          {/* <>Pie: {JSON.stringify(pieChartData(), null, 4)}</> */}
        </>
        // <PieChart
        //   colors={["#5ca0d3", "#64CEAA", "#f9fd50"]}
        //   id="macro_ratio_chart"
        //   suffix="%"
        //   legend={false}
        //   height="100px"
        //   width="100px"
        //   data={pieChartData()}
        // />
      )}
    </div>
  );
};

export default MacroPieChart;
