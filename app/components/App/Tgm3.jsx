import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Grid, Row, Col,
         Panel, 
} from 'react-bootstrap'

import arrowLeft  from './images/16x16/arrow-left.png'
import arrowRight from './images/16x16/arrow-right.png'
import arrowUp    from './images/16x16/arrow-top.png'
import arrowDown  from './images/16x16/arrow-bottom.png'

import {
  setChapters,
  setChapter,
  setBadge,
  setLocation,
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
import Story            from './Story'
import { LocationShow } from '../Locations'
import Report2          from '../Reports/Reports2Show'

class Tgm3 extends React.Component {
  constructor(props) {
    super(props)

    console.log('+++ ++ Tgm3 constructor:', props)

    this.state = { collapseState: 'center',
                   collapseFooter: 'up',
                   showLeft: CONST.chapters, // map
                   showRight: CONST.news,
                   leftFolds: [ CONST.chapters, CONST.chat ],
                   rightFolds: [ CONST.news, ], // story, tasks
    };
    
    if (props.params.badgename) {
      props.dispatch(setBadge(props.params.badgename))
    } else if (props.params.locationname) {
      props.dispatch(setLocation(props.params.locationname))
      this.state.showLeft = CONST.location
      this.state.leftFolds.push( CONST.location )
    } else if (props.params.chaptername) {
      props.dispatch(setChapter(props.params.chaptername))
      this.state.leftFolds.push( CONST.chapter )
      this.state.showLeft = CONST.chapter
    } else {
      props.dispatch(setChapters())
    }

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
    if (this.props.params.locationname) {
      this.props.dispatch(setLocation(this.props.params.locationname))
    }
  }
  rerender () {
    if (this.props.params.locationname) {
      this.props.dispatch(setLocation(this.props.params.locationname))
    }
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
    console.log('+++ +++ Tgm3 will receive props:', this.props, nextProps)
    
    this.props.dispatch(setPath(nextProps.props.params))
    if (nextProps.props.params.locationname && this.props.params.locationname !== nextProps.props.params.locationname) {
      this.props.dispatch(setLocation(nextProps.params.locationname))
    }
    /* if (nextProps.props.params.badgename && this.props.params.badgename !== nextProps.props.params.badgename) {
      this.props.dispatch(setBadge(nextProps.params))
    } */
  }

  componentWillUpdate (nextProps) {
    console.log('+++ +++ Tgm3 componentWillUpdate:', this.props, nextProps)
    
    if (nextProps.params.chaptername && nextProps.params.chaptername !== this.props.params.chaptername) {
      this.setState({ showLeft: CONST.chapter })
      props.dispatch(setChapter(nextProps.params.chaptername))
      if (this.state.leftFolds.indexOf(nextProps.params.chaptername) === -1) {
        this.state.leftFolds.push( CONST.chapter )
      }
    }
  }

  componentDidMount () { window.addEventListener('resize', this.onWindowResize) }
  componentWillUnmount () { window.removeEventListener('resize', this.onWindowResize) }

  showLeft (what) {
    console.log('+++ +++ showLeft:', what)

    this.setState({ showLeft: what })
    switch (what) {
      case 'chapters':
        this.history.pushState(null, '/tgm3')
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
      case 'map':
        if (this.props.blocation && this.props.blocation) {
          console.log('+++ rendering this blocation:', this.props.blocation)
          leftPane = (<LocationShow location={this.props.blocation} />)
        }
        break
      case 'chat':
        leftPane = (<span>Show chat</span>)
        break
      case 'chapter':
        leftPane = (<Chapter chapter={this.props.chapter} />)
        break
      case 'chapters':
        leftPane = (<Chapters chapters={this.props.chapters} />)
        break
      default:
        if (this.props.blocation && this.props.blocation) {
          console.log('+++ rendering this blocation:', this.props.blocation)
          leftPane = (<LocationShow location={this.props.blocation} />)
        }
    }

    let rightPane = (<Panel>default rightPane</Panel>)
    switch (this.state.showRight) {
      case 'story':
        rightPane = (<Story story={this.props.story} />)
        break
      case 'tasks':
        if (this.props.badge) {
          rightPane = (
            <Row>
              <Col xs={12}>
                <Badge badge={this.props.badge} />
              </Col>
            </Row>)
        }
        break
      default:
        // nothing
    }

    let leftFolds = []
    this.state.leftFolds.map((i, idx) => {
      leftFolds.push(<li key={idx} className={this.state.showLeft === i ? 'active' : ''}>
              <Link onClick={() => { this.showLeft(i) }}>{i}</Link></li>)
    })
      
    let rightFolds = []
    this.state.rightFolds.map((i, idx) => {
      rightFolds.push(<li key={idx} className={this.state.showRight === i ? 'active' : ''}><a href="javascript:;" onClick={() => { this.showRight(i) }}>{i}</a></li>)
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
                <div className="tab-pane active" id="leftPane" style={{ overflowX: 'hidden', paddingRight: '10px' }} >
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
        <div style={{ display: 'none' }}>{ this.props.children }</div>
      </div>
    )
  }
}

Tgm3.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    badge: state.badge,
    blocation: state.blocation, // b to not conflict

    chapter: state.chapter,
    chapters: state.chapters,

    leftPane: state.leftPane,
    path: state.path,
    rightPane: state.rightPane,
    story: state.story,
  }
}

export default connect(mapStateToProps)(Tgm3)
