import React, { Component } from 'react'

import FoodSelector from './components/food-selector'
import MacroNutrients from './components/macro-nutrients'
import MicroNutrients from './components/micro-nutrients'
import SelectedFood from './components/selected-food'
import initTutorial from './components/tutorial'
import { calculateMacroNutrients, calculateMicroNutrients } from './components/calculations'

import { Icon } from 'antd'
import update from 'immutability-helper'

import logo from './imgs/logo.png'

// Datasets
import foods from './data/foods.json'
import nutrients from './data/nutrients.json'

// Styles
import './App.css'

export default class App extends Component {
  state = {
    selectedFoods: [],
    foodsForSelection: [],
  }

  updateMacroNutrients = () => {
    this.setState({
      macroNutrients: calculateMacroNutrients(this.state.selectedFoods),
    })
  }
  updateMicroNutrients = () => {
    this.setState({
      microNutrients: calculateMicroNutrients(this.state.selectedFoods, nutrients),
    })
  }
  updateFoodSelector = () => {
    const allPossibleFoods = foods.map(food => food.name)
    const allSelectedFoods = this.state.selectedFoods.map(sf => sf.food.name)
    this.setState({
      foodsForSelection: allPossibleFoods.filter(f => !allSelectedFoods.includes(f)),
    })
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
        this.updateMacroNutrients()
        this.updateMicroNutrients()
        this.updateFoodSelector()
      },
    )
  }

  onFoodRemove = removedFood => {
    const removedFoodIndex = this.state.selectedFoods.findIndex(
      f => f.food.name === removedFood.food.name,
    )
    const updatedSelectedFoods = update(this.state.selectedFoods, {
      $splice: [[removedFoodIndex, 1]],
    })
    this.setState(
      {
        selectedFoods: updatedSelectedFoods,
      },
      () => {
        this.updateMacroNutrients()
        this.updateMicroNutrients()
        this.updateFoodSelector()
      },
    )
  }

  onFoodAmountChange = updatedSelectedFood => {
    const updatedFoodIndex = this.state.selectedFoods.findIndex(
      f => f.food.name === updatedSelectedFood.food.name,
    )
    const updatedSelectedFoods = update(this.state.selectedFoods, {
      $splice: [[updatedFoodIndex, 1, updatedSelectedFood]],
    })
    this.setState({ selectedFoods: updatedSelectedFoods }, () => {
      this.updateMacroNutrients()
      this.updateMicroNutrients()
    })
  }

  componentDidMount() {
    this.setState({ foodsForSelection: foods.map(food => food.name) })
    initTutorial()
  }

  render() {
    return (
      <div className="App">
        <div className="leftPanel">
          <div className="logo">
            <img alt="Logo" src={logo} />
          </div>
          <FoodSelector
            className="foodSelector"
            foods={this.state.foodsForSelection}
            onChange={this.onFoodSelect}
          />
          {this.state.selectedFoods.length === 0 && (
            <div className="addFoods">
              <Icon
                className="animate-flicker"
                style={{
                  fontSize: '50pt',
                  color: 'gray',
                }}
                type="arrow-up"
              />
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
        <div className="rightPanel">
          <MacroNutrients macroNutrients={this.state.macroNutrients} />
          <MicroNutrients definitions={nutrients} microNutrients={this.state.microNutrients} />
        </div>
      </div>
    )
  }
}
