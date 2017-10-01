import React from 'react'

class Meta extends React.Component {
  render () {
    let items = []

    if (this.props.item && this.props.item.tag) {
      items.push(<span key='tag' >Tag: {this.props.item.tag} &nbsp; </span>)
    }
    if (this.props.item && this.props.item.tag_name) {
      items.push(<span key='tag' >Tag: {this.props.item.tag_name} &nbsp; </span>)
    }

    if (this.props.item.city_name) {
      items.push(<span key='city' >City: {this.props.item.city_name} &nbsp; </span>)
    }

    return (
      <div>
        { items }
      </div>
    )
  }
}

export default Meta
