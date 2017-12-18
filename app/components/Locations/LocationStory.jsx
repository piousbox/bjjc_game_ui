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
    console.log("+++ +++ _CheckoutForm in LocationStory:", this.props, this.state)
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

class LocationStory extends React.Component {
  constructor(props) {
    super(props)
    console.log('+++ +++ LocationStory constructor:', props)

    // this isn't wired to the router, so I expect location as a prop, no dispatch in constructor

    this.state = {
      showBuyPremium: false,
      badgeToBuy: {},
    }

    this.buyBadge = this.buyBadge.bind(this)
  }

  componentWillUpdate (nextProps) {
    // console.log('+++ +++ LocationStory componentWillUpdate:', nextProps)
  }

  componentWillReceiveProps (nextProps) {
    // console.log('+++ +++ LocationStory will receive props:', nextProps)
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
    console.log("+++ +++ LocationStory render:", this.props, this.state)

    if (Object.keys(this.props.location).length === 0) {
      return (null)
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
      <div>
        <h1>{ this.props.location.title }</h1>
      </div>
    )
  }
}

LocationStory.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    location: state.location,
  }
}

export default connect(mapStateToProps)(LocationStory)
