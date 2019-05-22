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

  const ca = unitize(macroNutrients.calories, ['kcal'])
  macroNutrients.caloriesInUnits = ca.amount
  macroNutrients.caloriesUnits = ca.unit

  const p = unitize(macroNutrients.proteins, ['g', 'mg', 'μg'])
  macroNutrients.proteinsInUnits = p.amount
  macroNutrients.proteinUnits = p.unit

  const c = unitize(macroNutrients.carbohydrates, ['g', 'mg', 'μg'])
  macroNutrients.carbohydratesInUnits = c.amount
  macroNutrients.carbohydratesUnits = c.unit

  const f = unitize(macroNutrients.fat, ['g', 'mg', 'μg'])
  macroNutrients.fatInUnits = f.amount
  macroNutrients.fatUnits = f.unit

  return macroNutrients
}
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
