/* eslint-disable no-undef */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Progress } from 'antd'

export default class MicroNutrient extends Component {
  static propTypes = {
    microNutrient: PropTypes.shape({
      name: PropTypes.string.isRequired,
      wiki: PropTypes.string.isRequired,
    }).isRequired,
    microNutrientData: PropTypes.shape({
      raw: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      percentage: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    microNutrientData: null,
  }
  state = {
    name: '',
    wiki: '#',
    percentage: 0,
    raw: 0,
    amount: 0,
    unit: 'μg',
    nutrientStatus: 'normal',
  }
  shouldComponentUpdate(nextProps) {
    if (!nextProps.microNutrientData) return this.state.raw !== 0 || this.state.name === ''
    return (
      nextProps.microNutrientData.raw !== this.state.raw ||
      nextProps.microNutrientData.unit !== this.state.unit
    )
  }
  static getDerivedStateFromProps(newProps, prevState) {
    return {
      name: newProps.microNutrient.name,
      wiki: newProps.microNutrient.wiki,
      percentage: newProps.microNutrientData ? newProps.microNutrientData.percentage : 0,
      raw: newProps.microNutrientData ? newProps.microNutrientData.raw : 0,
      amount: newProps.microNutrientData ? newProps.microNutrientData.amount : 0,
      unit: newProps.microNutrientData ? newProps.microNutrientData.unit : 'μg',
      nutrientStatus: newProps.microNutrientData
        ? MicroNutrient.nutrientStatus(newProps.microNutrientData)
        : 'normal',
    }
  }

  static nutrientStatus(microNutrient) {
    let barType = 'normal'
    if (microNutrient.raw >= microNutrient.rda && microNutrient.raw < 1.5 * microNutrient.rda) {
      barType = 'success'
    } else if (microNutrient.raw >= 1.5 * microNutrient.rda) {
      barType = 'exception'
    }
    return barType
  }

  render() {
    const { name, wiki, percentage, amount, unit, nutrientStatus } = this.state

    return (
      <div key={name} className="microNutrient">
        <div className="microNutrientName">
          <a target="_blank" rel="noopener noreferrer" href={wiki}>
            {name}
          </a>
        </div>
        <div className="microNutrientProgressBar">
          <Progress showInfo={false} status={nutrientStatus} percent={percentage} size="small" />
          <span>{percentage}% </span>
        </div>
        <div className="microNutrientAmount">
          {amount} {unit}
        </div>
      </div>
    )
  }
}
