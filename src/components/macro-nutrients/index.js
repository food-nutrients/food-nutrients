import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import { Tooltip } from 'antd'

import emptyGraph from './../../imgs/graph_placeholder.png'

import './../../App.css'

ReactChartkick.addAdapter(Chart)

export default class MacroNutrients extends Component {
  static propTypes = {
    macroNutrients: PropTypes.any,
  }

  static defaultProps = {
    macroNutrients: {
      calories: 0,
      caloriesUnits: 'kcal',
      caloriesInUnits: 0,
      proteins: 0,
      proteinUnits: 'μg',
      proteinsInUnits: 0,
      carbohydrates: 0,
      carbohydratesUnits: 'μg',
      carbohydratesInUnits: 0,
      fat: 0,
      fatUnits: 'μg',
      fatInUnits: 0,
    },
  }
  getPieChartData() {
    const total =
      this.props.macroNutrients.proteins +
      this.props.macroNutrients.carbohydrates +
      this.props.macroNutrients.fat
    return [
      ['Proteins', parseInt((this.props.macroNutrients.proteins * 100) / total, 10) || 0],
      ['Carbs', parseInt((this.props.macroNutrients.carbohydrates * 100) / total, 10) || 0],
      ['Fat', parseInt((this.props.macroNutrients.fat * 100) / total, 10) || 0],
    ]
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
          {this.props.macroNutrients.proteins === 0 && (
            <Tooltip title="Macro Nutrients Ratio">
              <img style={{ opacity: '0.1' }} src={emptyGraph} alt="Empty Graph" />
            </Tooltip>
          )}
          {this.props.macroNutrients.proteins !== 0 && (
            <PieChart
              colors={['#5ca0d3', '#64CEAA', '#f9fd50']}
              id="macro_ratio_chart"
              suffix="%"
              legend={false}
              height="100px"
              width="100px"
              data={this.getPieChartData()}
            />
          )}
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
