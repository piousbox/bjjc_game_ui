import React from 'react'
import { connect } from 'react-redux'

import { questAction } from '../../actions'

class Quest extends React.Component {
  constructor(props) {
    super(props)
    console.log('+++ +++ Quest constructor:', props)

    this.state = {}

    props.dispatch(questAction(props.badgename))

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    console.log('+++ +++ Quest will receive props:', this.props, nextProps, this.state)
  }

  render () {
    console.log('+++ +++ Quest render:', this.props, this.state)
    if (!this.props.quest || Object.keys(this.props.quest).length === 0) { return (null) }

    return (
      <div className="main-quest" >
        <h1>{ this.props.quest.title }</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.quest.subhead }} />
        <div dangerouslySetInnerHTML={{ __html: this.props.quest.description }} />
      </div>)
  }
}

const mapState = (state, ownProps) => {
  return {
    quest: state.quest,
  }
}

export default connect(mapState)(Quest)
