import React from 'react'

import { Grid, Row, Col,
         Panel,
} from 'react-bootstrap'

import { connect } from 'react-redux'
import { Link }    from 'react-router'

import BjjcRouter from './BjjcRouter'

class Features extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    // console.log('+++ +++ features props:', this.props)
    // console.log('+++ +++ features state:', this.state)

    const perRow = 4

    let features = []
    let renderedFeaturesCount = 0
    if (this.props.features) {
      this.props.features.forEach((f, idx) => {
        if (f.link_path) {
          features.push(
            <Col key={idx} xs={12/perRow} >
              <Panel>
                <h3><a href={f.link_path} >{ f.name }</a></h3>
                { f.photo_url ? <img src={f.photo_url} alt='' /> : null }
              </Panel>
            </Col>)
          renderedFeaturesCount++;
        } else if (f.reportname) {
          features.push(
            <Col key={idx} xs={12/perRow} >
              <Panel>
                <h3><Link to={BjjcRouter.reportLink(f.reportname)}  >{ f.name }</Link></h3>
                <img src={f.photo_url} alt={f.name} />
                <br />
                { f.subhead }
              </Panel>
            </Col>)
          renderedFeaturesCount++;
        } else if (f.galleryname) {
          features.push(
            <Col key={idx} xs={12/perRow} >
              <Panel>
                <h3><Link to={BjjcRouter.galleryPhotoLink(f.galleryname)}  >{ f.name }</Link></h3>
                <img src={f.photo_url} alt={f.name} />
                <br />
                { f.subhead }
              </Panel>
            </Col>)
          renderedFeaturesCount++
        }
        if (renderedFeaturesCount % perRow === 0) {
          features.push(<div key={`${idx}-a`} style={{ clear: 'both' }} />)
        }
      })
    }

    return (<Row>{ features }</Row>)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    city: state.city,
  }
}

export default connect(mapStateToProps)(Features)

      
      
