import React from 'react'
import { connect } from 'react-redux'

// import { SET_PATH, } from '../../constants'

import { setBadge } from '../../actions'

class Badge extends React.Component {
  constructor(props) {
    super(props)
    console.log('+++ +++ Badge constructor:', props)
    this.state = {}
    this.props.dispatch(setBadge(props.params.badgename))
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    console.log('+++ +++ Badge will receive props:', this.props, nextProps)
    if (this.props.params.badgename !== nextProps.params.badgename) {
      this.props.dispatch(setBadge(nextProps.params.badgename))
    }
  }

  render () {
    console.log('+++ +++ Badge render:', this.props, this.state)
    return (
      <div>badge {this.props.badge.title}</div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    path: state.path,
    badge: state.badge,
  }
}

export default connect(mapState)(Badge)
