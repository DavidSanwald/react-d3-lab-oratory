import React, { Component } from 'react'
import * as d3 from 'd3'
import Line from './Line'
const parseTime = d3.timeParse('%Y-%m')

class Chart extends Component {
  state = {
    widthScale: d3
      .scaleTime()
      .domain(d3.extent(this.props.data, d => d.date))
      .range([0, this.props.width]),

    heightScale: d3
      .scaleLinear()
      .domain([0, d3.max(this.props.data, d => d.value)])
      .range([this.props.height, 0])
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    let { widthScale, heightScale } = prevState

    widthScale.domain(d3.extent(nextProps.data, d => d.date))
    heightScale.domain([0, d3.max(nextProps.data, d => d.value)])

    prevState = { ...prevState, widthScale, heightScale }
    return prevState
  }

  render () {
    const { widthScale, heightScale } = this.state
    const { data } = this.props
    const scaledData = data.map(d => ({
      x: widthScale(d.date),
      y: heightScale(d.value)
    }))
    return (
      <div className='App'>
        <svg width={this.props.width} height={this.props.height}>
          <Line data={scaledData} />
        </svg>

      </div>
    )
  }
}

export default Chart
