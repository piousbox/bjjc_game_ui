import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { 
  Grid, Row, Col, Panel,
  Button, Modal,
} from 'react-bootstrap'

import Center from '../Center'
import BjjcRouter from '../App/BjjcRouter'

class VideosIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showModal: false }
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
  }

  componentWillReceiveProps (nextProps) {}

  close () {
    this.setState({ showModal: false })
  }

  open (which) {
    this.setState({ showModal: true, video: which })
  }

  render () {
    // console.log('+++ +++ VideosIndex render:', this.props, this.state)

    let videos = []
    this.props.videos.map((video, idx) => {
      videos.push(
        <Panel key={idx} >
          <h2><Link to={ BjjcRouter.videosShowLink( video ) }>{ video.title }</Link></h2>
          <img style={{cursor: 'pointer'}} onClick={() => {this.open(video)}} src={`https://img.youtube.com/vi/${video.youtube_id}/0.jpg`} alt='' />
          <div dangerouslySetInnerHTML={{ __html: video.descr }} />
        </Panel>
      )
    })
    
    return (
      <Grid fluid>
        <Row>
          <Col sm={12}>
            { /* this needs one more reducer: leafCategory or something */ }
            { /* <Center>{this.props.inlinedCategory.title} ({this.props.inlinedCategory.n_videos})</Center> */ } 
            { videos }
          </Col>
        </Row>
        { this.state.video && <Modal show={this.state.showModal} onHide={this.close}
                                     dialogClassName="video-modal" >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.video.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <iframe width="720" height="480" src={`https://www.youtube.com/embed/${this.state.video.youtube_id}`}
                    allowFullScreen frameBorder="0" ></iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal> }
      </Grid>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    inlinedCategory: state.inlinedCategory,
    video: state.video,
    videos: state.videos,
  }
}

export default connect(mapState)(VideosIndex)
