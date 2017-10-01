import React from 'react'
import ReactDOM from 'react-dom'

import { Grid, Row, Col,
         Panel, 
} from 'react-bootstrap'

import { connect } from 'react-redux'

import { galleriesShow } from '../../actions'

import Center from '../Center'

import styles from './_Galleries.scss'

import Leaderboard from '../App/Leaderboard'

class GalleriesShow extends React.Component {

  constructor(props) {
    super(props)
    this.state = { gallery: {} }
    this.props.dispatch(galleriesShow({ galleryname: props.params.galleryname }))
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, this.state, {photos: nextProps.gallery.photos }))
  }

  render () {
    // console.log("+++ +++ galleriesShow props:", this.props)
    // console.log("+++ +++ galleriesShow state:", this.state)

    let thumb_photos = []
    if (this.state.photos) {
      this.state.photos.forEach((photo, idx) => {
        thumb_photos.push(
          <span>
            <img src={photo.thumb_url} alt='' />
          </span>)
      })
    }

    let large_photos = []
    if (this.state.photos) {
      this.state.photos.forEach((photo, idx) => {
        large_photos.push(
          <Panel>
            <div className={ styles.largePhotos }>
              <img src={photo.large_url} alt='' />
            </div>
          </Panel>)
      })
    }
    
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Leaderboard />
            <h2><Center>{ this.props.gallery.name }</Center></h2>
            { thumb_photos }
            <hr />
            <Leaderboard />
            <Center>
              { large_photos }
            </Center>
          </Col>
        </Row>
      </Grid>
    ) 
  }
}

GalleriesShow.propTypes = {
}

const mapStateToProps = (state, ownprops) => {
  return {
    gallery: state.gallery,
  }
}

export default connect(mapStateToProps)(GalleriesShow)
