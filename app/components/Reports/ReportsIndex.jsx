import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { Grid, Row, Col } from 'react-bootstrap'

import config from 'config'
import Center from '../Center'

import { reportsIndex } from '../../actions'

import ReportsIndexItem from './ReportsIndexItem'

import Leaderboard from '../App/Leaderboard'
import LargeSquare from '../App/LargeSquare'

class ReportsIndex extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      reports: []
    }
    this.props.dispatch(reportsIndex({ cityname: props.params.cityname }))
  }

  componentWillReceiveProps(nextProps) {
    // console.log("+++ +++ reportsIndex received props:", nextProps)
    this.setState(Object.assign({}, this.state, {reports: nextProps.reports }))
  }

  render () {
    // console.log('+++ +++ render ReportsIndex props:', this.props)
    // console.log('+++ +++ render ReportsIndex state:', this.state)

    let reports = []
    if (this.state.reports) {
      this.state.reports.forEach((n, idx) => {
        reports.push(<ReportsIndexItem key={idx} report={n} />)
      })
    }

    return (
      <div>
        { reports }
      </div>
    )
  }
}

ReportsIndex.propTypes = {
}

const mapStateToProps = (state, ownProps) => {
  return {
    reports: state.reports,
  }
}

export default connect(mapStateToProps)(ReportsIndex)

