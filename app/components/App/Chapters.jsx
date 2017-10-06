import React from 'react'

import { Link } from 'react-router'
import { Panel } from 'react-bootstrap'

import BjjcRouter from './BjjcRouter'

class Chapters extends React.Component {
  render () {
    let idx = 0
    let chapters = this.props.chapters.map(i => {
      return (
        <Panel key={idx++} >
          <h3>{ i.title }</h3>
          <Link to={BjjcRouter.chapterLink(i.slug)}>{i.title}</Link>
        </Panel>)
    })
    return(
      <div>
        { chapters }
      </div>)
  }
}

export default Chapters
