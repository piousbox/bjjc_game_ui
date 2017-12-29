import React from 'react'
import ReactDOM from 'react-dom'

import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'
import { connect } from 'react-redux'

// import { categoriesShow } from '../../actions'

import Center from '../Center'
import Debug from '../Debug'
import BjjcRouter from '../App/BjjcRouter'

import styles from './_Categories.scss'

class CategoriesShowView extends React.Component {

  constructor(props) {
    super(props)
    this.state = { category: props.child }
  }

  componentWillReceiveProps(nextProps) {
    this.state = { category: nextProps.child }
  }

  render () {
    // console.log('+++ +++ CategoriesShowView render:', this.props, this.state)

    return (
      <div>
        <img style={{ width: '100%' }} src={ this.state.category.photo_url } alt='' />
        <br />        
        <Link to={ BjjcRouter.categoryLink(this.state.category) }>{ this.state.category.title }</Link>
      </div>
    ) 
  }
}

CategoriesShowView.propTypes = {
}

const mapStateToProps = (state, ownprops) => {
  return {
    category: state.category,
  }
}

// export default connect(mapStateToProps)(CategoriesShow) 

export default CategoriesShowView
