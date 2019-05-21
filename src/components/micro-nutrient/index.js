/* eslint-disable no-undef */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Progress } from 'antd'

export default class MicroNutrient extends Component {
  static propTypes = {
    microNutrient: PropTypes.any.isRequired,
    microNutrientData: PropTypes.any,
  }

  static defaultProps = {
    microNutrientData: null,
  }
  state = {
    name: '',
    wiki: '#',
    percentage: 0,
    amount: 0,
    unit: 'μg',
    nutrientStatus: 'normal',
  }
  shouldComponentUpdate(nextProps) {
    if (!nextProps.microNutrientData) return this.state.amount !== 0 || this.state.name === ''
    return (
      nextProps.microNutrientData.amount !== this.state.amount ||
      nextProps.microNutrientData.amountUnit !== this.state.unit
    )
  }
  componentWillReceiveProps(newProps) {
    if (
      newProps.microNutrientData === null &&
      (this.state.amount !== 0 ||
        this.state.unit !== 'μg' ||
        this.state.name !== newProps.microNutrient.name ||
        this.state.wiki !== newProps.microNutrient.wiki)
    ) {
      this.setState({
        name: newProps.microNutrient.name,
        wiki: newProps.microNutrient.wiki,
        percentage: 0,
        amount: 0,
        unit: 'μg',
        nutrientStatus: 'normal',
      })
    }

    if (
      newProps.microNutrientData &&
      (newProps.microNutrientData.amount !== this.state.amount ||
        newProps.microNutrientData.amountUnit !== this.state.unit)
    ) {
      return this.setState({
        name: newProps.microNutrient.name,
        wiki: newProps.microNutrient.wiki,
        percentage: newProps.microNutrientData.percentage,
        amount: newProps.microNutrientData.amountInUnits,
        unit: newProps.microNutrientData.amountUnit,
        nutrientStatus: this.nutrientStatus(newProps.microNutrientData),
      })
    }
  }

  nutrientStatus(microNutrient) {
    let barType = 'normal'
    if (
      microNutrient.amount >= microNutrient.rda &&
      microNutrient.amount < 1.5 * microNutrient.rda
    ) {
      barType = 'success'
    } else if (microNutrient.amount >= 1.5 * microNutrient.rda) {
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
