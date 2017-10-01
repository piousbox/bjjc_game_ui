
import React from 'react'

class Debug extends React.Component {
  render () {
    return (<div style={{ color: '#cecece' }}>{ this.props.children }</div>)
  }
}

export default Debug
