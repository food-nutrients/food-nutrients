import React, { Component } from 'react'

import MacroNutrients from './components/macro-nutrients'
import MicroNutrients from './components/micro-nutrients'

import initTutorial from './components/tutorial'
import Foods from './components/foods'
import { calculateMacroNutrients, calculateMicroNutrients } from './components/calculations'

import logo from './imgs/logo.png'

// Datasets

import nutrients from './data/nutrients.json'

// Styles
import './App.css'

export default class App extends Component {
  state = {}

  updateMacroNutrients = selectedFoods => {
    this.setState({
      macroNutrients: calculateMacroNutrients(selectedFoods),
    })
  }
  updateMicroNutrients = selectedFoods => {
    this.setState({
      microNutrients: calculateMicroNutrients(selectedFoods, nutrients),
    })
  }

  updateNutrients = selectedFoods => {
    this.updateMacroNutrients(selectedFoods)
    this.updateMicroNutrients(selectedFoods)
  }

  componentDidMount() {
    initTutorial()
  }

  render() {
    return (
      <div className="App">
        <div className="leftPanel">
          <div className="logo">
            <img alt="Logo" src={logo} />
          </div>
          <Foods updateNutrients={this.updateNutrients} />
        </div>
        <div className="rightPanel">
          <MacroNutrients macroNutrients={this.state.macroNutrients} />
          <MicroNutrients definitions={nutrients} microNutrients={this.state.microNutrients} />
        </div>
      </div>
    )
  }
}
