import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { Grid, Row, Col,
         Panel, 
} from 'react-bootstrap'

import config from 'config'

import { reportsShow } from '../../actions'

import Center      from '../Center'

import { LargeSquare, Leaderboard, TgmRouter } from '../App'

class ReportsIndexItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      report: {}
    }
  }

  render () {
    return (
      <Panel>
        <h2><Link to={TgmRouter.reportLink(this.props.report)} >{ this.props.report.name }</Link></h2>
        { this.props.report.subhead }
        { this.props.report.body }
      </Panel>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // reports: state.reports,
  }
}

export default connect(mapStateToProps)(ReportsIndexItem)

