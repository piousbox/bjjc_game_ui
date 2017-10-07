
import React from 'react'
import { Link } from 'react-router'
import BjjcRouter from './BjjcRouter'

class TgmLink extends React.Component {
  render () {
    if (this.props.newsitem) {
      switch (this.props.newsitem.item_type) {
        case 'gallery':
          return (<Link to={ BjjcRouter.galleryPhotoLink(this.props.newsitem.galleryname) }>{ this.props.newsitem.name }</Link>)
        case 'report':
          return (<Link to={ BjjcRouter.reportLink(this.props.newsitem.reportname) }>{ this.props.newsitem.name }</Link>)
        case 'video':
          return (<Link to={ BjjcRouter.videosLink(this.props.newsitem.youtube_id) }>{ this.props.newsitem.name }</Link>)
        case 'photo':
          return (<span>{ this.props.newsitem.name }</span>)
        default:
          return (<div>info not provided</div>)
      }
    } else {
      return (
        <div>Default TgmLink - info not provided</div>
      )
    }
  }
}

export default TgmLink
