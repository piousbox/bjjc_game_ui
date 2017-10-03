import React from 'react'

class CategoriesToplevel extends React.Component {
  render () {
    console.log("+++ categoriesToplevel:", this.props, this.state)

    return (
      <div>
        categories toplevel
        <ul style={{ marginLeft: '1em' }} >
          <li><Link to="/categories/technique">BJJ Technique</Link></li>
          <li><Link to="/categories/salsa">Salsa</Link></li>
          <li><Link to="/categories/billiards">Playing Pool</Link></li>
        </ul>
      </div>
    )
  }
}

export default CategoriesToplevel
