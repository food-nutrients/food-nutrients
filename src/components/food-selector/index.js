import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

export default class FoodSelector extends Component {
  static propTypes = {
    foods: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  }
  state = {
    selectedFood: undefined,
  }
  onChange = e => {
    this.props.onChange(e)
    this.setState({ selectedFood: undefined })
  }
  onFilterOption = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

  render() {
    return (
      <div className="foodSelector">
        <Select
          spellcheck="false"
          data-gramm="false"
          showSearch
          className="foodSelectorInput"
          size="large"
          value={this.state.selectedFood}
          placeholder="+ Add food"
          optionFilterProp="children"
          onChange={this.onChange}
          filterOption={this.onFilterOption}
        >
          {this.props.foods.sort().map(foodName => (
            <Select.Option key={foodName} value={foodName}>
              {foodName}
            </Select.Option>
          ))}
        </Select>
      </div>
    )
  }
}
