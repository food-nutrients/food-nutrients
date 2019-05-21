import React from 'react'
import MacroNutrients from './index'
import renderer from 'react-test-renderer'

it('renders correctly without data', () => {
  const tree = renderer.create(<MacroNutrients />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with data', () => {
  const macroNutrients = {
    calories: 500,
    caloriesInUnits: 498,
    caloriesUnits: 'kcal',
    proteins: 5,
    proteinsInUnits: 3,
    proteinUnits: 'mg1',
    carbohydrates: 15,
    carbohydratesInUnits: 13,
    carbohydratesUnits: 'mg2',
    fat: 25,
    fatInUnits: 23,
    fatUnits: 'mg3',
  }
  const tree = renderer.create(<MacroNutrients macroNutrients={macroNutrients} />).toJSON()
  expect(tree).toMatchSnapshot()
})
