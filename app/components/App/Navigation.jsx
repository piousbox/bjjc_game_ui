import React from 'react'

import { Grid, Row, Col, } from 'react-bootstrap'

import Clearfix from './Clearfix'
import Headers  from './Headers'

class Navigation extends React.Component {

  render () {
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

export default Navigation
