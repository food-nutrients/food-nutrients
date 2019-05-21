import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MicroNutrient from './../micro-nutrient'

export default class MicroNutrients extends Component {
  static propTypes = {
    definitions: PropTypes.any.isRequired,
    microNutrients: PropTypes.any,
  }
  static defaultProps = {
    microNutrients: {},
  }

  render() {
    const microNutrientsByType = this.props.definitions.reduce((group, current) => {
      if (typeof group[current.type] === 'undefined') {
        group[current.type] = []
      }
      group[current.type].push(current)
      return group
    }, {})
    return (
      <div className="microNutrients">
        {Object.keys(microNutrientsByType).map(microNutrientsByTypeName => (
          <div key={microNutrientsByTypeName} className="microNutrientType">
            <span className="nutrientType">{microNutrientsByTypeName}</span>
            {microNutrientsByType[microNutrientsByTypeName].map(microNutrient => (
              <MicroNutrient
                key={microNutrient.name}
                microNutrient={microNutrient}
                microNutrientData={this.props.microNutrients[microNutrient.name]}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }
}
