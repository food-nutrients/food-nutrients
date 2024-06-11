import React, { useState, useEffect } from "react";
import FoodSelector from "../food-selector";
import { ArrowUpOutlined } from "@ant-design/icons";
import update from "immutability-helper";

import { from } from "rxjs";
import foods from "./../../data/foods.json";
import SelectedFood from "../selected-food";

interface Food {
  name: string;
  serving?: number;
}

interface SelectedFoodItem {
  food: Food;
  amount: number;
}

interface FoodsProps {
  updateNutrients: (selectedFoods$: any) => void;
}

const Foods: React.FC<FoodsProps> = ({ updateNutrients }) => {
  const [selectedFoods, setSelectedFoods] = useState<SelectedFoodItem[]>([]);
  const [foodsForSelection, setFoodsForSelection] = useState<string[]>([]);

  const onFoodSelect = (selectedFoodName: any) => {
    if (typeof selectedFoodName !== "string") return;
    const food = foods.find((f) => f.name === selectedFoodName);
    if (!food) return;
    const newSelectedFood: SelectedFoodItem = {
      food,
      amount: food.serving || 100,
    };
    setSelectedFoods((prevSelectedFoods) => {
      const updatedSelectedFoods = [...prevSelectedFoods, newSelectedFood];
      updateNutrients(from(updatedSelectedFoods));
      updateFoodSelector(updatedSelectedFoods);
      return updatedSelectedFoods;
    });
  };

  const onFoodRemove = (removedFood: SelectedFoodItem) => {
    const removedFoodIndex = findFoodIndex(removedFood.food.name);
    if (removedFoodIndex === -1) return;
    const updatedSelectedFoods = update(selectedFoods, {
      $splice: [[removedFoodIndex, 1]],
    });
    setSelectedFoods(updatedSelectedFoods);
    updateNutrients(from(updatedSelectedFoods));
    updateFoodSelector(updatedSelectedFoods);
  };

  const findFoodIndex = (foodName: string) =>
    selectedFoods.findIndex((f) => f.food.name === foodName);

  const onFoodAmountChange = (updatedSelectedFood: SelectedFoodItem) => {
    const updatedFoodIndex = findFoodIndex(updatedSelectedFood.food.name);
    if (updatedFoodIndex === -1) return;
    const updatedSelectedFoods = update(selectedFoods, {
      $splice: [[updatedFoodIndex, 1, updatedSelectedFood]],
    });
    setSelectedFoods(updatedSelectedFoods);
    updateNutrients(from(updatedSelectedFoods));
  };

  const updateFoodSelector = (selectedFoods: SelectedFoodItem[]) => {
    const allPossibleFoods = foods.map((food) => food.name);
    const allSelectedFoods = selectedFoods.map((sf) => sf.food.name);
    setFoodsForSelection(
      allPossibleFoods.filter((f) => !allSelectedFoods.includes(f))
    );
  };

  useEffect(() => {
    setFoodsForSelection(foods.map((food) => food.name));
  }, []);

  return (
    <div>
      <FoodSelector
        // className="foodSelector"
        foods={foodsForSelection}
        onChange={onFoodSelect}
      />
      {selectedFoods.length === 0 && (
        <div className="addFoods">
          <ArrowUpOutlined className="animate-flicker" />
        </div>
      )}
      {selectedFoods.length > 0 && (
        <h3 className="selectedFoodsLabel">Selected foods</h3>
      )}
      {selectedFoods.map((selectedFood) => (
        <SelectedFood
          key={selectedFood.food.name}
          selectedFood={selectedFood}
          onChange={onFoodAmountChange}
          onRemove={onFoodRemove}
        />
      ))}
    </div>
  );
};

export default Foods;
