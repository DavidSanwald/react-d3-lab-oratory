import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { Spring } from 'react-spring'

class Line extends Component {
  static defaultProps = {
    fill: 'none',
    stroke: '#FF0000',
    strokeWidth: 5
  }
  line = d3
    .line()
    .x(function (d) {
      return d.x
    })
    .y(function (d) {
      return d.y
    })
    .curve(d3.curveCatmullRom.alpha(0.5))

  render () {
    const { fill, stroke, strokeWidth, data } = this.props
    const pathD = this.line(data)

    return (
      <g>
        <Spring to={{ pathD }}>
          {interpolated => (
            <path
              className='line'
              d={interpolated.pathD}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          )}
        </Spring>

      </g>
    )
  }
}

export default Line
