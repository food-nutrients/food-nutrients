import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import emptyGraph from './../../imgs/graph_placeholder.png'

ReactChartkick.addAdapter(Chart)
export default class MacroPieChart extends Component {
  static propTypes = {
    macroNutrients: PropTypes.any.isRequired,
  }

  pieChartData() {
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
      <React.Fragment>
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
            data={this.pieChartData()}
          />
        )}
      </React.Fragment>
    )
  }
}
