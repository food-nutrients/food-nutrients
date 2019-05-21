import React from 'react'
import MacroPieChart from './index'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(<MacroPieChart proteins={30} carbohydrates={20} fat={10} />).toJSON()
  expect(tree).toMatchSnapshot()
})
