import React from "react";
import { InputNumber, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface Food {
  name: string;
}

interface SelectedFoodItem {
  food: Food;
  amount: number;
}

interface SelectedFoodProps {
  onChange: (selectedFood: SelectedFoodItem) => void;
  onRemove: (selectedFood: SelectedFoodItem) => void;
  selectedFood: SelectedFoodItem;
}

const SelectedFood: React.FC<SelectedFoodProps> = ({
  onChange,
  onRemove,
  selectedFood,
}) => {
  const onAmountChange = (amount: number | null) => {
    if (amount !== null) {
      onChange({
        ...selectedFood,
        amount: amount,
      });
    }
  };

  const onDelete = () => onRemove(selectedFood);

  return (
    <div className="selectedFood">
      <h2>{selectedFood.food.name}</h2>
      <div className="selectedFoodAmount">
        <InputNumber
          addonAfter="grams"
          min={0}
          max={5000}
          type="number"
          onChange={onAmountChange}
          defaultValue={selectedFood.amount}
        />
        <Button onClick={onDelete} className="deleteBtn">
          <DeleteOutlined />
        </Button>
      </div>
    </div>
  );
};

export default SelectedFood;
