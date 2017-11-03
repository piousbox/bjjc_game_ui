import React from 'react'

import { Link } from 'react-router'
import { Panel } from 'react-bootstrap'

import BjjcRouter from './BjjcRouter'

class Chapter extends React.Component {
  render () {
    console.log('+++ +++ Chapter render:', this.props, this.state)

    let questsets = []
    if (this.props.chapter.questsets) {
      this.props.chapter.questsets.map((i, idx) => {
        questsets.push(
          <h4 key={idx} className="one-questset" >
            <div style={{ float: 'right' }}>{idx+1}</div><Link to={BjjcRouter.locationLink(i)}>{i.title}</Link>
          </h4>)
      })
    }

    return(
      <div className="main-chapter">
        <div>
          <h1>Table of Contents</h1>
          <h2>Chapters</h2>
          <h3>{ this.props.chapter.title }</h3>
          { questsets }
        </div>
      </div>)
  }
}

export default Chapter
