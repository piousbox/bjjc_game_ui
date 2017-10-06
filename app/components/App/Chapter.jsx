import React from 'react'

import { Link } from 'react-router'
import { Panel } from 'react-bootstrap'

import BjjcRouter from './BjjcRouter'

class Chapter extends React.Component {
  render () {
    console.log('+++ +++ Chapter render:', this.props, this.state)

    let questsets = []
    if (this.props.chapter.questset) {
      this.props.chapter.questsets.map(i => {
        questsets.push(
          <Panel>
            Questset {i.title}
          </Panel>)
      })
    }

    return(
      <div>
        <h5>{ this.props.chapter.title }</h5>
        { questsets }
      </div>)
  }
}

export default Chapter
