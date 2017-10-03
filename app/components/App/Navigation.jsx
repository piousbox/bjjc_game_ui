import React from 'react'
import { connect } from 'react-redux'

import { Grid, Row, Col, } from 'react-bootstrap'

import Clearfix from './Clearfix'
import Headers  from './Headers'

import { SET_PATH } from '../../constants'

class Navigation extends React.Component {

  constructor(props) {
    super(props)

    console.log('+++ +++ navigation constructor:', props)

    if (Object.keys(props.params).length > 0) { 
      // I'm deep in categories
      props.dispatch({ type: SET_PATH, path: props.params })
    } else {
      // I'm categoriesToplevel or other
      props.dispatch({ type: SET_PATH, path: props.route.path })
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('+++ +++ navigation will receive props:', nextProps)

    if (Object.keys(nextProps.params).length > 0) { 
      // I'm deep in categories
      this.props.dispatch({ type: SET_PATH, path: nextProps.params })
    } else {
      // I'm categoriesToplevel or other
      this.props.dispatch({ type: SET_PATH, path: nextProps.route.path })
    }
  }

  render () {
    console.log("+++ +++ navigation render:", this.props, this.stats)

    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div style={{ position: 'relative', height: '80px' }} >
                <Headers />
              </div>
            </Col>
          </Row>
        </Grid>
        { this.props.children }
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {}
}

export default connect(mapState)(Navigation)
