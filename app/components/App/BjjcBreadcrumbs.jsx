import React from 'react'
import { Link }    from 'react-router'
import { connect } from 'react-redux'

import BjjcRouter from './BjjcRouter'

class Breadcrumbs extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    console.log('+++ +++ Breadcrumbs will receive props:', this.props, nextProps)
  }

  render () {
    console.log('+++ +++ Breadcrumbs render:', this.props, this.state)

    if (!this.props.path) { return(<span />) }

    let links = []
    let key = 0
    links.push(<Link key={key++} to={ BjjcRouter.rootPath }><i className="fa fa-2x fa-home" /></Link>)
    links.push(<span key={key++} >&nbsp;&gt;&nbsp;</span>)

    if (this.props.path.locationname) {
      links.push(<span key={key++} >Locations</span>)
      links.push(<span key={key++} >&nbsp;&gt;&nbsp;</span>)
      
      links.push(<Link key={key++} to={ BjjcRouter.locationLink(this.props.path.locationname) }>{ this.props.path.locationname }</Link>)
      if (this.props.path.badgename) {
        links.push(<span key={key++} >&nbsp;&gt;&nbsp;</span>)
        links.push(<Link key={key++} to={ BjjcRouter.locationBadgeLink(this.props.path.locationname, this.props.path.badgename) }>{ this.props.path.badgename }</Link>)
      }
    }

    if (this.props.path === '/categories') {
      links.push(<Link key={key++} to={ BjjcRouter.categoryLink({path: ''})}>Categories</Link>)
    }

    if (this.props.path.slug_0) {
      links.push(<Link key={key++} to={ BjjcRouter.categoryLink({path: ''})}>Categories</Link>)
      let e_0 = this.props.path.slug_0
      links.push(<span key={key++} >&nbsp;&gt;&nbsp;</span>)
      links.push(<Link key={key++} to={ BjjcRouter.categoryLink({ path: e_0 }) }>{ this.props.path.slug_0 }</Link>)
      if (this.props.path.slug_1) {
        let e_1 = `${e_0}/${this.props.path.slug_1}`
        links.push(<span key={key++} >&nbsp;&gt;&nbsp;</span>)
        links.push(<Link key={key++} to={ BjjcRouter.categoryLink({ path: e_1 }) }>{ this.props.path.slug_1 }</Link>)
        if (this.props.path.slug_2) {
          let e_2 = `${e_1}/${this.props.path.slug_2}`
          links.push(<span key={key++}>&nbsp;&gt;&nbsp;</span>)
          links.push(<Link key={key++} to={ BjjcRouter.categoryLink({ path: e_2 }) }>{ this.props.path.slug_2 }</Link>)
          if (this.props.path.slug_3) {
            let e_3 = `${e_2}/${this.props.path.slug_3}`
            links.push(<span key={key++}>&nbsp;&gt;&nbsp;</span>)
            links.push(<Link key={key++} to={ BjjcRouter.categoryLink({ path: e_3 }) }>{ this.props.path.slug_3 }</Link>)
            if (this.props.path.slug_4) {
              let e_4 = `${e_3}/${this.props.path.slug_4}`
              links.push(<span key={key++}>&nbsp;&gt;&nbsp;</span>) 
              links.push(<Link key={key++} to={ BjjcRouter.categoryLink({ path: e_4 }) }>{ this.props.path.slug_4 }</Link>)
              if (this.props.path.slug_5) {
                let e_5 = `${e_4}/${this.props.path.slug_5}`
                links.push(<span key={key++}>&nbsp;&gt;&nbsp;</span>)
                links.push(<Link key={key++} to={ BjjcRouter.categoryLink({ path: e_5 }) }>{ this.props.path.slug_5 }</Link>)
              }
            }
          }
        }
      }
    }
    return (<div>{ links }</div>)
  }
}

Breadcrumbs.propTypes = {
}

const mapStateToProps = (store, ownprops) => {
  return {
    path: store.path,
  }
}

export default connect(mapStateToProps)(Breadcrumbs)
