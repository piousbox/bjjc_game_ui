import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { Grid, Row, Col,
         Nav, NavItem,
         Panel,
         Button,
} from 'react-bootstrap'

import scrollToElement from 'scroll-to-element'

import styles         from './_Cities.scss'
import CitiesShowMap  from './CitiesShowMap'

import { citiesShow } from '../../actions'

import Newsitems      from '../App/Newsitems'
import Leaderboard    from '../App/Leaderboard'

import VideoPreview   from '../Videos/VideoPreview'

import LargeSquare    from '../App/LargeSquare'

class Cities2Show extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      city: {
        name: props.params.cityname,
      }
    }
    this.props.dispatch(citiesShow({ cityname: props.params.cityname }))
  }

  componentDidMount() {
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, this.state, {city: nextProps.city}))
  }

  showPeople = () => {
    this.setState(Object.assign({}, this.state, { users: this.props.city.users }))
  }

  handleSelect = (e) => {
    console.log("+++ +++ handleSelect:", e)

    switch (e) {
      case 'cityNews':
        scrollToElement(`#${e}`)
        break
    }
  }
  
  render () {
    // console.log('+++ +++ cities2Show props:', this.props)

    let nEvents = this.props.city.n_events
    let events = []
    if (this.state.city.events) {
      this.state.city.events.forEach((n, idx) => {
        events.push(<li key={idx}><Link to={`/en/events/show/${n.slug}`}>{n.name}</Link></li>)
      })
    }

    let nVenues = this.props.city.n_venues
    let venues = []
    if (this.state.city.venues) {
      this.state.city.venues.forEach((n, idx) => {
        venues.push(
          <li key={idx}>
            <Link to={`/en/cities/travel-to/${this.state.city.cityname}/venues/show/${n.name_seo}`}>{n.name}</Link>
            <div dangerouslySetInnerHTML={{ __html: n.description }} />
          </li>
        )
      })
    }

    return (
      <Newsitems newsitems={ this.props.city.newsitems } />
    )
  }
}

Cities2Show.propTypes = {
}

const mapStateToProps = (state, ownProps) => {
  return {
    city: state.city,
    // galleries: state.galleries, // Let's have galleries inside the city for now.
  }
}

export default connect(mapStateToProps)(Cities2Show)

