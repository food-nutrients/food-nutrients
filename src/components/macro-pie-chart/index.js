import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import emptyGraph from './../../imgs/graph_placeholder.png'

ReactChartkick.addAdapter(Chart)

export default class MacroPieChart extends Component {
  static propTypes = {
    proteins: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
  }
  calculatePercentage = (item, total) => parseInt((item * 100) / total, 10) || 0
  getTotalMacroNutrients = () => {
    const { proteins, carbohydrates, fat } = this.props
    return proteins + carbohydrates + fat
  }
  pieChartData() {
    const { proteins, carbohydrates, fat } = this.props
    const total = this.getTotalMacroNutrients()

    return [
      ['Proteins', this.calculatePercentage(proteins, total)],
      ['Carbs', this.calculatePercentage(carbohydrates, total)],
      ['Fat', this.calculatePercentage(fat, total)],
    ]
  }

  render() {
    return (
      <div className="macroNutrient macroChart">
        {this.getTotalMacroNutrients() === 0 ? (
          <Tooltip title="Macro Nutrients Ratio">
            <img className="macroChartEmpty" src={emptyGraph} alt="Empty Graph" />
          </Tooltip>
        ) : (
          <PieChart
            colors={['#5ca0d3', '#64CEAA', '#f9fd50']}
            id="macro_ratio_chart"
            suffix="%"
            legend={false}
            height="100px"
            width="100px"
            data={this.pieChartData()}
          />
        )}
      </div>
    )
  }
}
