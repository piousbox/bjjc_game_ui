import React from 'react'
import { connect } from 'react-redux'

import { Grid, Row, Col } from 'react-bootstrap'

import Newsitem from './Newsitem'
import Center from './../Center'
import styles from './_Newsitems.scss'

import { siteNewsitemsAction, siteShow } from '../../actions'

import Leaderboard from './Leaderboard'

class Newsitems extends React.Component {

  constructor(props) {
    super(props)
    this.state = { page: 1, count: null }
    this.props.dispatch(siteNewsitemsAction({ page: this.state.page }))
    this.props.dispatch(siteShow())
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, this.state, { count: nextProps.site.n_newsitems }))
  }

  gotoPage (page) {
    this.setState(Object.assign({}, this.state, { page: page }))
    this.props.dispatch(siteNewsitemsAction({ page: page }))
  }

  render() {
    // console.log('+++ +++ newsitems props:', this.props, this.state)

    let nAds = 0
    if (this.props.nAds && this.props.nAds > 0) {
      nAds = this.props.nAds
    }

    let listitems = []
    let newsitems = this.props.newsitems
    if (newsitems && newsitems.length > 0) {
      let idx = 0
      newsitems.forEach((n, _) => {
        listitems.push(
          <Newsitem key={idx++} newsitem={ n } />
        )
        
        if (Math.random() < 0.5 && nAds) {
          listitems.push(<Leaderboard key={idx++} />)
          nAds--
        }
      })
    }
    
    let pagination = []
    let pageNumber = 1
    const lambda = (pageNum, idx) => {
      pagination.push(<span key={idx} ><button onClick={() => {this.gotoPage(pageNum)}}>{pageNum}</button></span>)
    }
    if (this.props.site) {
      for (let i = 0; i < this.props.site.n_newsitems; i += 10) {
        lambda(pageNumber++, i)
      }
    }
    
    return (
      <div>
        { pagination }
        { listitems }
        { pagination }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    newsitems: state.newsitems,
    site: state.site,
  }
}

export default connect(mapStateToProps)(Newsitems)
