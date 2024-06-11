import React, { useState } from "react";
import { Select } from "antd";
import { SelectValue } from "antd/lib/select";
import { DefaultOptionType } from "antd/es/select";

interface FoodSelectorProps {
  foods: string[];
  onChange: (value: SelectValue) => void;
}

const FoodSelector: React.FC<FoodSelectorProps> = ({ foods, onChange }) => {
  const [selectedFood, setSelectedFood] = useState<SelectValue | null>(null);

  const handleChange = (value: SelectValue) => {
    onChange(value);
    setSelectedFood(null); // Reset selected food to null to show the placeholder
  };

  const handleFilterOption = (input: string, option?: DefaultOptionType) => {
    if (!option || !option.children) return false;
    return (option.children as unknown as string)
      .toLowerCase()
      .includes(input.toLowerCase());
  };

  return (
    <div className="foodSelector">
      <Select
        showSearch
        className="foodSelectorInput"
        size="large"
        value={selectedFood}
        placeholder="+ Add food"
        optionFilterProp="children"
        onChange={handleChange}
        filterOption={handleFilterOption}
        allowClear // Allow clearing the selection to reset to the placeholder
      >
        {foods.sort().map((foodName) => (
          <Select.Option key={foodName} value={foodName}>
            {foodName}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default FoodSelector;
