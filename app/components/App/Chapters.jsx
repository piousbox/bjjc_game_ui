import React from 'react'

import { Link } from 'react-router'
import { Panel } from 'react-bootstrap'

import BjjcRouter from './BjjcRouter'

class Chapters extends React.Component {
  render () {
    let chapters = this.props.chapters.map((i, idx) => {
      return (
        <div key={idx} >
          <h3 className="one-chapter" ><div style={{ float: 'right' }}>{idx+1}</div> <Link to={BjjcRouter.chapterLink(i.slug)}>{ i.title }</Link></h3>
        </div>)
    })
    return(
      <div className="chapters">
        <h1>Table of Contents</h1>
        <h2>Chapters</h2>

        { chapters }
      </div>)
  }
}

export default Chapters
