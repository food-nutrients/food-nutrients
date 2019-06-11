export const defaultMacroNutrients = {
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
}
export const calculateMacroNutrients = selectedFoods$ => {
  const macroNutrients = JSON.parse(JSON.stringify(defaultMacroNutrients))
  selectedFoods$.subscribe(
    selectedFood => {
      selectedFood.amount = selectedFood.amount || 0
      macroNutrients.calories.raw += selectedFood.food.calories * selectedFood.amount
      macroNutrients.proteins.raw += selectedFood.food.proteins * selectedFood.amount
      macroNutrients.carbs.raw += selectedFood.food.carbohydrates * selectedFood.amount
      macroNutrients.fats.raw += selectedFood.food.fat * selectedFood.amount
    },
    err => console.error(err),
    () => {
      macroNutrients.calories = formatMacroNutrient(macroNutrients.calories, ['kcal'])
      macroNutrients.proteins = formatMacroNutrient(macroNutrients.proteins, ['g', 'mg', 'μg'])
      macroNutrients.carbs = formatMacroNutrient(macroNutrients.carbs, ['g', 'mg', 'μg'])
      macroNutrients.fats = formatMacroNutrient(macroNutrients.fats, ['g', 'mg', 'μg'])
    },
  )

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
const getMicroNutrientsDefaults = nutrients$ => {
  const microNutrients = {}
  nutrients$.subscribe(
    nutrient => {
      if (!microNutrients[nutrient.name]) {
        microNutrients[nutrient.name] = {
          rda: nutrient.rda,
          raw: 0,
          amount: 0,
          unit: 'μg',
          percentage: 0,
        }
      }
    },
    err => console.log(err),
    () => {},
  )
  return microNutrients
}
const percentage = (amount, total) => parseInt((amount * 100) / total, 10)

export const calculateMicroNutrients = (selectedFoods$, nutrients$) => {
  const microNutrients = getMicroNutrientsDefaults(nutrients$)

  selectedFoods$.subscribe(selectedFood => {
    nutrients$.subscribe(
      nutrient => {
        const foodNutrients = selectedFood.food.nutrients[nutrient.name]
        microNutrients[nutrient.name].raw += (foodNutrients || 0) * selectedFood.amount
      },
      err => console.error(err),
      () => {
        nutrients$.subscribe(nutrient => {
          microNutrients[nutrient.name].percentage = percentage(
            microNutrients[nutrient.name].raw,
            nutrient.rda,
          )
          microNutrients[nutrient.name].raw = parseInt(microNutrients[nutrient.name].raw, 10)
          const r = unitize(microNutrients[nutrient.name].raw, ['g', 'mg', 'μg'])
          microNutrients[nutrient.name].amount = r.amount
          microNutrients[nutrient.name].unit = r.unit
        })
      },
    )
  })

  return microNutrients
}
