import React from 'react'

import Center from '../Center'

import { Link } from 'react-router'

import BjjcRouter from './BjjcRouter'

class Meta extends React.Component {

  render () {
    console.log("+++ +++ meta:", this.props)

    return (
      <div>
        {this.props.item.cityname ? <span>&nbsp;In city <Link to={BjjcRouter.cityLink(this.props.item.cityname)} >{this.props.item.cityname}</Link></span> : null}
        {this.props.item.tagname ? <span>&nbsp;Tag <Link to={BjjcRouter.tagLink(this.props.item.tagname)} >{this.props.item.tagname}</Link></span> : null}
        &nbsp;On <u>{this.props.item.created_at}</u>
        &nbsp;By <u>{this.props.item.username}</u>
      </div>
    )
  }
}

export default Meta
