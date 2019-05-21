import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MacroNutrient extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    macroNutrients: PropTypes.any,
  }

  render() {
    const { name, amount, units } = this.props

    return (
      <React.Fragment>
        <div>{name}</div>
        <div>
          {amount} {units}
        </div>
      </React.Fragment>
    )
  }
}
