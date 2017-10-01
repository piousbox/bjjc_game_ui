
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Center from '../Center'
import { myReportsAction } from '../../actions'

class MyReports extends React.Component {
  constructor(props) {
    super(props)
    this.props.dispatch(myReportsAction())
  }

  render () {
    console.log("+++ +++ rendering myReports:", this.props)

    return(
      <div>
        <Center><h1>
          Reports
          [+]
        </h1></Center>
        <h3>[~] One</h3>
        subhead...
        <h3>[~] Two</h3>
        subhead...
        <h3>[~] Three</h3>
        subhead...
      </div>)
  }
}

MyReports.propTypes = {
  // myGalleries: PropTypes.array,
  // myReports: PropTypes.array,
}

function mapStateToProps(state, ownProps) {
  return {
    myGalleries: state.myGalleries,
    myReports: state.myReports,
  }
}

export default connect(mapStateToProps)(MyReports)

