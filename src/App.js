import React, { Component } from 'react'
import Quadrant from './Quadrant'
import points from './points'
import './style.css'

class App extends Component {
  render () {
    return (
      <main>
        <Quadrant points={points} />
      </main>
    )
  }
}

export default App
