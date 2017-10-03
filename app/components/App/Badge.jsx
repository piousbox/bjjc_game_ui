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
    // this.props.dispatch({ type: SET_PATH, path: nextProps.params })
  }

  render () {
    console.log('+++ +++ Badge render:', this.props, this.state)

    return (
      <div>badge</div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    path: state.path,
  }
}

export default connect(mapState)(Badge)
