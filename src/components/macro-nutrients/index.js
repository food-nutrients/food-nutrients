import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MacroPieChart from '../macro-pie-chart'
import { defaultMacroNutrients } from './../calculations'

import './../../App.css'
import MacroNutrient from '../macro-nutrient'

export default class MacroNutrients extends Component {
  static propTypes = {
    macroNutrients: PropTypes.shape({
      calories: PropTypes.shape({
        raw: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
      }),
      proteins: PropTypes.shape({
        raw: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
      }),
      carbs: PropTypes.shape({
        raw: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
      }),
      fats: PropTypes.shape({
        raw: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
      }),
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
          amount: macroNutrients.calories.amount,
          units: macroNutrients.calories.unit,
        },
        {
          name: 'Proteins',
          amount: macroNutrients.proteins.amount,
          units: macroNutrients.proteins.unit,
        },
        {
          name: 'Carbs',
          amount: macroNutrients.carbs.amount,
          units: macroNutrients.carbs.unit,
        },
        {
          name: 'Fats',
          amount: macroNutrients.fats.amount,
          units: macroNutrients.fats.unit,
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
          proteins={this.props.macroNutrients.proteins.amount}
          carbohydrates={this.props.macroNutrients.carbs.amount}
          fat={this.props.macroNutrients.fats.amount}
        />
      </div>
    )
  }
}
