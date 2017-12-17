import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Grid, Row, Col,
         Panel, 
} from 'react-bootstrap'
import { browserHistory } from 'react-router'

import config from 'config'

import arrowLeft  from './images/16x16/arrow-left.png'
import arrowRight from './images/16x16/arrow-right.png'
import arrowUp    from './images/16x16/arrow-top.png'
import arrowDown  from './images/16x16/arrow-bottom.png'

import {
  locationAction,

  setCategories,
  setChapters,
  setChapter,
  setBadge,
  setPath,
} from '../../actions'

import { CONST } from '../../constants'

import Badge            from './Badge'
import BjjcRouter       from './BjjcRouter'
import BjjcBreadcrumbs  from './BjjcBreadcrumbs'
import Chapter          from './Chapter'
import Chapters         from './Chapters'
import FbConnect        from './FbConnect'
import Headers          from './Headers'
import Quest            from './Quest' // Story

import { LocationShow } from '../Locations'
import { Tasks }        from '../Tasks'
import { Videos }       from '../Videos'

class Tgm3 extends React.Component {
  constructor(props) {
    super(props)
    console.log('+++ ++ Tgm3 constructor:', props)

    let nextState = { collapseState: 'center',
                      collapseFooter: 'up',
                      showLeft: CONST.chapters, // map
                      showRight: CONST.news,
                      leftFolds: [ {key: CONST.chapters,    readable: 'Chapters'},
                                   {key: CONST.chat,        readable: 'Chat'},
                                   {key: CONST.locationMap, readable: 'Location Map' },
                      ],
                      rightFolds: [ {key: CONST.news,         readable: 'News' },
                                    {key: CONST.locationShow, readable: 'This Location' },
                      ],
    };

    // badge
    if (props.params.badgename) {
      /* [ CONST.quest, CONST.videos, CONST.tasks ].map((elem) => {
        if (nextState.rightFolds.indexOf(elem) === -1) {
          nextState.rightFolds.push(elem)
        }
      })
      if (nextState.leftFolds.indexOf(CONST.location) === -1) {
        nextState.leftFolds.push(CONST.location)
      } */
      nextState.showLeft  = CONST.location
      nextState.showRight = CONST.quest
      props.dispatch(setBadge(props.params.badgename))
      props.dispatch(setLocation(props.params.locationname))
    }

    // location
    if (props.params.locationname) {
      // props.dispatch(setLocation(props.params.locationname)) // this should be in Location
      nextState.showLeft = CONST.locationMap
      nextState.showRight = CONST.locationShow
    }

    // chapter
    if (props.params.chaptername) {
      props.dispatch(setChapter(props.params.chaptername))
      nextState.leftFolds.push( CONST.chapter )
      nextState.showLeft = CONST.chapter
    }

    // categories
    if (props.router.location.pathname === BjjcRouter.categoriesLink()) {
      props.dispatch(setCategories([config.defaultCategory]))
      nextState.leftFolds.push({ key: CONST.categories, readable: 'Categories' })
      nextState.showLeft = CONST.categories
      nextState.rightFolds.push( CONST.videos )
      nextState.showRight = CONST.videos

    }
     
    // chapters
    props.dispatch(setChapters())

    this.state = nextState

    this.collapseLeft              = this.collapseLeft.bind(this)
    this.collapseRight             = this.collapseRight.bind(this)
    this.collapseUp                = this.collapseUp.bind(this)
    this.collapseDown              = this.collapseDown.bind(this)
    this.showLeft                  = this.showLeft.bind(this)
    this.showRight                 = this.showRight.bind(this)
    this.onWindowResize            = this.onWindowResize.bind(this)
    this.rerender                  = this.rerender.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps(this)
  }
  
  onWindowResize () {
    if (this.props.params.locationname) { this.props.dispatch(setLocation(this.props.params.locationname)) }
  }

  rerender () {
    if (this.props.params.locationname) { this.props.dispatch(setLocation(this.props.params.locationname)) }
  }

