import React from 'react'
import MacroNutrient from './index'
import renderer from 'react-test-renderer'

it('renders correctly with data', () => {
  const tree = renderer
    .create(<MacroNutrient name={'Example Macro'} amount={1000} units={'mg'} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly without data', () => {
  const tree = renderer.create(<MacroNutrient name={'Example Macro'} />).toJSON()
  expect(tree).toMatchSnapshot()
})
