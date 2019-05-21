import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MacroNutrient extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    amount: PropTypes.number,
    units: PropTypes.string,
  }

  static defaultProps = {
    amount: 0,
    units: '',
  }

  render() {
    const { name, amount, units } = this.props

    return (
      <div className="macroNutrient">
        <div>{name}</div>
        <div>
          {amount} {units}
        </div>
      </div>
    )
  }
}
