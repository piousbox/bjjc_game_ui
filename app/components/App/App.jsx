import React    from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, Redirect,
         IndexRoute,
} from 'react-router'
import { Provider, connect } from 'react-redux'
import 'whatwg-fetch'

import config     from 'config'
import PropTypes from 'prop-types'

import styles     from './_App.scss'
import bg         from './images/noisy_grid.png'
import store      from '../../stores'

import Home from './Home'

import Profile from './Profile'
import BjjcRouter from './BjjcRouter'

import { CategoriesIndex,
         CategoriesToplevel,
} from '../Categories'
import Location from '../Locations/LocationShow'

import Navigation from './Navigation'

import Tgm2     from './Tgm2'
import Tgm2Home from './Tgm2Home'

import VideosShow from '../Videos/VideosShow'

import Badge from './Badge'

import { citiesIndex, 
         // profileAction,
} from '../../actions'

const routes = [
  { path: BjjcRouter.tgm2Path,
    component: Tgm2,
    indexRoute: { component: Tgm2Home },
    childRoutes: [
      { path: BjjcRouter.locationPath, component: Location, 
        childRoutes: [
          { path: BjjcRouter.locationBadgePath, component: Badge },
        ],
      },
    ],
  },
  { path: '/',
    component: Navigation,
    indexRoute: { component: Home },
    childRoutes: [
      { path: BjjcRouter.videosShowPath, component: VideosShow },
      { path: '/categories',             component: CategoriesToplevel },
      { path: '/categories/:slug_0',     component: CategoriesIndex,
        childRoutes: [
          { path: '/categories/:slug_0/:slug_1', component: CategoriesIndex,
            childRoutes: [
              { path: '/categories/:slug_0/:slug_1/:slug_2', component: CategoriesIndex,
                childRoutes: [
                  { path: '/categories/:slug_0/:slug_1/:slug_2/:slug_3', component: CategoriesIndex,
                    childRoutes: [
                      { path: '/categories/:slug_0/:slug_1/:slug_2/:slug_3/:slug_4', component: CategoriesIndex,
                        childRoutes: [
                          { path: '/categories/:slug_0/:slug_1/:slug_2/:slug_3/:slug_4/:slug_5', component: CategoriesIndex,
                            childRoutes: [
                              { path: '/categories/:slug_0/:slug_1/:slug_2/:slug_3/:slug_4/:slug_5/:slug_6', component: CategoriesIndex,
                                childRoutes: [
                                  { path: '/categories/:slug_0/:slug_1/:slug_2/:slug_3/:slug_4/:slug_5/:slug_6/:slug_7', component: CategoriesIndex, },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
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
        <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
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

