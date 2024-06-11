import React from "react";

interface MacroNutrientProps {
  name: string;
  amount?: number;
  units?: string;
}

const MacroNutrient: React.FC<MacroNutrientProps> = ({
  name,
  amount = 0,
  units = "",
}) => {
  return (
    <div className="macroNutrient">
      <div>{name}</div>
      <div>
        {amount} {units}
      </div>
    </div>
  );
};

export default MacroNutrient;
