import { useState, useEffect } from "react";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";

import initTutorial from "./components/tutorial";
import Foods from "./components/foods";
import {
  calculateMacroNutrients,
  calculateMicroNutrients,
} from "./components/calculations";

import logo from "/logo.png";

// Datasets
import nutrients from "./data/nutrients.json";
import "antd/dist/reset.css";
// Styles
import "./App.css";
import MacroNutrients, {
  MacroNutrientData,
} from "./components/macro-nutrients";
import MicroNutrients from "./components/micro-nutrients";
import { MicroNutrientData } from "./components/micro-nutrient";

interface Nutrient {
  name: string;
  rda: number;
}

interface SelectedFood {
  food: {
    name: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fat: number;
    nutrients: Record<string, number>;
  };
  amount: number;
}

const App: React.FC = () => {
  const [macroNutrients, setMacroNutrients] = useState<{
    calories: MacroNutrientData;
    proteins: MacroNutrientData;
    carbs: MacroNutrientData;
    fats: MacroNutrientData;
  }>({
    calories: { name: "Calories", amount: 0, raw: 0, unit: "kcal" },
    proteins: { name: "Proteins", amount: 0, raw: 0, unit: "μg" },
    carbs: { name: "Carbs", amount: 0, raw: 0, unit: "g" },
    fats: { name: "Fats", amount: 0, raw: 0, unit: "g" },
  });
  const [microNutrients, setMicroNutrients] = useState<{
    [key: string]: MicroNutrientData;
  }>({});

  // const nutrients$ = from<Nutrient[]>(nutrients);
  const nutrientsLimited$ = from<Nutrient[]>(nutrients).pipe(
    map((nutrient) => ({
      name: nutrient.name,
      rda: nutrient.rda,
    }))
  );

  const updateNutrients = (selectedFoods$: Observable<SelectedFood>) => {
    setMacroNutrients(calculateMacroNutrients(selectedFoods$));
    setMicroNutrients(
      calculateMicroNutrients(selectedFoods$, nutrientsLimited$)
    );
  };

  useEffect(() => {
    initTutorial();
  }, []);

  return (
    <div className="App">
      <div className="leftPanel">
        <div className="logo">
          <img alt="Logo" src={logo} />
        </div>
        <Foods updateNutrients={updateNutrients} />
      </div>
      <div className="rightPanel">
        <MacroNutrients macroNutrients={macroNutrients} />
        <MicroNutrients
          definitions={nutrients}
          microNutrients={microNutrients}
        />
      </div>
    </div>
  );
};

export default App;
