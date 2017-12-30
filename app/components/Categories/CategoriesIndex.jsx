import React from 'react'

import { Grid, Row, Col,
         Panel,
} from 'react-bootstrap'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { categoriesAction } from '../../actions'

import Center from '../Center'
import Debug from '../Debug'
import { Clearfix, BjjcRouter, BjjcBreadcrumbs,
} from '../App'

import { SET_PATH } from '../../constants'

import styles from './_Categories.scss'
import CategoriesShowView from './CategoriesShowView'

import VideosIndex from '../Videos/VideosIndex'

class CategoriesIndex extends React.Component {
  constructor(props) {
    super(props)
    console.log('+++ +++ categoriesIndex constructor:', props)

    this.state = { categories: [] }
    props.dispatch(categoriesAction( props.params ))
    // props.dispatch({ type: SET_PATH, path: props.params }) // breadcrumb?

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  compileCategoriesSlugs (params) {
    let path = []
    for (let i=0; i<8; i++) {
      if (params[`slug_${i}`]) { path.push(params[`slug_${i}`]) }
    }
    return path.join('/')
  }

  componentWillReceiveProps(nextProps) {
    console.log('+++ +++ categoriesIndex will receive props:', this.props, nextProps, this.state)

    let nextPath = this.compileCategoriesSlugs( nextProps.params )
    let path = this.compileCategoriesSlugs( this.props.params )
    console.log('next, this paths:', nextPath, path)

    if (path !== nextPath) {
      this.props.dispatch(categoriesAction( nextProps.params ))
    }
  }

  render () {
    console.log('+++ +++ categoriesIndex render:', this.props, this.state)

    let categories = []
    let parentIdx  = 0
    let tempKey    = 0
    if (this.props.categories && this.props.categories.length > 0) {
      this.props.categories.forEach((item, idx) => {
        let childrenCategories = []
        item.categories.forEach((child, idx_2) => {
          childrenCategories.push(
            <Col key={tempKey++} xs={4}>
              <CategoriesShowView child={ child } />
            </Col>
          )
          if ((idx_2 + 1) % 3 === 0) {
            childrenCategories.push(<Clearfix key={tempKey++} />)
          }
        })
        if (item.photo_url) {
          categories.push(
            <Panel key={parentIdx++} >
              <div><br /><img src={item.photo_url} alt='' /></div>
              <h3><Link to={BjjcRouter.categoryLink( item )}>{ item.title }</Link></h3>
              <Row key={idx} >
                { childrenCategories }
              </Row>
            </Panel>
          )
        } else {
          categories.push(
            <Panel key={parentIdx++} >
              <h3><Link to={BjjcRouter.categoryLink( item )}>{ item.title }</Link></h3>
              <Row key={idx} >
                { childrenCategories }
              </Row>
            </Panel>
          )
        }
      })
    } else {
      categories.push(<div key={parentIdx++} >This category does not have subcategories.</div>)
    }

    return (
      <Grid fluid>
        <Row>
          <Col sm={12}>
            <Center><h3>{ this.props.category.title } ({this.props.category.n_videos})</h3></Center>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            { categories }
          </Col>
        </Row>

        { /* <Col sm={8}><VideosIndex videos={ this.props.videos } nVideos={ this.props.category.n_videos }/></Col> */ }
      </Grid>
    ) 
  }
}

CategoriesIndex.propTypes = {
}

const mapStateToProps = (store, ownprops) => {
  return {
    categories: store.categories,
    category: store.category,
    videos: store.videos,
    video: store.video,
  }
}

export default connect(mapStateToProps)(CategoriesIndex)
