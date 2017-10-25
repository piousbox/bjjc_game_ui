import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import FacebookAuth from 'react-facebook-auth'
import { EmailSignUpForm, AuthGlobals } from 'redux-auth/default-theme'
import { authStateReducer } from 'redux-auth'

import { Grid, Row, Col,
         Nav, NavItem, Navbar,
} from 'react-bootstrap'

import { Link, browserHistory as history } from 'react-router'
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

class Home extends React.Component {

  constructor(props) {
    super(props)

    // props.dispatch(siteShow());

    history.push('/tgm3')

    if (props.site) {
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
              <ul>
                <li><Link to="/categories">Categories</Link></li> 
                <li><Link to="/tgm3">Gameui</Link></li>
                <li><Link to="/shop">Shop</Link></li>
              </ul>
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

