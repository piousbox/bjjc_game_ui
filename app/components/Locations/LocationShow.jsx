import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Draggable from 'react-draggable'

import { setLocation } from '../../actions'

import { BjjcRouter } from '../App'

class LocationShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // this.props.dispatch(setLocation(props.params.locationname))
  }

  componentWillReceiveProps (nextProps) {
    // console.log('+++ +++ LocationShow will receive props:', nextProps)
  }

  render () {
    console.log("+++ +++ LocationShow render:", this.props, this.state)

    if (!this.props.location) {
      return (<span></span>)
    }

    let oWidth  = 200
    let oHeight = 200
    if (document.getElementById('web-design-6')) {
      oWidth  = document.getElementById('web-design-6').offsetWidth
      oHeight = document.getElementById('web-design-6').offsetHeight
    }

    let badges = []
    let badgesKey = 0
    if (this.props.location.badges) {
      this.props.location.badges.map((badge) => {
        badges.push(
          <Link to={BjjcRouter.locationBadgeLink(this.props.location, badge)} key={badgesKey++} >
            <div className="badge"
                 style={{ position: 'absolute', top: badge.bg_pos_y, left: badge.bg_pos_x,
                          width: '100px', height: '100px', display: 'block',
                          background: `url(${badge.shaded_photo})`
                 }} />
          </Link>)
      })
    }

    return(
      <div style={{ width: this.props.location.background_image_width*2 - oWidth,
                    height: this.props.location.background_image_height*2 - oHeight, 
                    position: 'relative', 
                    top: -this.props.location.background_image_height + oHeight, 
                    left: -this.props.location.background_image_width + oWidth, 
      }}>
        <Draggable bounds="parent" >
          <div id="locationMap" style={{ height: this.props.location.background_image_height,
                                         width: this.props.location.background_image_width,
                                         background: `no-repeat url(${this.props.location.background_image_path})`,
                                         position: 'relative' }}>
            { badges }
          </div>
        </Draggable>

        <div style={{ display: 'none' }}>{this.props.children}</div>
      </div>
    )
  }
}

LocationShow.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    // location: state.location,
  }
}

export default connect(mapStateToProps)(LocationShow)
