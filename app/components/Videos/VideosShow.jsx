import React from 'react'
import { Grid, Row, Col,
         Nav
} from 'react-bootstrap'

class VideosShow extends React.Component {
  render () {
    return (
      <Grid>
        <Row>
          <Col sm={12}>
            <iframe width="560" height="315" src={`http://www.youtube.com/embed/${this.props.params.youtube_id}`} frameBorder="0" allowFullScreen></iframe>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default VideosShow

      
