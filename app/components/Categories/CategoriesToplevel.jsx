import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Grid, Row, Col, 
} from 'react-bootstrap'

import { SET_PATH } from '../../constants'

class CategoriesToplevel extends React.Component {
  constructor(props) {
    super(props)
    props.dispatch({ type: SET_PATH, path: props.route.path })
  }

  render () {
    console.log("+++ categoriesToplevel:", this.props, this.state)

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            categories toplevel
            <ul style={{ marginLeft: '1em' }} >
              <li><Link to="/categories/technique">BJJ Technique</Link></li>
              <li><Link to="/categories/salsa">Salsa</Link></li>
              <li><Link to="/categories/billiards">Playing Pool</Link></li>
            </ul>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapState = (state, ownProps) => {
  return {}
}

export default connect(mapState)(CategoriesToplevel)
