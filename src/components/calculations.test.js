const calculations = require('./calculations.js')

test('macroNutrients calculation method exists', () => {
  expect(typeof calculations.calculateMacroNutrients).toBe('function')
})

test('calculateMicroNutrients calculation method exists', () => {
  expect(typeof calculations.calculateMicroNutrients).toBe('function')
})

test('macroNutrients default case', () => {
  const selectedFoods = []
  const result = calculations.calculateMacroNutrients(selectedFoods)
  expect(result).toStrictEqual({
    calories: 0,
    caloriesUnits: 'kcal',
    caloriesInUnits: 0,
    proteins: 0,
    proteinUnits: 'μg',
    proteinsInUnits: 0,
    carbohydrates: 0,
    carbohydratesUnits: 'μg',
    carbohydratesInUnits: 0,
    fat: 0,
    fatUnits: 'μg',
    fatInUnits: 0,
  })
})

test('macroNutrients single food', () => {
  const selectedFoods = [
    {
      amount: 100,
      food: {
        calories: 50,
        proteins: 100,
        fat: 300,
        carbohydrates: 600,
      },
    },
  ]
  const result = calculations.calculateMacroNutrients(selectedFoods)
  expect(result).toStrictEqual({
    calories: 5000,
    caloriesUnits: 'kcal',
    caloriesInUnits: 5000,
    proteins: 10000,
    proteinUnits: 'mg',
    proteinsInUnits: 10,
    carbohydrates: 60000,
    carbohydratesUnits: 'mg',
    carbohydratesInUnits: 60,
    fat: 30000,
    fatUnits: 'mg',
    fatInUnits: 30,
  })
})

test('macroNutrients multiple foods', () => {
  const selectedFoods = [
    {
      amount: 100,
      food: {
        calories: 50,
        proteins: 100,
        fat: 300,
        carbohydrates: 600,
      },
    },
    {
      amount: 120,
      food: {
        calories: 70,
        proteins: 200,
        fat: 500,
        carbohydrates: 900,
      },
    },
  ]
  const result = calculations.calculateMacroNutrients(selectedFoods)
  expect(result).toStrictEqual({
    calories: 13400,
    caloriesUnits: 'kcal',
    caloriesInUnits: 13400,
    proteins: 34000,
    proteinUnits: 'mg',
    proteinsInUnits: 34,
    carbohydrates: 168000,
    carbohydratesUnits: 'mg',
    carbohydratesInUnits: 168,
    fat: 90000,
    fatUnits: 'mg',
    fatInUnits: 90,
  })
})
