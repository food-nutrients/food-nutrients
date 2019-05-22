import React from 'react'
import Foods from './index'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer
    .create(<Foods updateMacroNutrients={() => {}} updateMicroNutrients={() => {}} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
