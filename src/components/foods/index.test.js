import React from 'react'
import Foods from './index'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(<Foods updateNutrients={() => {}} />).toJSON()
  expect(tree).toMatchSnapshot()
})
