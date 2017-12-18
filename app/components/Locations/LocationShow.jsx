import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Draggable from 'react-draggable'
import {
  Modal, Grid, Row, Col,
} from 'react-bootstrap'
import { 
  StripeProvider, Elements, CardElement,
  injectStripe,
} from 'react-stripe-elements'

import config from 'config'

import { locationAction } from '../../actions'

import { BjjcRouter } from '../App'

/**
 * this is example with stripe!
 *
 *
 *
 *
 */

class _CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log("+++ handlesubmit:", e)
    this.props.stripe.createToken().then((payload) => {

      payload = Object.assign({}, payload, { profile: this.props.profile, badge: this.props.badgeToBuy })
      console.log("+++ payload:", payload)

      let fbAccount = JSON.parse(localStorage.getItem('fbAccount'))

      fetch(BjjcRouter.buyBadge( this.props.badgeToBuy ), {
        method: 'POST',
        headers: { version: 'tgm3', 
                   'Content-Type': 'application/json',
                   accessToken: fbAccount.fb_long_access_token
        },
        body: JSON.stringify(payload)
      }).then(r => r.json()).then(_data => {
        console.log("+++ success!", _data)
        this.props.dispatch(profileAction())
        this.props.handleSuccess()
      })

    })
  }

  render () {
    console.log("+++ +++ _CheckoutForm in LocationShow:", this.props, this.state)
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <Row>
          <Col sm={12}>
            <h1>${this.props.badgeToBuy.cost}</h1>
          </Col>
        </Row>
        <button>Buy it</button>
      </form>
    )
  }
}

const CheckoutForm = injectStripe(_CheckoutForm)

/**
 * not wired to the router
 */
class LocationShow extends React.Component {
  constructor(props) {
    super(props)
    console.log('+++ +++ LocationShow constructor:', props)

    this.state = {
      showBuyPremium: false,
      badgeToBuy: {},
    }

    this.buyBadge = this.buyBadge.bind(this)
  }

  componentWillUpdate (nextProps) {
    // console.log('+++ +++ LocationShow componentWillUpdate:', nextProps)
  }

  componentWillReceiveProps (nextProps) {
    // console.log('+++ +++ LocationShow will receive props:', nextProps)
  }

  buyBadge = (badge) => {
    console.log('+++ +++ buyBadge:', badge)
    this.setState({ showBuyPremium: true, 
                    badgeToBuy: badge, })
  }
  closeBuyBadge = () => {
    this.setState({ showBuyPremium: false })
  }

  handleSuccess (e) {
    this.setState({ showBuySuccess: true, showBuyPremiumm: false })
  }
  closeBuySuccess = () => {
    this.setState({ showBuySuccess: false })
  }

  render () {
    console.log("+++ +++ LocationShow render:", this.props, this.state)

    if (Object.keys(this.props.location).length === 0) {
      return (null)
    }

    let badges = []
    if (this.props.location.badges) {
      this.props.location.badges.map((badge, idx) => {
        if (badge.is_premium) {
          badges.push(
            <li>
              <div key={idx++} className={`badge badge-premium premium ${badge.is_bought ? 'bought' : ''}`}
                   onClick={() => this.buyBadge(badge)} >{ badge.title }</div>
            </li>)
        } else {
          badges.push(
            <li>
              <Link key={idx++} to={BjjcRouter.locationBadgeLink(this.props.location, badge)} >{ badge.title }</Link>
            </li>)
        }
      })
    }

    return (
      <div >
        <h5>{this.props.location.title}</h5>
        <div dangerouslySetInnerHTML={{ __html: this.props.location.description }} />

        <h5>Badges:</h5>
        <ul>{ badges }</ul>

        { /* <Modal show={this.state.showBuyPremium} onHide={this.closeBuyBadge}>
          <Modal.Header closeButton>
            <Modal.Title>Let's buy this badge "{this.state.badgeToBuy.title}"</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Would you like to guy access to this quest? It's {this.state.badgeToBuy.cost}</p>
            <StripeProvider apiKey={config.stripePublicKey}>
              <Elements>
                <CheckoutForm badgeToBuy={this.state.badgeToBuy} profile={this.props.profile} dispatch={this.props.dispatch} handleSuccess={this.handleSuccess} />
              </Elements>
            </StripeProvider>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.showBuySuccess} onHide={this.closeBuySuccess}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Thanks, you got this.
          </Modal.Body>
        </Modal> */ }
        
      </div>
    )
  }
}

LocationShow.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    location: state.location,
  }
}

export default connect(mapStateToProps)(LocationShow)
