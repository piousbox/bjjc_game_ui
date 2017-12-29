import React from 'react'
import { Grid, Col, Row,
         Panel,
} from 'react-bootstrap'

import Center from '../Center'

import BjjcRouter from '../App/BjjcRouter'

import { Link } from 'react-router'

import { videosShowAction } from '../../actions'

import { connect } from 'react-redux'

class VideosShow extends React.Component {

  constructor(props) {
    super(props)
    console.log("+++ +++ hello constructor with props:", props)
    this.state = { video: {} }
    this.props.dispatch(videosShowAction( this.props.params.youtubeId ))
  }

  componentWillReceiveProps (nextProps) {
    console.log("+++ +++ hello next props in VideosShow", nextProps)
    this.setState(Object.assign({}, this.state, { video: nextProps.video }))
    // this.props.dispatch(videosShowAction( this.props.params.youtubeId ))
  }

  render () {
    console.log("+++ +++ rendering videosShow, props are:", this.props)
    console.log("+++ +++ rendering videosShow, state is:", this.state.video.title)

    let title = ''
    if (this.state.video.title) {
      title = this.state.video.title
    }

    let descr = ''
    if (this.state.video.descr) {
      descr = this.state.video.descr
    }

    return (
      <Grid>
        <Row>
          <Col xs={8} xsOffset={2}>
            <Panel>
              <Center>
                <h2>{ title }</h2>
                <br /><br />
                <iframe width="420" height="315" src={`https://www.youtube.com/embed/${this.props.params.youtubeId}`}></iframe>
                <br /><br />
              </Center>
              <div dangerouslySetInnerHTML={{ __html: descr }} />
              <p>Comments?</p>
              <p>Assignments?</p>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

VideosShow.propTypes = {
}

const mapStateToProps = (stor, ownprops) => {
  return {
    video: stor.video,
  }
}

export default connect(mapStateToProps)(VideosShow)
