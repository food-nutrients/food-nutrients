import React from 'react'
import MicroNutrient from './index'
import renderer from 'react-test-renderer'

it('renders correctly with data', () => {
  const microNutrient = {
    name: 'Vitamin A',
    wiki: 'https://en.wikipedia.org/wiki/Vitamin_A',
  }
  const microNutrientData = {
    raw: 50,
    amount: 5,
    percentage: 30,
    unit: 'mg',
  }
  const tree = renderer
    .create(<MicroNutrient microNutrient={microNutrient} microNutrientData={microNutrientData} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with null data', () => {
  const microNutrient = {
    name: 'Vitamin A',
    wiki: 'https://en.wikipedia.org/wiki/Vitamin_A',
  }
  const microNutrientData = null
  const tree = renderer
    .create(<MicroNutrient microNutrient={microNutrient} microNutrientData={microNutrientData} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
