import React from 'react'

import { Link } from 'react-router'

import BjjcRouter      from './BjjcRouter'
import BjjcBreadcrumbs from './BjjcBreadcrumbs'

class Headers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render () {
    return(
      <div>
        <div className="header header-slim">
          <a href="#">T.G.M</a>
        </div>
        <ul className="header" >
          <li><a href="#">Cities</a></li>
          <li><a href="#">Tags</a></li>
          <li><a href="#">News</a></li>
          <li><a href="#">Profile</a></li>
        </ul>
        <div className="header-2"  >
          <BjjcBreadcrumbs />
        </div>
      </div>
    )
  }
}

Headers.propTypes = {
}

const mapStateToProps = (store, ownprops) => {
  return {
    breadcrumbs: store.breadcrumbs,
  }
}

export default Headers
