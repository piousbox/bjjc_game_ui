import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { Grid, Row, Col } from 'react-bootstrap'

import config from 'config'
import Center from '../Center'

import { venuesShow } from '../../actions'

class VenuesShow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      venues: {},
      venue: {},
    }
    this.props.dispatch(venuesShow({ venuename: props.params.venuename }))
  }

  componentWillReceiveProps(nextProps) {
    console.log("+++ +++ venuesShow received props:", nextProps)

    this.setState(Object.assign({}, this.state, {venue: nextProps.venue }))
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Center>
              <h1>{ this.state.venue.name }</h1>
            </Center>
          </Col>
        </Row>
        <Row>
          <Col xs={8} xsOffset={2}>
            <div dangerouslySetInnerHTML={{__html: this.state.venue.description}} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

VenuesShow.propTypes = {
}

const mapStateToProps = (state, ownProps) => {
  return {
    venue: state.venue,
  }
}

export default connect(mapStateToProps)(VenuesShow)

