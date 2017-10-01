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
import TgmRouter      from '../App/TgmRouter'

import VideoPreview   from '../Videos/VideoPreview'

import LargeSquare    from '../App/LargeSquare'


class CitiesWrapper extends React.Component {
  constructor(props) {
    super(props)
    if (localStorage.getItem('mapToggled') === null) {
      localStorage.setItem('mapToggled', 'true')
    }
    this.state = {
      mapWrapper: localStorage.getItem('mapToggled') === 'true' ? this.mapContent() : null,
      mapToggled: localStorage.getItem('mapToggled') === 'true' ? true : false,
      city: {
        name: props.params.cityname,
      }
    }
    this.props.dispatch(citiesShow({ cityname: props.params.cityname }))
  }

  mapContent = () => {
    return ( 
      <Panel style={{ borderTop: 'none' }} >
        <Col xs={6}>
          <CitiesShowMap city={this.props.city} />
        </Col>
        <Col xs={6}>
          <LargeSquare />
          { /* <h2>Events ({nEvents})</h2><ul>{ events }</ul> */ }
          { /* <h2>Venues ({nVenues})</h2><ul>{ venues }</ul> */ }
        </Col>
      </Panel>)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, this.state, {city: nextProps.city}))
  }

  showPeople = () => {
    this.setState(Object.assign({}, this.state, { users: this.props.city.users }))
  }

  handleSelect = (e) => {
    switch (e) {
      case 'cityNews':
        scrollToElement(`#${e}`)
        break
    }
  }

  toggleMap = (e) => {
    if (this.state.mapToggled) {
      this.setState(Object.assign({}, this.state, { mapToggled: false, mapWrapper: null }))
      localStorage.setItem('mapToggled', 'false')
    } else  {
      this.setState(Object.assign({}, this.state, { mapToggled: true, mapWrapper: this.mapContent() }))
      localStorage.setItem('mapToggled', 'true')
    }
  }
  
  render () {
    // console.log('+++ +++ citiesWrapper props:', this.props)
    // console.log('+++ +++ citiesWrapper state:', this.state)

    let nEvents = this.props.city.n_events
    let events = []
    if (this.state.city.events) {
      this.state.city.events.forEach((n, idx) => {
        events.push(<li key={idx}><Link to={`/en/events/show/${n.slug}`}>{n.name}</Link></li>)
      })
    }

    let features = []
    if (this.props.city && this.props.city.features && this.props.city.features.length > 0) {
      this.props.city.features.forEach((f, idx) => {
        if (f.inner_html) {
          features.push(
            <Col xs={3} key={idx} className={ styles.featureWrapper } >
              <div dangerouslySetInnerHTML={{ __html: f.inner_html }} />
            </Col>)
        } else {
          features.push(
            <Col xs={3} key={idx} className={ styles.featureWrapper } >
              <Panel>
                { f.name }
                { f.subhead }
              </Panel>
            </Col>)
        }
      })
    }

    let nGalleries = this.props.city.n_galleries
    let galleries = []
    if (this.state.city.galleries) {
      this.state.city.galleries.forEach((n, idx) => {
        galleries.push(<li key={idx}><Link to={`/en/galleries/show/${n.galleryname}`}>{n.name}</Link></li>)
      })
    }

    let nNews = this.props.city.n_newsitems

    let nPeople = this.props.city.n_users
    let people = []
    if (this.state.users) {
      this.state.users.forEach((user, idx) => {
        people.push(<li key={idx}>{user.name}</li>)
      })
    }

    let nReports = this.props.city.n_reports
    let reports = []
    if (this.props.city.reports) {
      this.props.city.reports.forEach((n, idx) => {
        reports.push(<li key={idx} ><Link to={`/en/reports/show/${n.reportname}`}>{n.name}</Link></li>)
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
    
    let videos = []
    let nVideos = this.props.city.n_videos
    if (this.props.city && this.props.city.videos) {
      this.props.city.videos.forEach((v, idx) => {
        videos.push(<div key={idx}><VideoPreview video={v} /></div>)
      })
    }

    let activeTab = "news"
    this.props.routes.forEach((r, idx) => {
      switch (r.path) {
        case TgmRouter.cityReportsPath:
          activeTab = 'reports'
          break
        case TgmRouter.cityGalleriesPath:
          activeTab = 'galleries'
          break
      }
    })

    return (
      <Grid>
        <h1 style={{ textAlign: 'center' }} >{ this.state.city.name }</h1>

        { /* map row */ }
        <Row>
          <Col xs={12}>
            <Nav bsStyle="tabs" >
              <NavItem className="active" onClick={this.toggleMap}>{ this.state.mapToggled ? 'Collapse Map' : 'Expand Map' }</NavItem>
            </Nav>{ this.state.mapWrapper }<hr />
          </Col>
        </Row>

        <Row>{ features }</Row>

        { /* secondary navigation */ }
        <Row>
          <Col xs={12} >
            <Nav bsStyle="tabs" onSelect={this.handleSelect}>
              <li className={activeTab === 'news' ? 'active' : null} >
                <Link to={TgmRouter.cityLink(this.state.city.cityname)}>News ({nNews})</Link>
              </li>
              <li className={activeTab === 'reports' ? 'active' : null} >
                <Link to={`/en/cities/travel-to/${this.state.city.cityname}/reports`}>Reports ({nReports})</Link>
              </li>
              <li className={activeTab === 'galleries' ? 'active' : null } >
                <Link to={TgmRouter.cityGalleriesLink(this.state.city)}>Galleries ({nGalleries})</Link>
              </li>
              <li><a href="#">Videos ({nVideos})</a></li>
              <li><a href="#">Venues ({nVenues})</a></li>
              <li><a href="#">Events ({nEvents})</a></li>
              <li><a onClick={this.showPeople}>People ({nPeople})</a></li>
            </Nav>
            <Panel style={{ borderTop: 'none' }}>
              { this.props.children }
              { /* <div className="expandable"><ul>{people}</ul></div> */ }
            </Panel>
          </Col>
        </Row>

      </Grid>
    )
  }
}

CitiesWrapper.propTypes = {
}

const mapStateToProps = (state, ownProps) => {
  return {
    city: state.city,
    // galleries: state.galleries, // Let's have galleries inside the city for now.
  }
}

export default connect(mapStateToProps)(CitiesWrapper)

