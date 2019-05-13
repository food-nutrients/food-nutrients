import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Icon } from 'antd'

export default class SelectedFood extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    selectedFood: PropTypes.shape({
      food: PropTypes.any,
      amount: PropTypes.number,
    }).isRequired,
  }
  onAmountChange = e => {
    this.props.onChange({
        ...this.props.selectedFood,
        amount: parseInt(e.currentTarget.value, 10)
    })
  }
  onDelete = () => this.props.onRemove(this.props.selectedFood)
  render() {
    return (
      <div className="selectedFood">
        <h2>{this.props.selectedFood.food.name}</h2>
        <div className="selectedFoodAmount">
          <Input
            addonAfter="grams"
            min="0"
            max="5000"
            spellcheck="false"
            data-gramm="false"
            type="number"
            onChange={this.onAmountChange}
            defaultValue={this.props.selectedFood.amount}
          />
          <Button onClick={this.onDelete} className="deleteBtn">
            <Icon type="delete" />
          </Button>
        </div>
      </div>
    )
  }
}
