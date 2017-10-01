import React from 'react'
import { connect } from 'react-redux'
import { 
  StripeProvider, Elements, CardElement,
  injectStripe,
} from 'react-stripe-elements'

import {
  Button, Modal,
  Row, Col,
} from 'react-bootstrap'

import avatar     from './images/avatars/2.jpg'
import star       from './images/32x32/star.png'

import FacebookAuth from 'react-facebook-auth'

import { profileAction, loginAction, logoutAction } from '../../actions'

import config from 'config'

import Center from '../Center'

import TgmApi from './TgmApi'

const MyFacebookButton = ({ onClick }) => (
  <button onClick={onClick}>F</button>
)

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

      payload = Object.assign({}, payload, { amount: 500, 
                                             profile: this.props.profile })
      console.log("+++ payload:", payload)      

      fetch(TgmApi.buyStars, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(payload)
      }).then(r => r.json()).then(_data => {
        console.log("+++ success!", _data)
        this.props.dispatch(profileAction())
        this.props.handleSuccess()
      })

    })
  }

  render () {
    console.log("+++ +++ _CheckoutForm:", this.props, this.state)

    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <Row>
          <Col sm={4}>
            <h1>$5</h1>
          </Col>
          <Col sm={4}>
            <h1>$10</h1>
          </Col>
          <Col sm={4}>
            <h1>$15</h1>
          </Col>

        </Row>
        <Center><button>Buy Stars</button></Center>
      </form>
    )
  }
}

const CheckoutForm = injectStripe(_CheckoutForm)

class FbConnect extends React.Component {

  constructor(props) {
    super(props)
    props.dispatch(profileAction())
    this.state = { 
      profile: {},
    }
    this.handleSuccess = this.handleSuccess.bind(this)
  }

  handleSuccess (e) {
    this.setState({ showBuySuccess: true, showBuyMore: false })
  }

  render () {
    console.log("+++ +++ rendering FbConnect:", this.props, this.state)

    let loggedIn = !!(this.props.profile && this.props.profile.name)

    let fbLogin = (<FacebookAuth appId={config.fbAppId} fields="name,email,picture" 
                                 callback={(response) => {this.props.dispatch(loginAction(response))}} 
                                 component={MyFacebookButton} />)

    if (loggedIn) {
      return (
        <div style={{ display: 'inline-block' }}>

          <Modal show={this.state.showBuySuccess} onHide={() => { this.setState({ showBuySuccess: false }) }} >
            <Modal.Header closeButton>
              <Modal.Title>Thanks!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Your purchase went through, you should see the updated stars.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => { this.setState({ showBuySuccess: false }) }}>Close</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.showBuyMore} onHide={() => { this.setState({ showBuyMore: false }) }} >
            <Modal.Header closeButton>
              <Modal.Title>Buy Stars</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <StripeProvider apiKey={config.stripePublicKey}>
                <Elements>
                  <CheckoutForm profile={this.props.profile} dispatch={this.props.dispatch} handleSuccess={this.handleSuccess} />
                </Elements>
              </StripeProvider>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => { this.setState({ showBuyMore: false }) }}>Close</Button>
            </Modal.Footer>
          </Modal>

          <img className="avatar" src={ avatar } alt='' />
          <h5>What's up { this.props.profile.name }</h5>
          You have { this.props.profile.n_stars } <img style={{ display: 'inline' }} src={ star } alt='star' />&#39;s. 
          <Button onClick={ () => {this.setState({ showBuyMore: true })} }>Buy More</Button>
          <button onClick={ () => {this.props.dispatch(logoutAction())} }>Logout</button>
        </div>
      )
    } else {
      return (
        <div style={{ display: 'inline-block' }}>
          { fbLogin }
        </div>
      )
    }

  }
}

function mapStateToProps(state, ownProps) {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps)(FbConnect)
