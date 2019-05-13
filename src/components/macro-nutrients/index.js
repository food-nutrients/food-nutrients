import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MacroPieChart from '../macro-pie-chart'
import { defaultMacroNutrients } from './../calculations'

import './../../App.css'

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
          <div>Calories</div>
          <div>
            {this.props.macroNutrients.caloriesInUnits} {this.props.macroNutrients.caloriesUnits}
          </div>
        </div>
        <div
          className="macroNutrient"
          style={{ marginTop: '-10pt', display: 'flex', justifyContent: 'center' }}
        >
          <MacroPieChart macroNutrients={this.props.macroNutrients} />
        </div>
        <div className="macroNutrient">
          <div>Proteins</div>
          <div>
            {this.props.macroNutrients.proteinsInUnits} {this.props.macroNutrients.proteinUnits}
          </div>
        </div>
        <div className="macroNutrient">
          <div>Carbs</div>
          <div>
            {this.props.macroNutrients.carbohydratesInUnits}{' '}
            {this.props.macroNutrients.carbohydratesUnits}
          </div>
        </div>
        <div className="macroNutrient">
          <div>Fats</div>
          <div>
            {this.props.macroNutrients.fatInUnits} {this.props.macroNutrients.fatUnits}
          </div>
        </div>
      </div>
    )
  }
}
