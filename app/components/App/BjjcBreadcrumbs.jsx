import React from 'react'
import { Link } from 'react-router'

import TgmRouter from './TgmRouter'

class BjjcBreadcrumbs extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
  }

  render () {
    let links = []

    if (this.props.path.slug_0) {
      let e_0 = this.props.path.slug_0
      links.push(<span key={0} >&nbsp;&gt;&nbsp;</span>)
      links.push(<Link key={1} to={ TgmRouter.categoryLink({ path: e_0 }) }>{ this.props.path.slug_0 }</Link>)
      if (this.props.path.slug_1) {
        let e_1 = `${e_0}/${this.props.path.slug_1}`
        links.push(<span key={2} >&nbsp;&gt;&nbsp;</span>)
        links.push(<Link key={3} to={ TgmRouter.categoryLink({ path: e_1 }) }>{ this.props.path.slug_1 }</Link>)
        if (this.props.path.slug_2) {
          let e_2 = `${e_1}/${this.props.path.slug_2}`
          links.push(<span key={4}>&nbsp;&gt;&nbsp;</span>)
          links.push(<Link key={5} to={ TgmRouter.categoryLink({ path: e_2 }) }>{ this.props.path.slug_2 }</Link>)
          if (this.props.path.slug_3) {
            let e_3 = `${e_2}/${this.props.path.slug_3}`
            links.push(<span key={6}>&nbsp;&gt;&nbsp;</span>)
            links.push(<Link key={7} to={ TgmRouter.categoryLink({ path: e_3 }) }>{ this.props.path.slug_3 }</Link>)
            if (this.props.path.slug_4) {
              let e_4 = `${e_3}/${this.props.path.slug_4}`
              links.push(<span key={8}>&nbsp;&gt;&nbsp;</span>) 
              links.push(<Link key={9} to={ TgmRouter.categoryLink({ path: e_4 }) }>{ this.props.path.slug_4 }</Link>)
              if (this.props.path.slug_5) {
                let e_5 = `${e_4}/${this.props.path.slug_5}`
                links.push(<span key={10}>&nbsp;&gt;&nbsp;</span>)
                links.push(<Link key={11} to={ TgmRouter.categoryLink({ path: e_5 }) }>{ this.props.path.slug_5 }</Link>)
              }
            }
          }
        }
      }
    }

    return (
      <div>
        <Link to={ TgmRouter.categoryLink({path: ''})}><i className="fa fa-2x fa-home" /></Link>
        { links }
      </div>
    )
  }
}

export default BjjcBreadcrumbs
