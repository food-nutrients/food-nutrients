import React from 'react'
import FoodSelector from './index'
import renderer from 'react-test-renderer'

jest.dontMock('antd')

it('renders correctly without data', () => {
  const foods = []
  const tree = renderer.create(<FoodSelector foods={foods} onChange={() => {}} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with data', () => {
  const foods = ['Banana', 'Apple']
  const tree = renderer.create(<FoodSelector foods={foods} onChange={() => {}} />).toJSON()
  expect(tree).toMatchSnapshot()
})
