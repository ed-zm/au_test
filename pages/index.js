import React from 'react'
import withNextData from '../src/hoc/withNextData'
import Home from '../src/screens'

export default withNextData(props => <Home { ...props } />)