import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MacroPieChart from '../macro-pie-chart'
import { defaultMacroNutrients } from './../calculations'

import './../../App.css'
import MacroNutrient from '../macro-nutrient'

export default class MacroNutrients extends Component {
  static propTypes = {
    macroNutrients: PropTypes.any,
  }

  static defaultProps = {
    macroNutrients: defaultMacroNutrients,
  }
  render() {
    return (
      <div className="macroNutrients">
        <div className="macroNutrient">
          <MacroNutrient
            name="Calories"
            amount={this.props.macroNutrients.caloriesInUnits}
            units={this.props.macroNutrients.caloriesUnits}
          />
        </div>
        <div
          className="macroNutrient"
          style={{ marginTop: '-10pt', display: 'flex', justifyContent: 'center' }}
        >
          <MacroPieChart
            proteins={this.props.macroNutrients.proteins}
            carbohydrates={this.props.macroNutrients.carbohydrates}
            fat={this.props.macroNutrients.fat}
          />
        </div>
        <div className="macroNutrient">
          <MacroNutrient
            name="Proteins"
            amount={this.props.macroNutrients.proteinsInUnits}
            units={this.props.macroNutrients.proteinUnits}
          />
        </div>
        <div className="macroNutrient">
          <MacroNutrient
            name="Carbs"
            amount={this.props.macroNutrients.carbohydratesInUnits}
            units={this.props.macroNutrients.carbohydratesUnits}
          />
        </div>
        <div className="macroNutrient">
          <MacroNutrient
            name="Fats"
            amount={this.props.macroNutrients.fatInUnits}
            units={this.props.macroNutrients.fatUnits}
          />
        </div>
      </div>
    )
  }
}
