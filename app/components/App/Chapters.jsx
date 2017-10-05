import React from 'react'

import { Link } from 'react-router'
import { Panel } from 'react-bootstrap'

import BjjcRouter from './BjjcRouter'

class Chapters extends React.Component {
  render () {
    let chapters = this.props.chapters.map(i => {
      return (
        <Panel>
          <h3>{ i.title }</h3>
          <Link to={BjjcRouter.chapterLink(i.slug)}>{i.title}</Link>
        </Panel>)
    })
    return(
      <div>
        <ul>
          { chapters }
        </ul>
      </div>)
  }
}

export default Chapters
