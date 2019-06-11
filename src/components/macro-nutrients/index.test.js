import React from 'react'
import MacroNutrients from './index'
import renderer from 'react-test-renderer'

it('renders correctly without data', () => {
  const tree = renderer.create(<MacroNutrients />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with data', () => {
  const macroNutrients = {
    calories: {
      name: 'Calories',
      raw: 500,
      unit: 'kcal',
      amount: 498,
    },
    proteins: {
      name: 'Proteins',
      raw: 5,
      amount: 3,
      unit: 'mg1',
    },
    carbs: {
      name: 'Carbs',
      raw: 15,
      amount: 13,
      unit: 'mg2',
    },
    fats: {
      name: 'Fats',
      raw: 25,
      amount: 23,
      unit: 'mg3',
    },
  }
  const tree = renderer.create(<MacroNutrients macroNutrients={macroNutrients} />).toJSON()
  expect(tree).toMatchSnapshot()
})
