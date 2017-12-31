import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { 
  Grid, Row, Col, Panel,
} from 'react-bootstrap'

import Center from '../Center'
import BjjcRouter from '../App/BjjcRouter'

class VideosIndex extends React.Component {
  constructor(props) {
    super(props)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    console.log('+++ +++ VideosIndex render:', this.props, this.state)

    let videos = []
    let videosCount = this.props.nVideos

    let idx = 0
    if (this.props.videos) {
      this.props.videos.forEach((video, _) => {
        videos.push(
          <Panel key={idx++} >
            <h2><Link to={ BjjcRouter.videosShowLink( video ) }>{ video.title }</Link></h2>
            { /* <iframe width="420" height="315" src={`https://www.youtube.com/embed/${video.youtube_id}`}></iframe> */ }
            <img src={`https://img.youtube.com/vi/${video.youtube_id}/0.jpg`} alt='' />
            <div dangerouslySetInnerHTML={{ __html: video.descr }} />
          </Panel>
        )
      })
    }

    return (
      <Grid fluid>
        <Row>
          <Col sm={12}>
            Videos Index
            { /* <Center>videos ({videosCount})</Center> */ }
            { videos }
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    videos: state.videos,
  }
}

export default connect(mapState)(VideosIndex)
