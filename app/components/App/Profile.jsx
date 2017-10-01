import React from 'react'

import Center from '../Center'

import { Grid, Row, Col,
         Panel,
         Button,
         Nav, NavItem,
} from 'react-bootstrap'

import { connect } from 'react-redux'

import { citiesIndex, profileAction } from '../../actions'

import TgmApi from './TgmApi'

import { Link } from 'react-router'

import { MyReports } from '../Profile'

/**
 * Galleries
 */
class MyGalleries extends React.Component {
  render () {
    return(
      <div>
        <Center><h1>Galleries</h1></Center>
      </div>)
  }
}

/**
 * Profile
 */
class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { profile: {},
                   cities: [],
                   activeKey: 'galleries',
                   menuContent: <MyGalleries />,
                   my: {
                     galleries: [],
                     reports: [],
                     videos: [],
                   },
    }
  }

  componentDidMount(nextProps) {
    console.log("+++ +++ profile nextProps:", nextProps)
  }

  componentWillReceiveProps(nextProps) {
    console.log('+++ +++ profile will receive props:', nextProps)
    this.setState(Object.assign({}, this.state, { profile: nextProps.profile }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(TgmApi.updateProfile, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        user_profile: this.state.profile,
        accessToken:  this.state.profile.accessToken,
      })
    }).then(r => r.json()).then(_data => {
      console.log('+++ +++ updated profile:', _data)
    })
  }

  handleCityChange  = (e) => { this.state.profile.current_city_id = e.target.value }
  handleAboutChange = (e) => { this.state.profile.about           = e.target.value }

  handleSelect = (e) => {
    switch (e) {
      case "reports":
        break
      case "galleries":
        break
      default:
        console.log('+++ +++ handleSelect - this should not happen!', e)
    }
    this.setState(Object.assign({}, this.state, { activeKey: e }))
  }

  render() {
    console.log("+++ +++ Profile render props:", this.props)
    console.log("+++ +++ Profile render state:", this.state)

    let menuContent = null
    switch (this.state.activeKey) {
      case 'galleries':
        menuContent = <MyGalleries />
        break
      case 'reports':
        menuContent = <MyReports />
        break
      default:
        console.log('+++ +++ this 234 should never happen')
    }

    let citiesOptions = []
    if (Object.keys(this.props.cities).length > 0) {
      this.props.cities.forEach((city, idx) => {
        citiesOptions.push(<option key={idx} value={city.id} >{ city.name }</option>)
      })
    }

    return (
      <Grid>
        <Row>

          <Col xs={12} md={6} mdOffset={3} xsOffset={0} lg={6} lgOffset={0}>
            <Panel>
              <Center><h1>My Profile</h1></Center>
              <form onSubmit={this.handleSubmit}>
                <Row>
                  <Col xs={3}>
                    <img src={`//graph.facebook.com/${this.props.profile.id}/picture`} alt='' />
                  </Col>
                  <Col xs={9}>
                    { this.state.profile.name }
                    <br />
                    { this.state.profile.email }
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <b>About me:</b><br />
                    <textarea style={{ width: '100%'}} rows="4" value={this.state.profile.about} 
                              onChange={this.handleAboutChange} />
                  </Col>
                  <Col xs={12}>
                    <b>Current City:</b><br />
                    <select value={this.state.profile.current_city_id} onChange={this.handleCityChange} >
                      <option selected={!this.state.profile.current_city_id} disabled>Choose City...</option>
                      { citiesOptions }
                    </select>
                  </Col>
                  <Col xs={3} xsOffset={9} >
                    <Button bsStyle="primary" type="submit" value="Submit" >Submit</Button>
                  </Col>
                </Row>
              </form>
            </Panel>
          </Col>

          <Col xs={12} md={6} mdOffset={3} xsOffset={0} lg={6} lgOffset={0}>
            <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
              <NavItem eventKey="reports">Reports</NavItem>
              <NavItem eventKey="galleries">Galleries</NavItem>
              <NavItem eventKey="videos">Videos</NavItem>
            </Nav>
            <Panel style={{ borderTop: 'none' }} >
              { menuContent }
            </Panel>
          </Col>

        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    profile: state.profile,
    cities:  state.cities,
  }
}

export default connect(mapStateToProps)(Profile)

