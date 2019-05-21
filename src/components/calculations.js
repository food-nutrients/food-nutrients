export const defaultMacroNutrients = {
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
}
export const calculateMacroNutrients = selectedFoods => {
  const macroNutrients = Object.assign({}, defaultMacroNutrients)
  selectedFoods.forEach(selectedFood => {
    selectedFood.amount = selectedFood.amount || 0
    macroNutrients.calories += selectedFood.food.calories * selectedFood.amount
    macroNutrients.proteins += selectedFood.food.proteins * selectedFood.amount
    macroNutrients.carbohydrates += selectedFood.food.carbohydrates * selectedFood.amount
    macroNutrients.fat += selectedFood.food.fat * selectedFood.amount
  })
  macroNutrients.caloriesInUnits = macroNutrients.calories
  macroNutrients.proteinsInUnits = macroNutrients.proteins
  macroNutrients.carbohydratesInUnits = macroNutrients.carbohydrates
  macroNutrients.fatInUnits = macroNutrients.fat
  if (macroNutrients.proteinsInUnits >= 1000) {
    macroNutrients.proteinsInUnits /= 1000
    macroNutrients.proteinUnits = 'mg'
  }
  if (macroNutrients.proteinsInUnits >= 1000) {
    macroNutrients.proteinsInUnits /= 1000
    macroNutrients.proteinUnits = 'g'
  }
  if (macroNutrients.carbohydratesInUnits >= 1000) {
    macroNutrients.carbohydratesInUnits /= 1000
    macroNutrients.carbohydratesUnits = 'mg'
  }
  if (macroNutrients.carbohydratesInUnits >= 1000) {
    macroNutrients.carbohydratesInUnits /= 1000
    macroNutrients.carbohydratesUnits = 'g'
  }
  if (macroNutrients.fatInUnits >= 1000) {
    macroNutrients.fatInUnits /= 1000
    macroNutrients.fatUnits = 'mg'
  }
  if (macroNutrients.fatInUnits >= 1000) {
    macroNutrients.fatInUnits /= 1000
    macroNutrients.fatUnits = 'g'
  }

  // Rounding
  macroNutrients.caloriesInUnits = parseFloat(parseFloat(macroNutrients.caloriesInUnits).toFixed(2))
  macroNutrients.proteinsInUnits = parseFloat(parseFloat(macroNutrients.proteinsInUnits).toFixed(2))
  macroNutrients.carbohydratesInUnits = parseFloat(
    parseFloat(macroNutrients.carbohydratesInUnits).toFixed(2),
  )
  macroNutrients.fatInUnits = parseFloat(parseFloat(macroNutrients.fatInUnits).toFixed(2))

  return macroNutrients
}

export const calculateMicroNutrients = (selectedFoods, nutrients) => {
  const microNutrients = {}
  nutrients.forEach(nutrient => {
    microNutrients[nutrient.name] = {
      ...nutrient,
      amount: 0,
      percentage: 0,
      status: undefined,
    }
    selectedFoods.forEach(selectedFood => {
      const foodNutrients = selectedFood.food.nutrients[nutrient.name]
      if (typeof foodNutrients === 'undefined') {
        console.log(`Food ${selectedFood.food.name} is missing nutrient: ${nutrient.name}`)
      }
      microNutrients[nutrient.name].amount += (foodNutrients || 0) * selectedFood.amount
    })
    microNutrients[nutrient.name].percentage = parseInt(
      (microNutrients[nutrient.name].amount * 100) / microNutrients[nutrient.name].rda,
      10,
    )
    microNutrients[nutrient.name].amount = parseInt(microNutrients[nutrient.name].amount, 10)
    microNutrients[nutrient.name].amountInUnits = microNutrients[nutrient.name].amount
    microNutrients[nutrient.name].amountUnit = 'μg'
    if (microNutrients[nutrient.name].amountInUnits >= 1000) {
      microNutrients[nutrient.name].amountInUnits /= 1000
      microNutrients[nutrient.name].amountUnit = 'mg'
    }
    if (microNutrients[nutrient.name].amountInUnits >= 1000) {
      microNutrients[nutrient.name].amountInUnits /= 1000
      microNutrients[nutrient.name].amountUnit = 'g'
    }
    microNutrients[nutrient.name].amountInUnits = parseFloat(
      parseFloat(microNutrients[nutrient.name].amountInUnits).toFixed(2),
    )
  })

  return microNutrients
}
