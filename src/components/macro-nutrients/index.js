import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MacroPieChart from '../macro-pie-chart'
import { defaultMacroNutrients } from './../calculations'

import './../../App.css'
import MacroNutrient from '../macro-nutrient'

export default class MacroNutrients extends Component {
  static propTypes = {
    macroNutrients: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      caloriesInUnits: PropTypes.number.isRequired,
      caloriesUnits: PropTypes.string.isRequired,

      proteins: PropTypes.number.isRequired,
      proteinsInUnits: PropTypes.number.isRequired,
      proteinUnits: PropTypes.string.isRequired,

      carbohydrates: PropTypes.number.isRequired,
      carbohydratesInUnits: PropTypes.number.isRequired,
      carbohydratesUnits: PropTypes.string.isRequired,

      fat: PropTypes.number.isRequired,
      fatInUnits: PropTypes.number.isRequired,
      fatUnits: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    macroNutrients: defaultMacroNutrients,
  }
  state = {
    macroNutrients: [],
  }
  static getDerivedStateFromProps(nextProps) {
    const macroNutrients = nextProps.macroNutrients

    return {
      macroNutrients: [
        {
          name: 'Calories',
          amount: macroNutrients.caloriesInUnits,
          units: macroNutrients.caloriesUnits,
        },
        {
          name: 'Proteins',
          amount: macroNutrients.proteinsInUnits,
          units: macroNutrients.proteinUnits,
        },
        {
          name: 'Carbs',
          amount: macroNutrients.carbohydratesInUnits,
          units: macroNutrients.carbohydratesUnits,
        },
        {
          name: 'Fats',
          amount: macroNutrients.fatInUnits,
          units: macroNutrients.fatUnits,
        },
      ],
    }
  }
  render() {
    return (
      <div className="macroNutrients">
        {this.state.macroNutrients.map(macroNutrient => (
          <MacroNutrient
            key={macroNutrient.name}
            name={macroNutrient.name}
            amount={macroNutrient.amount}
            units={macroNutrient.units}
          />
        ))}
        <MacroPieChart
          proteins={this.props.macroNutrients.proteins}
          carbohydrates={this.props.macroNutrients.carbohydrates}
          fat={this.props.macroNutrients.fat}
        />
      </div>
    )
  }
}
