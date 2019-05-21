import React from 'react'
import SelectedFood from './index'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <SelectedFood
        selectedFood={{
          food: {
            name: 'Banana',
          },
          amount: 300,
        }}
        onChange={() => {}}
        onRemove={() => {}}
      />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
