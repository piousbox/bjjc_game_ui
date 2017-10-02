import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import FacebookAuth from 'react-facebook-auth'
import { EmailSignUpForm, AuthGlobals } from 'redux-auth/default-theme'
import { authStateReducer } from 'redux-auth'

import { Grid, Row, Col,
         Nav, NavItem, Navbar,
} from 'react-bootstrap'

import { Link } from 'react-router'
import { connect } from 'react-redux'

import config from 'config'

import styles      from './_App.scss'
import Features    from './Features'
import Footer      from './Footer'
import Newsitems   from './Newsitems'

import { LinkContainer } from 'react-router-bootstrap'

import { siteShow } from '../../actions'

const loginFbUser = (r) => {
  console.log('+++ +++ todo!')
}

const saveFbUser = (r) => {
  console.log('+++ +++ more todo!')
}

/* const MyFacebookButton = ({ onClick }) => (
  <button onClick={onClick}>
    Login with facebook
  </button>
); */

class Home extends React.Component {

  constructor(props) {
    super(props) 
    // this.props.dispatch(siteShow());

    console.log('+++ +++ home:', this.props)
    if (this.props.site) {
      localStorage.setItem("lang", this.props.site.lang)
    }
  }

  componentWillMount() {
  }

  render () {
    console.log('+++ +++ rendering Home:', this.props, this.state)

    let newsitems = []
    if (this.props.siteNewsitems) {
      this.props.siteNewsitems.forEach((item, idx) => {
        newsitems.push(<li key={idx} >{item.name}</li>)
      })
    }

    return (
      <div style={{ marginTop: '60px' }}>
        <Grid>
          <Row>
            <Col xs={12}>
              <h1>Hello!</h1>
              <ul>
                <li>
                  <ul style={{ marginLeft: '1em' }} >
                    <li><Link to="/categories/technique">BJJ Technique</Link></li>
                    <li><Link to="/categories/salsa">Salsa</Link></li>
                    <li><Link to="/categories/billiards">Playing Pool</Link></li>
                  </ul>
                </li>
                <li><Link to="/tgm2">Gameui</Link></li>
                <li><Link to="/shop">Shop</Link></li>
              </ul>
            </Col>
          </Row>

          <Features features={this.props.site.features} />

          <Row>
            <Col xs={12} xsOffset={0} 
                 md={8} mdOffset={2}
                 lg={6} lgOffset={3} >
              <Newsitems newsitems={ this.props.site.newsitems } nAds={3} site={this.props.site} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

Home.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    site: state.site,
  }
}

export default connect(mapStateToProps)(Home)

