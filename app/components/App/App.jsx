import React    from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, Redirect,
         IndexRoute,
} from 'react-router'
import { Provider, connect } from 'react-redux'
import 'whatwg-fetch'

import config     from 'config'
import PropTypes from 'prop-types'

import store      from '../../stores'

import styles     from './_App.scss'
import bg         from './images/noisy_grid.png'
import Home       from './Home'
import Profile    from './Profile'
import BjjcRouter from './BjjcRouter'

import { CategoriesIndex,
         CategoriesToplevel,
} from '../Categories'

import Location   from '../Locations/LocationShow'
import Navigation from './Navigation'
import Tgm3       from './Tgm3'
import VideosShow from '../Videos/VideosShow'
import Badge      from './Badge'

import { citiesIndex, 
         // profileAction,
} from '../../actions'

class RootRedirect extends React.Component {
  constructor(props) {
    super(props)
    browserHistory.push(BjjcRouter.rootPath)
  }
  render () {
    return (null)
  }
}

const routes = [
  { component: RootRedirect, path: '/' },
  { component: Tgm3, path: '/tgm3', },
  { component: Tgm3, path: '/tgm3/chapters/:chaptername', },
  { component: Tgm3, path: '/tgm3/locations/:locationname', },
  { component: Tgm3, path: '/tgm3/locations/:locationname/badges/:badgename', },
  { component: Tgm3, path: '/tgm3/badges/:badgename', },
  { component: Tgm3, path: BjjcRouter.categoriesPath, },
  { component: Tgm3, path: '/tgm3/categories/:slug_0', }, // @obsolete?
  { component: Tgm3, path: '/tgm3/categories/:slug_0/videos/page/:videos_page', },
  { component: Tgm3, path: '/tgm3/categories/:slug_0/:slug_1', },
  { component: Tgm3, path: '/tgm3/categories/:slug_0/:slug_1/videos/page/:videos_page', },
  { component: Tgm3, path: '/tgm3/categories/:slug_0/:slug_1/:slug_2', },
  { component: Tgm3, path: '/tgm3/categories/:slug_0/:slug_1/:slug_2/videos/page/:videos_page', },
  { component: Tgm3, path: '/tgm3/categories/:slug_0/:slug_1/:slug_2/:slug_3', },
  { component: Tgm3, path: '/tgm3/categories/:slug_0/:slug_1/:slug_2/:slug_3/videos/page/:videos_page', },
  { component: Tgm3, path: '/tgm3/categories/:slug_0/:slug_1/:slug_2/:slug_3/:slug_4', },
  { component: Tgm3, path: '/tgm3/categories/:slug_0/:slug_1/:slug_2/:slug_3/:slug_4/videos/page/:videos_page', },
  { component: Tgm3, path: '/tgm3/categories/:slug_0/:slug_1/:slug_2/:slug_3/:slug_4/:slug_5', },
  { component: Tgm3, path: '/tgm3/categories/:slug_0/:slug_1/:slug_2/:slug_3/:slug_4/:slug_5/videos/page/:videos_page', },
  { component: Tgm3, path: '/tgm3/categories/:slug_0/:slug_1/:slug_2/:slug_3/:slug_4/:slug_5/:slug_6', },
  { component: Tgm3, path: '/tgm3/categories/:slug_0/:slug_1/:slug_2/:slug_3/:slug_4/:slug_5/:slug_6/videos/page/:videos_page', },
  { component: Tgm3, path: '/tgm3/categories/:slug_0/:slug_1/:slug_2/:slug_3/:slug_4/:slug_5/:slug_6/:slug_7', },
  { component: Tgm3, path: '/tgm3/categories/:slug_0/:slug_1/:slug_2/:slug_3/:slug_4/:slug_5/:slug_6/:slug_7/videos/page/:videos_page', },

]

class App extends React.Component {

  constructor(props) {
    super(props)
    // this.props.dispatch(citiesIndex())
    // this.props.dispatch(profileAction())
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange = () => {
  }

  render() {
    // console.log('+++ +++ App props:', this.props, this.state)

    return (
      <Provider store={store} >
        <Router history={browserHistory} routes={routes} onUpdate={(e) => { window.scrollTo(0, 0) }} />
      </Provider>
    );
  }
}

App.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    cities: state.cities,
    profile: state.profile,
    path: state.path,
  }
}

export default connect(mapStateToProps)(App)

