import React from 'react'
import { Link }    from 'react-router'
import { connect } from 'react-redux'

import BjjcRouter from './BjjcRouter'

class BjjcBreadcrumbs extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
  }

  render () {
    console.log('+++ +++ bjjcBreadcrumbs:', this.props, this.state)

    let links = []
    links.push(<Link key={-3} to={ BjjcRouter.rootPath }><i className="fa fa-2x fa-home" /></Link>)
    links.push(<span key={-2} >&nbsp;&gt;&nbsp;</span>)

    if (this.props.path.slug_0) {
      links.push(<Link key={-1} to={ BjjcRouter.categoryLink({path: ''})}>Categories</Link>)
      let e_0 = this.props.path.slug_0
      links.push(<span key={0} >&nbsp;&gt;&nbsp;</span>)
      links.push(<Link key={1} to={ BjjcRouter.categoryLink({ path: e_0 }) }>{ this.props.path.slug_0 }</Link>)
      if (this.props.path.slug_1) {
        let e_1 = `${e_0}/${this.props.path.slug_1}`
        links.push(<span key={2} >&nbsp;&gt;&nbsp;</span>)
        links.push(<Link key={3} to={ BjjcRouter.categoryLink({ path: e_1 }) }>{ this.props.path.slug_1 }</Link>)
        if (this.props.path.slug_2) {
          let e_2 = `${e_1}/${this.props.path.slug_2}`
          links.push(<span key={4}>&nbsp;&gt;&nbsp;</span>)
          links.push(<Link key={5} to={ BjjcRouter.categoryLink({ path: e_2 }) }>{ this.props.path.slug_2 }</Link>)
          if (this.props.path.slug_3) {
            let e_3 = `${e_2}/${this.props.path.slug_3}`
            links.push(<span key={6}>&nbsp;&gt;&nbsp;</span>)
            links.push(<Link key={7} to={ BjjcRouter.categoryLink({ path: e_3 }) }>{ this.props.path.slug_3 }</Link>)
            if (this.props.path.slug_4) {
              let e_4 = `${e_3}/${this.props.path.slug_4}`
              links.push(<span key={8}>&nbsp;&gt;&nbsp;</span>) 
              links.push(<Link key={9} to={ BjjcRouter.categoryLink({ path: e_4 }) }>{ this.props.path.slug_4 }</Link>)
              if (this.props.path.slug_5) {
                let e_5 = `${e_4}/${this.props.path.slug_5}`
                links.push(<span key={10}>&nbsp;&gt;&nbsp;</span>)
                links.push(<Link key={11} to={ BjjcRouter.categoryLink({ path: e_5 }) }>{ this.props.path.slug_5 }</Link>)
              }
            }
          }
        }
      }
    }

    return (
      <div>{ links }</div>
    )
  }
}

BjjcBreadcrumbs.propTypes = {
}

const mapStateToProps = (store, ownprops) => {
  return {
    path: store.path,
  }
}

export default connect(mapStateToProps)(BjjcBreadcrumbs)
