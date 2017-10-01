
import React from 'react'

class Center extends React.Component {
  render () {
    return (<div style={{ textAlign: 'center' }}>{ this.props.children }</div>)
  }
}

export default Center
