import React from 'react'
import { connect } from 'react-redux'

import { setBadge, setLocation } from '../../actions'

class Tgm3Child extends React.Component {
  constructor(props) {
    super(props)
    console.log('+++ +++ Tgm3Child constructor:', props)

    if (props.params.locationname) {
      props.dispatch(setLocation(props.params.locationname))
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log('+++ +++ Tgm3Child will receive props:', this.props, nextProps)
    if (nextProps.params.locationname && this.props.params.locationname !== nextProps.params.locationname) {
      this.props.dispatch(setLocation(nextProps.params.locationname))
    }
  }

  render () {
    console.log('+++ +++ Tgm3Child render:', this.props, this.state)
    return (
      <div>tgm3child</div>
    )
  }
}

const mapState = (state) => {
  return {
    path: state.path,
    badge: state.badge,
    blocation: state.blocation,
    rightPane: state.rightPane,
    leftPane: state.leftPane,
  }
}

export default connect(mapState)(Tgm3Child)
