export const defaultMacroNutrients = {
  calories: {
    raw: 0,
    amount: 0,
    unit: 'kcal',
  },
  proteins: {
    raw: 0,
    amount: 0,
    unit: 'μg',
  },
  carbs: {
    raw: 0,
    amount: 0,
    unit: 'μg',
  },
  fats: {
    raw: 0,
    amount: 0,
    unit: 'μg',
  },
}
export const calculateMacroNutrients = selectedFoods => {
  const macroNutrients = JSON.parse(JSON.stringify(defaultMacroNutrients))

  selectedFoods.forEach(selectedFood => {
    selectedFood.amount = selectedFood.amount || 0
    macroNutrients.calories.raw += selectedFood.food.calories * selectedFood.amount
    macroNutrients.proteins.raw += selectedFood.food.proteins * selectedFood.amount
    macroNutrients.carbs.raw += selectedFood.food.carbohydrates * selectedFood.amount
    macroNutrients.fats.raw += selectedFood.food.fat * selectedFood.amount
  })

  macroNutrients.calories = formatMacroNutrient(macroNutrients.calories, ['kcal'])
  macroNutrients.proteins = formatMacroNutrient(macroNutrients.proteins, ['g', 'mg', 'μg'])
  macroNutrients.carbs = formatMacroNutrient(macroNutrients.carbs, ['g', 'mg', 'μg'])
  macroNutrients.fats = formatMacroNutrient(macroNutrients.fats, ['g', 'mg', 'μg'])

  return macroNutrients
}
const formatMacroNutrient = (macroNutrient, units) =>
  Object.assign(macroNutrient, unitize(macroNutrient.raw, units))

export const unitize = (amount, units) => {
  let unit = units.pop()
  while (amount >= 1000) {
    if (units.length === 0) {
      return {
        amount: parseFloat(parseFloat(amount).toFixed(2)),
        unit,
      }
    }
    amount /= 1000
    unit = units.pop()
  }
  return {
    amount: parseFloat(parseFloat(amount).toFixed(2)),
    unit,
  }
}
export const calculateMicroNutrients = (selectedFoods, nutrients) => {
  const microNutrients = {}
  nutrients.forEach(nutrient => {
    microNutrients[nutrient.name] = {
      rda: nutrient.rda,
      amount: 0,
      percentage: 0,
    }
    selectedFoods.forEach(selectedFood => {
      const foodNutrients = selectedFood.food.nutrients[nutrient.name]
      if (typeof foodNutrients === 'undefined') {
        console.log(`Food ${selectedFood.food.name} is missing nutrient: ${nutrient.name}`)
      }
      microNutrients[nutrient.name].amount += (foodNutrients || 0) * selectedFood.amount
    })
    microNutrients[nutrient.name].percentage = parseInt(
      (microNutrients[nutrient.name].amount * 100) / nutrient.rda,
      10,
    )
    microNutrients[nutrient.name].amount = parseInt(microNutrients[nutrient.name].amount, 10)
    const r = unitize(microNutrients[nutrient.name].amount, ['g', 'mg', 'μg'])
    microNutrients[nutrient.name].amountInUnits = r.amount
    microNutrients[nutrient.name].amountUnit = r.unit
  })

  return microNutrients
}
