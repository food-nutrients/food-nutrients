import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MacroPieChart from '../macro-pie-chart'
import { defaultMacroNutrients } from './../calculations'

import './../../App.css'
import MacroNutrient from '../macro-nutrient'

export default class MacroNutrients extends Component {
  static macroNutrientShape = PropTypes.shape({
    name: PropTypes.string.isRequired,
    raw: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
  })

  static propTypes = {
    macroNutrients: PropTypes.shape({
      calories: MacroNutrients.macroNutrientShape,
      proteins: MacroNutrients.macroNutrientShape,
      carbs: MacroNutrients.macroNutrientShape,
      fats: MacroNutrients.macroNutrientShape,
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
        macroNutrients.calories,
        macroNutrients.proteins,
        macroNutrients.carbs,
        macroNutrients.fats,
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
            units={macroNutrient.unit}
          />
        ))}
        <MacroPieChart
          proteins={this.props.macroNutrients.proteins.amount}
          carbohydrates={this.props.macroNutrients.carbs.amount}
          fat={this.props.macroNutrients.fats.amount}
        />
      </div>
    )
  }
}
