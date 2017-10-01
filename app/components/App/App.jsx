import React    from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, Redirect,
         IndexRoute
} from 'react-router'
import { Provider, connect } from 'react-redux'
import 'whatwg-fetch'

import config     from 'config'
import PropTypes from 'prop-types'

import styles     from './_App.scss'
import bg         from './images/noisy_grid.png'
import store      from '../../stores'

import Home from './Home'

import MainNavigation from './MainNavigation'
import Profile from './Profile'
import TgmRouter from './TgmRouter'

import { 
  CitiesIndex, CitiesShow, Cities2Show, CitiesWrapper,
} from '../Cities'
import { EventsShow } from '../Events'
import { 
  GalleriesIndex, GalleriesShow, GalleriesPhotoShow, 
} from '../Galleries'
import { ReportsIndex, ReportsShow } from '../Reports'
import { TagsShow } from '../Tags/TagsShow'
import { VenuesShow } from '../Venues'
import VideosShow from '../Videos/VideosShow'
import Location from '../Locations/LocationShow'

import Tgm2     from './Tgm2'
import Tgm2Home from './Tgm2Home'

import { citiesIndex, profileAction } from '../../actions'

const routes = [
  { path: TgmRouter.tgm2Path,
    component: Tgm2,
    indexRoute: { component: Tgm2Home },
    childRoutes: [
      { path: TgmRouter.locationPath, component: Location },
      // { path: '/tgm2/cities/:cityname',               component: Cities2Show },
      // { path: '/tgm2/cities/:cityname/tags/:tagname', component: TagsShow },
    ],
  },
  { path: '/',
    component: MainNavigation,
    indexRoute: { component: Home },
    childRoutes: [
      { path: TgmRouter.videosShowPath, component: VideosShow },
    ],
  },
  { path: '/categories',
    component: MainNavigation,
    indexRoute: { component: Home },
    childRoutes: [
      { path: '/:slug_0', component: CategoriesIndex,
        // indexRoute: { component: CategoriesIndex },
        childRoutes: [
          { path: '/:slug_0/:slug_1', component: CategoriesIndex },
        ],
      },
    ],
  },
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
        <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)} >
        </Router>
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
  }
}

export default connect(mapStateToProps)(App)

