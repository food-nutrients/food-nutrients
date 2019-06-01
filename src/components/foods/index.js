import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FoodSelector from './../food-selector'
import SelectedFood from './../selected-food'
import { Icon } from 'antd'
import update from 'immutability-helper'
import foods from './../../data/foods.json'
import { from } from 'rxjs'

export default class Foods extends Component {
  static propTypes = {
    updateNutrients: PropTypes.func.isRequired,
  }
  state = {
    selectedFoods: [],
    foodsForSelection: [],
  }
  onFoodSelect = selectedFoodName => {
    this.setState(
      {
        selectedFoods: [
          ...this.state.selectedFoods,
          {
            food: foods.find(f => f.name === selectedFoodName),
            amount: foods.find(f => f.name === selectedFoodName).serving || 100,
          },
        ],
      },
      () => {
        this.props.updateNutrients(from(this.state.selectedFoods))
        this.updateFoodSelector()
      },
    )
  }

  onFoodRemove = removedFood => {
    const removedFoodIndex = this.findFoodIndex(removedFood.food.name)
    const updatedSelectedFoods = update(this.state.selectedFoods, {
      $splice: [[removedFoodIndex, 1]],
    })
    this.setState(
      {
        selectedFoods: updatedSelectedFoods,
      },
      () => {
        this.props.updateNutrients(from(this.state.selectedFoods))
        this.updateFoodSelector()
      },
    )
  }
  findFoodIndex = foodName => this.state.selectedFoods.findIndex(f => f.food.name === foodName)
  onFoodAmountChange = updatedSelectedFood => {
    const updatedFoodIndex = this.findFoodIndex(updatedSelectedFood.food.name)
    const updatedSelectedFoods = update(this.state.selectedFoods, {
      $splice: [[updatedFoodIndex, 1, updatedSelectedFood]],
    })
    this.setState({ selectedFoods: updatedSelectedFoods }, () => {
      this.props.updateNutrients(from(this.state.selectedFoods))
    })
  }
  updateFoodSelector = () => {
    const allPossibleFoods = foods.map(food => food.name)
    const allSelectedFoods = this.state.selectedFoods.map(sf => sf.food.name)
    this.setState({
      foodsForSelection: allPossibleFoods.filter(f => !allSelectedFoods.includes(f)),
    })
  }
  componentDidMount() {
    this.setState({ foodsForSelection: foods.map(food => food.name) })
  }
  render() {
    return (
      <div>
        <FoodSelector
          className="foodSelector"
          foods={this.state.foodsForSelection}
          onChange={this.onFoodSelect}
        />
        {this.state.selectedFoods.length === 0 && (
          <div className="addFoods">
            <Icon className="animate-flicker" type="arrow-up" />
          </div>
        )}
        {this.state.selectedFoods.length > 0 && (
          <h3 className="selectedFoodsLabel"> Selected foods </h3>
        )}
        {this.state.selectedFoods.map(selectedFood => (
          <SelectedFood
            key={selectedFood.food.name}
            selectedFood={selectedFood}
            onChange={this.onFoodAmountChange}
            onRemove={this.onFoodRemove}
          />
        ))}
      </div>
    )
  }
}
