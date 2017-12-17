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
import Center from '../Center'

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
        <Center><button>Buy it</button></Center>
      </form>
    )
  }
}

const CheckoutForm = injectStripe(_CheckoutForm)

class LocationShow extends React.Component {
  constructor(props) {
    super(props)
    console.log('+++ +++ LocationShow constructor:', props)

    // this isn't wired to the router, so I expect location as a prop, no dispatch in constructor

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

    let oWidth  = 200
    let oHeight = 200
    if (document.getElementById('leftPane')) {
      oWidth  = document.getElementById('leftPane').offsetWidth
      oHeight = document.getElementById('leftPane').offsetHeight
    }

    let badges = []
    if (this.props.location.badges) {
      this.props.location.badges.map((badge, idx) => {
        if (badge.is_premium) {
          badges.push(
            <div key={idx++} className={`badge badge-premium premium ${badge.is_bought ? 'bought' : ''}`}
                 style={{ position: 'absolute', top: badge.bg_pos_y, left: badge.bg_pos_x,
                          width: '100px',       height: '100px',     display: 'block',
                          background: `url(${badge.shaded_photo})`,
                          border: '1px solid gold',
                 }} onClick={() => this.buyBadge(badge)} />
          )
        } else {
          badges.push(
            <Link key={idx++} to={BjjcRouter.locationBadgeLink(this.props.location, badge)} >
              <div className="badge"
                   style={{ position: 'absolute', top: badge.bg_pos_y, left: badge.bg_pos_x,
                            width: '100px',       height: '100px',     display: 'block',
                            background: `url(${badge.shaded_photo})`
                   }} />
            </Link>)
        }
      })
    }

    return (
      <div style={{ width: this.props.location.background_image_width*2 - oWidth,
                    height: this.props.location.background_image_height*2 - oHeight, 
                    position: 'relative', 
                    top: -this.props.location.background_image_height + oHeight, 
                    left: -this.props.location.background_image_width + oWidth, 
      }}>
        <Draggable bounds="parent" >
          <div id="locationMap" style={{ height: this.props.location.background_image_height,
                                         width: this.props.location.background_image_width,
                                         background: `no-repeat url(${this.props.location.background_image_path})`,
                                         position: 'relative' }}>
            { badges }
          </div>
        </Draggable>

        <div style={{ display: 'none' }}>{this.props.children}</div>

        <Modal show={this.state.showBuyPremium} onHide={this.closeBuyBadge}>
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
        </Modal>

      </div>
    )
  }
}

LocationShow.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    blocation: state.blocation,
  }
}

export default connect(mapStateToProps)(LocationShow)