  collapseLeft () {
    if (this.state.collapseState === 'left') {
      /* nothing */
    } else if (this.state.collapseState === 'center') {
      this.setState({ collapseState: 'left' })
    } else if (this.state.collapseState === 'right') {
      this.setState({ collapseState: 'center' })
    }
    this.rerender()
  }

  collapseRight () {
    if (this.state.collapseState === 'right') {
      /* nothing */
    } else if (this.state.collapseState === 'center') {
      this.setState({ collapseState: 'right' })
    } else if (this.state.collapseState === 'left') {
      this.setState({ collapseState: 'center' })
    }
    this.rerender()
  }

  collapseUp () {
    if (this.state.collapseFooter === 'up') {
      // nothing
    } else if (this.state.collapseFooter === 'down') {
      this.setState({ collapseFooter: 'up' })
    }
    this.rerender()
  }

  collapseDown () {
    if (this.state.collapseFooter === 'down') {
      // nothing
    } else if (this.state.collapseFooter === 'up') {
      this.setState({ collapseFooter: 'down' })
    }
    this.rerender()
  }

  componentWillReceiveProps (nextProps) {
    // console.log('+++ +++ Tgm3 will receive props:', this.props, nextProps)
    
    this.props.dispatch(setPath(nextProps.props.params))
    if (nextProps.props.params.locationname && this.props.params.locationname !== nextProps.props.params.locationname) {
      this.props.dispatch(setLocation(nextProps.params.locationname))
    }
    /* if (nextProps.props.params.badgename && this.props.params.badgename !== nextProps.props.params.badgename) {
      this.props.dispatch(setBadge(nextProps.params))
    } */
  }

  componentWillUpdate (nextProps) {
    // console.log('+++ +++ Tgm3 componentWillUpdate:', this.props, nextProps, this.state)
    let nextState = { leftFolds: this.state.leftFolds, rightFolds: this.state.rightFolds }

    // badge
    if (nextProps.params.badgename && nextProps.params.badgename !== this.props.params.badgename) {
      [ CONST.quest, CONST.videos, CONST.tasks ].map((elem) => {
        if (this.state.rightFolds.indexOf(elem) === -1) {
          nextState.rightFolds.push( elem )
        }
      })
      if (this.state.leftFolds.indexOf(CONST.location) === -1) {
        nextState.leftFolds.push(CONST.location)
      }
      this.setState(Object.assign({}, nextState, {showLeft: CONST.chapter, showRight: CONST.quest }))
      this.props.dispatch(setLocation(nextProps.params.locationname))
      this.props.dispatch(setBadge(nextProps.params.badgename))

    // location
    } else if (nextProps.params.locationname && nextProps.params.locationname !== this.props.params.locationname) {
      this.props.dispatch(setLocation(nextProps.params.locationname))
      this.state.showLeft = CONST.location
      if (this.state.leftFolds.indexOf(CONST.location) === -1) {
        this.state.leftFolds.push( CONST.location )
      }

    // chapter
    } else if (nextProps.params.chaptername && nextProps.params.chaptername !== this.props.params.chaptername) {
      this.setState({ showLeft: CONST.chapter })
      this.props.dispatch(setChapter(nextProps.params.chaptername))
      if (this.state.leftFolds.indexOf(CONST.chapter) === -1) {
        this.state.leftFolds.push(CONST.chapter)
      }

    // chapters
    } else if (this.props.chapters.length === 0) {
      this.props.dispatch(setChapters())
    }  
  }
  
  componentDidMount () { window.addEventListener('resize', this.onWindowResize) }
  componentWillUnmount () { window.removeEventListener('resize', this.onWindowResize) }

  showLeft (what) {
    // console.log('+++ +++ showLeft:', what)

    this.setState({ showLeft: what })
    switch (what) {
      case 'chapters':
        browserHistory.push('/tgm3')
        // this.props.dispatch(setChapters())
        break
      default:
        // nothing
    }
  }

  showRight (what) {
    this.setState({ showRight: what })
  }

