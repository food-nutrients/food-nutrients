import React, { useState, useEffect } from "react";
import { Progress } from "antd";

export interface MicroNutrientData {
  raw: number;
  amount: number;
  percentage: number;
  unit: string;
  rda: number;
}

interface MicroNutrientProps {
  microNutrient: {
    name: string;
    wiki: string;
  };
  microNutrientData?: MicroNutrientData | null;
}

const MicroNutrient: React.FC<MicroNutrientProps> = ({
  microNutrient,
  microNutrientData = null,
}) => {
  const [state, setState] = useState<{
    name: string;
    wiki: string;
    percentage: number;
    raw: number;
    amount: number;
    unit: string;
    nutrientStatus: "normal" | "success" | "exception" | "active" | undefined;
  }>({
    name: "",
    wiki: "#",
    percentage: 0,
    raw: 0,
    amount: 0,
    unit: "μg",
    nutrientStatus: "normal",
  });

  const nutrientStatus = (microNutrient: {
    raw: number;
    rda: number;
  }): "normal" | "success" | "exception" | "active" => {
    let barType: "normal" | "success" | "exception" | "active" = "normal";
    if (
      microNutrient.raw >= microNutrient.rda &&
      microNutrient.raw < 1.5 * microNutrient.rda
    ) {
      barType = "success";
    } else if (microNutrient.raw >= 1.5 * microNutrient.rda) {
      barType = "exception";
    }
    return barType;
  };

  useEffect(() => {
    setState({
      name: microNutrient.name,
      wiki: microNutrient.wiki,
      percentage: microNutrientData ? microNutrientData.percentage : 0,
      raw: microNutrientData ? microNutrientData.raw : 0,
      amount: microNutrientData ? microNutrientData.amount : 0,
      unit: microNutrientData ? microNutrientData.unit : "μg",
      nutrientStatus: microNutrientData
        ? nutrientStatus({
            raw: microNutrientData.raw,
            rda: microNutrientData.rda,
          })
        : "normal",
    });
  }, [microNutrient, microNutrientData]);

  const {
    name,
    wiki,
    percentage,
    amount,
    unit,
    nutrientStatus: status,
  } = state;

  return (
    <div key={name} className="microNutrient">
      <div className="microNutrientName">
        <a target="_blank" rel="noopener noreferrer" href={wiki}>
          {name}
        </a>
      </div>
      <div className="microNutrientProgressBar">
        <Progress
          showInfo={false}
          status={status}
          percent={percentage}
          size="small"
        />
        <span>{percentage}% </span>
      </div>
      <div className="microNutrientAmount">
        {amount} {unit}
      </div>
    </div>
  );
};

export default MicroNutrient;
