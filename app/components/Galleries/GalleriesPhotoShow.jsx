import React from 'react'
import ReactDOM from 'react-dom'

import { Grid, Row, Col,
         Panel, 
} from 'react-bootstrap'

import { connect } from 'react-redux'

import { galleriesShow } from '../../actions'

import Center from '../Center'
import TgmRouter from '../App/TgmRouter'
import { Link } from 'react-router'

import styles from './_Galleries.scss'

import Leaderboard from '../App/Leaderboard'

class GalleriesPhotoShow extends React.Component {

  constructor(props) {
    super(props)
    this.state = { gallery: {} }
    this.props.dispatch(galleriesShow({ galleryname: props.params.galleryname }))
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, this.state, {photos: nextProps.gallery.photos }))
  }

  render () {
    // console.log("+++ +++ galleriesPhotoShow props:", this.props)
    // console.log("+++ +++ galleriesPhotoShow state:", this.state)

    let largePhoto   = null
    let prev         = null
    let photoIdx     = parseInt(this.props.params.photoIdx)
    if (photoIdx !== 0) {
      let link = TgmRouter.galleryPhotoLink({galleryname: this.props.params.galleryname, photoIdx: photoIdx-1})
      prev = (<Link to={link}>previous</Link>)
    }
    let next         = null
    if (this.state.photos && photoIdx+1 !== this.state.photos.length) {
      let link = TgmRouter.galleryPhotoLink({galleryname: this.props.params.galleryname, photoIdx: photoIdx+1})
      next = (<Link to={link}>next</Link>)
    }
    let thumb_photos = []
    if (this.state.photos) {
      this.state.photos.forEach((photo, idx) => {
        thumb_photos.push(
          <Link key={idx} to={TgmRouter.galleryPhotoLink({ galleryname: this.props.params.galleryname, photoIdx: idx})} >
            <img src={photo.thumb_url} alt='' style={{ padding: '5px' }} />
          </Link>)
      })
    
      largePhoto = (<img style={{ width: '100%' }} 
                         src={this.state.photos[parseInt(this.props.params.photoIdx)].large_url} 
                         alt='' />)
    }

    
    return (
      <Grid>
        <h2><Center>{ this.props.gallery.name }</Center></h2>
        <Row>
          <Col md={9} xs={12} >
            <Center>
              { prev } | { next }
              <br /><br />
              { largePhoto }
              <br /><br />
              { prev } | { next }
            </Center>
          </Col>
          <Col md={3} xs={12} >
            { thumb_photos }
            <hr />
          </Col>
        </Row>
        <br /><br />
        <Leaderboard />
      </Grid>
    ) 
  }
}

GalleriesPhotoShow.propTypes = {
}

const mapStateToProps = (state, ownprops) => {
  return {
    gallery: state.gallery,
  }
}

export default connect(mapStateToProps)(GalleriesPhotoShow)
