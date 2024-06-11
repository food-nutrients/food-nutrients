import React from "react";
import MicroNutrient from "../micro-nutrient";

interface MicroNutrientDefinition {
  name: string;
  type: string;
  wiki: string;
  rda: number;
}

interface MicroNutrientData {
  raw: number;
  amount: number;
  percentage: number;
  unit: string;
  rda: number;
}

interface MicroNutrientsProps {
  definitions: MicroNutrientDefinition[];
  microNutrients?: {
    [key: string]: MicroNutrientData;
  };
}

const MicroNutrients: React.FC<MicroNutrientsProps> = ({
  definitions,
  microNutrients = {},
}) => {
  const microNutrientsByType = definitions.reduce(
    (group: { [key: string]: MicroNutrientDefinition[] }, current) => {
      if (typeof group[current.type] === "undefined") {
        group[current.type] = [];
      }
      group[current.type].push(current);
      return group;
    },
    {}
  );

  return (
    <div className="microNutrients">
      {Object.keys(microNutrientsByType).map((microNutrientsByTypeName) => (
        <div key={microNutrientsByTypeName} className="microNutrientType">
          <span className="nutrientType">{microNutrientsByTypeName}</span>
          {microNutrientsByType[microNutrientsByTypeName].map(
            (microNutrient) => (
              <MicroNutrient
                key={microNutrient.name}
                microNutrient={microNutrient}
                microNutrientData={microNutrients[microNutrient.name]}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default MicroNutrients;
