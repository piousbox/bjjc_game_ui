import React from 'react'

import { Grid, Row, Col,
         Panel,
} from 'react-bootstrap'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { categoriesIndex } from '../../actions'

import Center from '../Center'
import Debug from '../Debug'
import { Clearfix, BjjcRouter, BjjcBreadcrumbs,
} from '../App'


import styles from './_Categories.scss'
import CategoriesShowView from './CategoriesShowView'

import VideosIndex from '../Videos/VideosIndex'

class CategoriesIndex extends React.Component {

  constructor(props) {
    super(props)
    this.state = { allCategories: {}, thisIndexCategory: {}, thisShowCategory: {} }
    this.props.dispatch(categoriesIndex( props.params ))
  }

  componentWillReceiveProps(nextProps) {
    let path = '/'
    if (nextProps.params.slug_0) {
      path = nextProps.params.slug_0
      if (nextProps.params.slug_1) {
        path = `${path}/${nextProps.params.slug_1}`
        if (nextProps.params.slug_2) {
          path = `${path}/${nextProps.params.slug_2}`
          if (nextProps.params.slug_3) {
            path = `${path}/${nextProps.params.slug_3}`
            if (nextProps.params.slug_4) {
              path = `${path}/${nextProps.params.slug_4}`
              if (nextProps.params.slug_5) {
                path = `${path}/${nextProps.params.slug_5}`
                if (nextProps.params.slug_6) {
                  path = `${path}/${nextProps.params.slug_6}`
                }
              }
            }
          }
        }
      }
    }

    if (this.props.allCategories && this.props.allCategories[path]) {
      this.setState(Object.assign({}, this.state, { thisIndexCategory: this.props.allCategories[path] }))
    } else if (nextProps.allCategories && nextProps.allCategories[path]) {
      this.setState(Object.assign({}, this.state, { thisIndexCategory: nextProps.allCategories[path] }))
    } else {
      this.props.dispatch(categoriesIndex( this.props.params ))
    }
  }

  render () {
    console.log('+++ +++ categoriesIndex render:', this.props, this.state)

    let categories = []
    let parentIdx = 0
    if (this.state.thisIndexCategory.categories && this.state.thisIndexCategory.categories.length > 0) {
      this.state.thisIndexCategory.categories.forEach((item, idx) => {
        let childrenCategories = []
        item.categories.forEach((child, idx_2) => {
          childrenCategories.push(
            <Col key={idx_2} xs={4}>
              <CategoriesShowView child={ child } />
            </Col>
          )
          if ((idx_2 + 1) % 3 === 0) {
            childrenCategories.push(<Clearfix />)
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
      <Grid>
        <Row>
          <Col sm={12}>
            <Center><h3>{ this.state.thisIndexCategory.title } ({this.state.thisIndexCategory.n_videos})</h3></Center>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <h3>Subcategories</h3>
            { categories }
          </Col>
          <Col sm={8}>
            <VideosIndex videos={ this.state.thisIndexCategory.videos } nVideos={ this.state.thisIndexCategory.n_videos }/>
          </Col>
        </Row>
      </Grid>
    ) 
  }
}

CategoriesIndex.propTypes = {
}

const mapStateToProps = (store, ownprops) => {
  return {
    allCategories: store.categories,
    thisCategory: store.category,
  }
}

export default connect(mapStateToProps)(CategoriesIndex)
