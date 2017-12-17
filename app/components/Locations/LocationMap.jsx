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

/**
 * see LocationShow for example of checkout
 *
 * this isn't wired to the router
 */
class LocationMap extends React.Component {
  constructor(props) {
    super(props)
    console.log('+++ +++ LocationMap constructor:', props)

    this.state = {
      showBuyPremium: false,
      badgeToBuy: {},
    }

    props.disaptch(locationAction(props.params.locationname))

    this.buyBadge = this.buyBadge.bind(this)
  }

  componentWillUpdate (nextProps) {
    // console.log('+++ +++ LocationMap componentWillUpdate:', nextProps)
  }

  componentWillReceiveProps (nextProps) {
    // console.log('+++ +++ LocationMap will receive props:', nextProps)
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
    console.log("+++ +++ LocationMap render:", this.props, this.state)

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

LocationMap.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    blocation: state.blocation,
  }
}

export default connect(mapStateToProps)(LocationMap)
