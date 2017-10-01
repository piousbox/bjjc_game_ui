import React from 'react'
import { Grid, Col, Row } from 'react-bootstrap'

import Center from '../Center'

import BjjcRouter from '../App/BjjcRouter'

import { Link } from 'react-router'

import { Panel } from 'react-bootstrap'

import LargeSquare from '../App/LargeSquare'

class VideosIndex extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    let videos = []
    let videosCount = this.props.nVideos

    let idx = 0
    if (this.props.videos) {
      this.props.videos.forEach((video, _) => {
        videos.push(
          <Panel key={idx++} >
            <h2><Link to={ BjjcRouter.videosShowLink( video ) }>{ video.title }</Link></h2>
            <iframe width="420" height="315" src={`https://www.youtube.com/embed/${video.youtube_id}`}></iframe>
            <div dangerouslySetInnerHTML={{ __html: video.descr }} />
          </Panel>
        )
        if (idx === 1) {
          videos.push(<LargeSquare key={idx++} />)
          videos.push(<hr key={idx++} />)
        }
      })
    }

    return (
      <div>
        <Row>
          <Col sm={12}>
            { /* <Center>videos ({videosCount})</Center> */ }
            { videos }
          </Col>
        </Row>
      </div>
    )
  }
}

export default VideosIndex
