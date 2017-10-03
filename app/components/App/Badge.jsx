import React from 'react'

class Badge extends React.Component {
  constructor(props) {
    console.log('+++ +++ Badge constructor:', props)

    super(props)
  }

  render () {
    console.log('+++ +++ Badge render:', this.props, this.state)

    return (
      <div>badge</div>
    )
  }
}

export default Badge
