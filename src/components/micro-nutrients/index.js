import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Progress } from 'antd'

export default class MicroNutrients extends Component {
  static propTypes = {
    definitions: PropTypes.any.isRequired,
    microNutrients: PropTypes.any,
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
            {microNutrientsByType[microNutrientsByTypeName].map(microNutrient => {
              let percentage = 0
              let amount = 0
              let unit = 'μg'
              let mN = {}
              if (this.props.microNutrients && this.props.microNutrients[microNutrient.name]) {
                mN = this.props.microNutrients[microNutrient.name]
                percentage = this.props.microNutrients[microNutrient.name].percentage
                amount = this.props.microNutrients[microNutrient.name].amountInUnits
                unit = this.props.microNutrients[microNutrient.name].amountUnit
              }

              return (
                <div key={microNutrient.name} className="microNutrient">
                  <div className="microNutrientName">
                    <a target="_blank" rel="noopener noreferrer" href={microNutrient.wiki}>
                      {microNutrient.name}
                    </a>
                  </div>
                  <div className="microNutrientProgressBar">
                    <Progress
                      showInfo={false}
                      status={this.nutrientStatus(mN)}
                      percent={percentage}
                      size="small"
                    />
                    <span>{percentage}% </span>
                  </div>
                  <div className="microNutrientAmount">
                    {amount} {unit}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }
}
