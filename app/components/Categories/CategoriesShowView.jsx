import React       from 'react'
import ReactDOM    from 'react-dom'
import { Grid, Row, Col,
} from 'react-bootstrap'
import { Link }    from 'react-router'
import { connect } from 'react-redux'

import { categoriesAction, 
         videosAction, 
} from '../../actions'

import Center from '../Center'
import Debug from '../Debug'
import BjjcRouter from '../App/BjjcRouter'

class CategoriesShowView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { category: props.child }
    this.expandInline = this.expandInline.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.state = { category: nextProps.child }
  }

  expandInline (which) {
    this.props.dispatch(categoriesAction(this.props.params, this.state.category))
  }

  render () {
    // console.log('+++ +++ CategoriesShowView render:', this.props, this.state)

    let link = null
    if (this.state.category.kind === 'thumb') {
      // expand inline
      link = (<span style={{cursor:'pointer'}}
                    onClick={() => {this.expandInline(this.state.category)}}
              >{ this.state.category.title }</span>)
    } else {
      link = (<Link to={ BjjcRouter.categoryLink(this.state.category) }>{ this.state.category.title }</Link>)
    }

    let inlineCategories = []
    if (this.props.inlinedCategory.id === this.state.category.id) {
      let idx = 0
      this.props.inlineCategories.map((category) => {
        let catChildren = []
        category.categories.map((c1) => {
          catChildren.push(<li key={idx++}><span style={{cursor:'pointer'}} onClick={() => {this.props.dispatch(videosAction(c1))}}>{c1.title}</span></li>)
        })
        inlineCategories.push(
          <div key={idx++} >
            <b>{category.title}</b>
            <ul>{catChildren}</ul>
          </div>)
      })
    }

    return (
      <div>
        <img style={{ width: '100%' }} src={ this.state.category.photo_url } alt='' />
        <br />        
        { link }
        { inlineCategories }
      </div>
    ) 
  }
}

CategoriesShowView.propTypes = {
}

const mapStateToProps = (state, ownprops) => {
  return {
    category: state.category,
    inlinedCategory: state.inlinedCategory,
    inlineCategories: state.inlineCategories,
  }
}

export default connect(mapStateToProps)(CategoriesShowView)
