import React from 'react'

import { Grid, Row, Col } from 'react-bootstrap'

import styles from './_Footer.scss'
import bg from './images/bg1.png'

import ig from './images/social/instagram.png'
import fb from './images/social/facebook.png'
import uu from './images/social/youtube.png'

import config from 'config'

import { siteShow } from '../../actions'

import { Link } from 'react-router'
import BjjcRouter from './BjjcRouter'

import {
  DO_LOGOUT,
} from '../../constants'

import { connect } from 'react-redux'

class Footer extends React.Component {

  constructor(props) {
    super(props)
    // this.props.dispatch(siteShow())
  }

  logout = () => {
    this.props.dispatch({ type: DO_LOGOUT })
  }

  render () {
    // console.log('+++ +++ Footer:', this.props, this.state)

    return (
      <div className={styles.footer1} style={{ backgroundImage: `url(${bg})` }} >
        <Grid style={{ height: '200px' }} >
          <Row>
            <Col xs={4} >
              ^__^
            </Col>
            <Col xs={4}>
            </Col>
            <Col xs={4}>
              2017 &copy; wasya_co
            </Col>
          </Row>
          <Row>
            <Col xs={4} >
              <ul>
                { /* <li>apiUrl: {this.props.apiUrl}</li> */ }
                <li>Domain: {config.domain}</li>
              </ul>
            </Col>
            <Col xs={4}>
              <button onClick={this.logout} >Logout</button>
            </Col>
            <Col xs={4}>
              <ul className="debug">
                { /* <li>{ this.props.params }</li> */ }
                { /* <li>{ this.props.routes }</li> */ }
              </ul>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    profile: state.profile,
    site: state.site,
  }
}

export default connect(mapStateToProps)(Footer)

      
      
