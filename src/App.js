import React, { Component } from 'react'
import { from } from 'rxjs'
import { map } from 'rxjs/operators'
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
  nutrients$ = from(nutrients)
  nutrientsLimited$ = from(nutrients).pipe(
    map(nutrient => ({
      name: nutrient.name,
      rda: nutrient.rda,
    })),
  )
  updateNutrients = selectedFoods$ => {
    this.setState({
      macroNutrients: calculateMacroNutrients(selectedFoods$),
      microNutrients: calculateMicroNutrients(selectedFoods$, this.nutrientsLimited$),
    })
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
