import React from 'react'
import { connect } from 'react-redux'

import { Grid, Row, Col, } from 'react-bootstrap'

import Clearfix from './Clearfix'
import Headers  from './Headers'

import { SET_PATH } from '../../constants'

class Navigation extends React.Component {

  constructor(props) {
    super(props)
    props.dispatch({ type: SET_PATH, path: props.params })
  }

  render () {
    console.log("+++ +++ navigation:", this.props, this.stats)

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
