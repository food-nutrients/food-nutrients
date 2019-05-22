import React from 'react'
import MicroNutrients from './index'
import renderer from 'react-test-renderer'

it('renders correctly with micro nutrients data', () => {
  const nutrients = [
    {
      name: 'Vitamin A',
      rda: 900,
      wiki: 'https://en.wikipedia.org/wiki/Vitamin_A',
      required: true,
      type: 'Vitamins',
      tui: 3000,
    },
    {
      name: 'Chloride',
      rda: 2300000,
      wiki: 'https://en.wikipedia.org/wiki/Chloride',
      required: true,
      type: 'Minerals',
      tui: 15000000,
    },
  ]
  const microNutrients = {
    'Vitamin A': {
      nutrient: {
        name: 'Vitamin A',
        rda: 900,
        wiki: 'https://en.wikipedia.org/wiki/Vitamin_A',
        required: true,
        type: 'Vitamins',
        tui: 3000,
      },
      amount: 50,
      amountInUnits: 5,
      percentage: 30,
      amountUnit: 'mg',
    },
    Chloride: {
      nutrient: {
        name: 'Chloride',
        rda: 2300000,
        wiki: 'https://en.wikipedia.org/wiki/Chloride',
        required: true,
        type: 'Minerals',
        tui: 15000000,
      },
      amount: 100,
      amountInUnits: 10,
      percentage: 40,
      amountUnit: 'mg',
    },
  }
  const tree = renderer
    .create(<MicroNutrients definitions={nutrients} microNutrients={microNutrients} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with null nutrients data', () => {
  const nutrients = [
    {
      name: 'Vitamin A',
      rda: 900,
      wiki: 'https://en.wikipedia.org/wiki/Vitamin_A',
      required: true,
      type: 'Vitamins',
      tui: 3000,
    },
    {
      name: 'Chloride',
      rda: 2300000,
      wiki: 'https://en.wikipedia.org/wiki/Chloride',
      required: true,
      type: 'Minerals',
      tui: 15000000,
    },
  ]
  const microNutrients = {}
  const tree = renderer
    .create(<MicroNutrients definitions={nutrients} microNutrients={microNutrients} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
