const calculations = require('./calculations.js')
const RxJS = require('rxjs')
test('macroNutrients calculation method exists', () => {
  expect(typeof calculations.calculateMacroNutrients).toBe('function')
})

test('calculateMicroNutrients calculation method exists', () => {
  expect(typeof calculations.calculateMicroNutrients).toBe('function')
})

test('macroNutrients default case', () => {
  const selectedFoods = []
  let selectedFoods$ = RxJS.from(selectedFoods)
  const result = calculations.calculateMacroNutrients(selectedFoods$)
  expect(result).toStrictEqual({
    calories: {
      name: 'Calories',
      raw: 0,
      amount: 0,
      unit: 'kcal',
    },
    proteins: {
      name: 'Proteins',
      raw: 0,
      amount: 0,
      unit: 'μg',
    },
    carbs: {
      name: 'Carbs',
      raw: 0,
      amount: 0,
      unit: 'μg',
    },
    fats: {
      name: 'Fats',
      raw: 0,
      amount: 0,
      unit: 'μg',
    },
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
  let selectedFoods$ = RxJS.from(selectedFoods)
  const result = calculations.calculateMacroNutrients(selectedFoods$)
  expect(result).toStrictEqual({
    calories: {
      name: 'Calories',
      raw: 5000,
      amount: 5000,
      unit: 'kcal',
    },
    proteins: {
      name: 'Proteins',
      raw: 10000,
      amount: 10,
      unit: 'mg',
    },
    carbs: {
      name: 'Carbs',
      raw: 60000,
      amount: 60,
      unit: 'mg',
    },
    fats: {
      name: 'Fats',
      raw: 30000,
      amount: 30,
      unit: 'mg',
    },
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
  let selectedFoods$ = RxJS.from(selectedFoods)
  const result = calculations.calculateMacroNutrients(selectedFoods$)
  expect(result).toStrictEqual({
    calories: {
      name: 'Calories',
      raw: 13400,
      amount: 13400,
      unit: 'kcal',
    },
    proteins: {
      name: 'Proteins',
      raw: 34000,
      amount: 34,
      unit: 'mg',
    },
    carbs: {
      name: 'Carbs',
      raw: 168000,
      amount: 168,
      unit: 'mg',
    },
    fats: {
      name: 'Fats',
      raw: 90000,
      amount: 90,
      unit: 'mg',
    },
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
  let selectedFoods$ = RxJS.from(selectedFoods)
  let nutrients$ = RxJS.from(nutrients)
  const result = calculations.calculateMicroNutrients(selectedFoods$, nutrients$)
  expect(result).toStrictEqual({
    'Vitamin A': {
      rda: 900,
      raw: 0,
      amount: 0,
      unit: 'μg',
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
  let selectedFoods$ = RxJS.from(selectedFoods)
  let nutrients$ = RxJS.from(nutrients)
  const result = calculations.calculateMicroNutrients(selectedFoods$, nutrients$)
  expect(result).toStrictEqual({
    'Vitamin A': {
      rda: 900,
      raw: 13423,
      amount: 13.42,
      unit: 'mg',
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
