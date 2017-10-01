import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { Grid, Row, Col,
         Panel,
 } from 'react-bootstrap'

import config from 'config'
import Center from '../Center'

import { galleriesIndex } from '../../actions'

import GalleriesIndexItem from './GalleriesIndexItem'

import Leaderboard from '../App/Leaderboard'
import LargeSquare from '../App/LargeSquare'

class GalleriesIndex extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      galleries: []
    }
    this.props.dispatch(galleriesIndex({ cityname: props.params.cityname }))
  }

  componentWillReceiveProps(nextProps) {
    // console.log("+++ +++ galleriesIndex received props:", nextProps)
    this.setState(Object.assign({}, this.state, {galleries: nextProps.galleries }))
  }

  render () {
    // console.log('+++ +++ render GalleriesIndex props:', this.props)
    // console.log('+++ +++ render GalleriesIndex state:', this.state)

    let galleries = []
    if (this.state.galleries) {
      this.state.galleries.forEach((n, idx) => {
        galleries.push(<GalleriesIndexItem key={idx} gallery={n} />)
      })
    }

    return (
      <div>
        { galleries }
      </div>
    )
  }
}

GalleriesIndex.propTypes = {
}

const mapStateToProps = (state, ownProps) => {
  return {
    galleries: state.city.galleries,
  }
}

export default connect(mapStateToProps)(GalleriesIndex)

