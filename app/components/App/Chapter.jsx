import React from 'react'

import { Link } from 'react-router'
import { Panel } from 'react-bootstrap'

import BjjcRouter from './BjjcRouter'

class Chapter extends React.Component {
  render () {
    console.log('+++ +++ Chapter render:', this.props, this.state)

    let questsets = []
    let idx = 0
    if (this.props.chapter.questsets) {
      this.props.chapter.questsets.map(i => {
        questsets.push(
          <Panel key={idx++} >
            Questset <Link to={BjjcRouter.locationLink(i)}>{i.title}</Link>
          </Panel>)
      })
    }

    return(
      <div style={{ overflow: 'auto', height: '100%', paddingRight: '10px' }}>
        <div>
          <h5>{ this.props.chapter.title }</h5>
          { questsets }
        </div>
      </div>)
  }
}

export default Chapter
