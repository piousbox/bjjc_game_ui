import React from 'react'
import { connect } from 'react-redux'

class Story extends React.Component {
  constructor(props) {
    super(props)

    console.log('+++ +++ Story constructor:', props)

    this.state = {}

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    console.log('+++ +++ Story will receive props:', this.props, nextProps, this.state)
  }

  render () {
    console.log('+++ +++ Story render:', this.props, this.state)
    return (
      <div>
        <h1>this.props.story.title</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.story.subhead }} />
        <hr />
        <div dangerouslySetInnerHTML={{ __html: this.props.story.description }} />
      </div>)
  }
}

const mapState = (state, ownProps) => {
  return {
  }
}

export default connect(mapState)(Story)
