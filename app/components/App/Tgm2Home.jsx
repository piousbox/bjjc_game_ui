import React from 'react'
import { connect } from 'react-redux'

// import { tgm2homeAction } from '../../actions'

class Tgm2Home extends React.Component {

  constructor(props) {
    super(props)
    // props.dispatch(tgm2homeAction());
  }

  render () {
    // console.log("+++ +++ rendering tgm2home:", this.props, this.state)

    return(
      <div>Tgm2Home</div>
    )
  }
}

Tgm2Home.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    leftPane: state.leftPane,
    rightPane: state.rightPane,
  }
}

export default connect(mapStateToProps)(Tgm2Home)