  render () {
    console.log('+++ +++ Tgm3 render:', this.props, this.state)
    
    let leftPane = (<div><Panel>default leftPane</Panel></div>)
    switch (this.state.showLeft) {
      case CONST.map: // @TODO: is this deprecated?
      case CONST.location: // @deprecated, @TODO: remove
      case CONST.locationMap:
        leftPane = (<LocationMap locationname={this.props.params.locationname} />)
        break
      case CONST.chat:
        leftPane = (<span>Show chat</span>)
        break
      case CONST.chapter:
        leftPane = (<Chapter chapter={this.props.chapter} />)
        break
      case CONST.chapters:
        leftPane = (<Chapters chapters={this.props.chapters} />)
        break
      case CONST.categories:
        leftPane = (<CategoriesIndex categiesSlugs={ this.props.location.query.categoriesSlugs.split('/') } />)
        break
      default:
        if (this.props.location) {
          leftPane = (<LocationShow location={this.props.location} />)
        }
    }

    let rightPane = (<Panel>default rightPane</Panel>)
    switch (this.state.showRight) {
      case CONST.quest:
        rightPane = (<Quest quest={this.props.quest} />)
        break
      case CONST.videos:
        rightPane = (<Videos videos={this.props.videos} />)
        break
      case CONST.tasks:
        rightPane = (<Tasks tasks={this.props.tasks} />)
        break
      case CONST.locationShow:
        // rightPane = (<Quest badge={this.props.location} />)
        rightPane = (<Quest locationname={this.props.params.locationname} />)
        break
      default:
        // nothing
    }

    let leftFolds = []
    this.state.leftFolds.map((i, idx) => {
      leftFolds.push(<li style={{ cursor: 'pointer' }} key={idx} className={this.state.showLeft === i.key ? 'active' : ''}>
              <a onClick={() => { this.showLeft(i.key) }}>{i.readable}</a></li>)
    })
      
    let rightFolds = []
    this.state.rightFolds.map((i, idx) => {
      rightFolds.push(<li key={idx} className={this.state.showRight === i.key ? 'active' : ''}><a href="javascript:;" onClick={() => { this.showRight(i.key) }}>{i.readable}</a></li>)
    })

    return(
      <div className="container">
        <Headers />
        
        <div className={ `folder folder-both folder-collapse-${this.state.collapseState} footer-${this.state.collapseFooter}` } >
          <div className="folder folder-left folder-half">
            <ul className="nav nav-tabs">
              { leftFolds }
            </ul>
            <div className="tab-wrapper">
              <div className="tab-content">
                <div className="tab-pane active" id="leftPane" style={{ overflow: 'hidden' }} >
                  { leftPane }
                </div>
              </div>
            </div>
            <div className="folder-ctrl">
              <a className='btn-left'  onClick={this.collapseLeft}  ><img src={ arrowLeft }  alt='' /></a>
              <a className="btn-right" onClick={this.collapseRight} ><img src={ arrowRight } alt='' /></a>
            </div>
          </div>
          <div className="folder folder-right folder-half">
            <ul className="nav nav-tabs">
              { rightFolds }
            </ul>
            <div className="tab-wrapper">
              <div className="tab-content" >
                <div className="tab-pane active" style={{ overflowY: 'auto', overflowX: 'hidden' }} >
                  { rightPane }
                </div>
              </div>
            </div>
          </div>
          <div className="folder-footer">
            <div className="folder-footer-ctrl">
              <a className="btn-up"   onClick={this.collapseUp}   ><img src={ arrowUp }   alt='' /></a>
              <a className="btn-down" onClick={this.collapseDown} ><img src={ arrowDown } alt='' /></a>
            </div>            
            <div className="folder-footer-content">
              <FbConnect />
            </div>
          </div>
        </div>
        { /* <div style={{ display: 'none' }}>{ this.props.children }</div> */ }
      </div>
    )
  }
}

Tgm3.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    badge: state.badge,

    categories: state.categories,
    chapter: state.chapter,
    chapters: state.chapters,

    leftPane: state.leftPane,
    // location: state.location,

    path: state.path,
    profile: state.profile,

    rightPane: state.rightPane,

    videos: state.videos,
  }
}

export default connect(mapStateToProps)(Tgm3)
