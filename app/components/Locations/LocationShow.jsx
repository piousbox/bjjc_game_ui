import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Draggable from 'react-draggable'

import { setLocation } from '../../actions'

import { BjjcRouter } from '../App'

class LocationShow extends React.Component {
  constructor(props) {
    super(props)

    console.log('+++ +++ LocationShow constructor:', props)

    this.state = {}
    // this.props.dispatch(setLocation(props.params.blocation.location_name))
  }

  componentWillUpdate (nextProps) {
    console.log('+++ +++ LocationShow componentWillUpdate:', nextProps)
  }

  componentWillReceiveProps (nextProps) {
    console.log('+++ +++ LocationShow will receive props:', nextProps)
  }

  render () {
    console.log("+++ +++ LocationShow render:", this.props, this.state)

    if (!this.props.location) {
      return (<span></span>)
    }

    let oWidth  = 200
    let oHeight = 200
    if (document.getElementById('leftPane')) {
      oWidth  = document.getElementById('leftPane').offsetWidth
      oHeight = document.getElementById('leftPane').offsetHeight
    }

    let badges = []
    if (this.props.location.badges) {
      this.props.location.badges.map((badge, idx) => {
        badges.push(
          <Link to={BjjcRouter.locationBadgeLink(this.props.location, badge)} key={idx} >
            <div className="badge"
                 style={{ position: 'absolute', top: badge.bg_pos_y, left: badge.bg_pos_x,
                          width: '100px',       height: '100px',     display: 'block',
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
    blocation: state.blocation,
  }
}

export default connect(mapStateToProps)(LocationShow)
