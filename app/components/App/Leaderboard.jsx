import React from 'react'

import { connect } from 'react-redux'

import Center from '../Center'

import { siteShow } from '../../actions'

class Leaderboard extends React.Component {

  constructor (props) {
    super(props)
    this.props.dispatch(siteShow());
  }

  componentDidMount () {
    if (this.props.site && this.props.site.is_ads_enabled) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }

  render () {
    if (this.props.site.is_ads_enabled) {
      return (
        <Center>
          <div className='ad' >
            <ins className='adsbygoogle'
                 style={{ display: 'block' }}
                 data-ad-client='ca-pub-5283251584689528'
                 data-ad-slot='5371488374'
                 data-ad-format='auto' />
          </div>
        </Center>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    site: state.site,
  }
}

export default connect(mapStateToProps)(Leaderboard)
