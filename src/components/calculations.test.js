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

test('microNutrients default case', () => {
  const selectedFoods = []
  const nutrients = [
    {
      name: 'Vitamin A',
      rda: 900,
      wiki: 'https://en.wikipedia.org/wiki/Vitamin_A',
      required: true,
      type: 'Vitamins',
      tui: 3000,
    },
  ]
  const result = calculations.calculateMicroNutrients(selectedFoods, nutrients)
  expect(result).toStrictEqual({
    'Vitamin A': {
      rda: 900,
      amount: 0,
      amountInUnits: 0,
      amountUnit: 'μg',
      percentage: 0,
    },
  })
})
test('microNutrients multiple foods', () => {
  const selectedFoods = [
    {
      amount: 100,
      food: {
        name: 'Beef liver',
        fat: 53000,
        calories: 1.91,
        proteins: 291000,
        carbohydrates: 51000,
        serving: 100,
        nutrients: {
          'Vitamin C': 19,
          'Vitamin B12': 0.71,
          'Vitamin A': 94.42,
        },
      },
    },
    {
      amount: 100,
      food: {
        name: 'Chicken liver',
        fat: 65000,
        calories: 1.67,
        proteins: 245000,
        carbohydrates: 9000,
        serving: 100,
        nutrients: {
          'Vitamin C': 279,
          'Vitamin B12': 0.17,
          'Vitamin A': 39.81,
        },
      },
    },
  ]
  const nutrients = [
    {
      name: 'Vitamin A',
      rda: 900,
      wiki: 'https://en.wikipedia.org/wiki/Vitamin_A',
      required: true,
      type: 'Vitamins',
      tui: 3000,
    },
  ]
  const result = calculations.calculateMicroNutrients(selectedFoods, nutrients)
  expect(result).toStrictEqual({
    'Vitamin A': {
      rda: 900,
      amount: 13423,
      amountInUnits: 13.42,
      amountUnit: 'mg',
      percentage: 1491,
    },
  })
})
test('test unitize method', () => {
  const result = calculations.unitize(4, ['g', 'mg', 'μg'])
  expect(result).toStrictEqual({ amount: 4, unit: 'μg' })
})

test('test unitize method one up', () => {
  const result = calculations.unitize(4000, ['g', 'mg', 'μg'])
  expect(result).toStrictEqual({ amount: 4, unit: 'mg' })
})
test('test unitize method two up', () => {
  const result = calculations.unitize(4000000, ['g', 'mg', 'μg'])
  expect(result).toStrictEqual({ amount: 4, unit: 'g' })
})
test('test unitize method three up', () => {
  const result = calculations.unitize(4000000000, ['g', 'mg', 'μg'])
  expect(result).toStrictEqual({ amount: 4000, unit: 'g' })
})
