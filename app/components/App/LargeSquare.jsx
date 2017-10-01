import React from 'react'

import Center from '../Center'

class LargeSquare extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  // width:336px;height:280px

  render () {
    return (
      <div className='ad' >
        <ins className='adsbygoogle'
             style={{ display: 'block' }}
             data-ad-client='ca-pub-5283251584689528'
             data-ad-slot='4313128610'
             data-ad-format='auto' />
      </div>
    )
  }
}

export default LargeSquare
