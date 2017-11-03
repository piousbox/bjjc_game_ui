import React from 'react'
import { connect } from 'react-redux'

class Quest extends React.Component {
  constructor(props) {
    super(props)

    console.log('+++ +++ Quest constructor:', props)

    this.state = {}

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    console.log('+++ +++ Quest will receive props:', this.props, nextProps, this.state)
  }

  render () {
    console.log('+++ +++ Quest render:', this.props, this.state)
    let badge = this.props.quest || this.props.badge

    return (
      <div className="main-quest" >
        <h1>{ this.props.quest.title }</h1>
        <div dangerouslySetInnerHTML={{ __html: badge.subhead }} />
        <div dangerouslySetInnerHTML={{ __html: badge.description }} />
      </div>)
  }
}

const mapState = (state, ownProps) => {
  return {
    quest: state.quest,
  }
}

export default connect(mapState)(Quest)
