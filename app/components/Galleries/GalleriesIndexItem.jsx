import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { Grid, Row, Col,
         Panel, 
} from 'react-bootstrap'

import config from 'config'

import { galleriesShow } from '../../actions'

import Center      from '../Center'

import { LargeSquare, Leaderboard, TgmRouter } from '../App'

class GalleriesIndexItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      gallery: {}
    }
  }

  render () {
    let thumbs = []
    this.props.gallery.photos.forEach((photo, idx) => {
      if (idx < 9) {
        thumbs.push(<img style={{ margin: '0 1em 1em 0' }} src={photo.thumb_url} alt='' key={idx} />)
      }
    })

    return (
      <Panel>
        <h2><Link to={TgmRouter.galleryPhotoLink(this.props.gallery)} >{ this.props.gallery.name }</Link></h2>
        { this.props.gallery.subhead }
        { thumbs }
        { this.props.gallery.body }
      </Panel>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // galleries: state.galleries,
  }
}

export default connect(mapStateToProps)(GalleriesIndexItem)

