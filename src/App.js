import React, { Component } from 'react'
import Chart from './Chart'
import { genDateValue } from '@vx/mock-data'

function genLines (num) {
  return new Array(num).fill(1).map(() => {
    return genDateValue(25)
  })
}

const genData = () => {
  const series = genLines(1)
  const data = series.reduce((rec, d) => {
    return rec.concat(d)
  }, [])
  return data
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { data: genData() }
  }
  updateData = () => this.setState({ data: genData() })

  render () {
    const { data } = this.state
    console.log(data)
    return (
      <div className='App'>
        <Chart height={400} width={600} data={data} />
        <button onClick={this.updateData}>New Data</button>
      </div>
    )
  }
}

export default App
