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

import Report2 from '../Reports/Reports2Show'

import { setLocation, setBadge, setPath } from '../../actions'
import FbConnect from './FbConnect'

// import Headers from './Headers'
import BjjcRouter from './BjjcRouter'
import BjjcBreadcrumbs from './BjjcBreadcrumbs'
import Badge from './Badge'

class Tgm2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { collapseState: 'center',
                   collapseFooter: 'up',
    };

    this.collapseLeft  = this.collapseLeft.bind(this)
    this.collapseRight = this.collapseRight.bind(this)
    this.collapseUp    = this.collapseUp.bind(this)
    this.collapseDown  = this.collapseDown.bind(this)

    this.componentWillReceiveProps = this.componentWillReceiveProps(this)

    this.onWindowResize = this.onWindowResize.bind(this)
    this.rerender       = this.rerender.bind(this)
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
    console.log('+++ +++ Tgm2 will receive props:', this.props, nextProps)

    this.props.dispatch(setPath(nextProps.params))
    this.props.dispatch(setBadge(nextProps.params))
  }

  componentDidMount () { window.addEventListener('resize', this.onWindowResize) }
  componentWillUnmount () { window.removeEventListener('resize', this.onWindowResize) }

  render () {
    console.log('+++ +++ Tgm2 render:', this.props, this.state)
    
    let rightPane = (<div><Panel><h2>default rightPane</h2></Panel></div>)
    if (this.props.badge) {
      rightPane = (
        <Row>
          <Col xs={12}>
            <Badge badge={this.props.badge} />
          </Col>
        </Row>)
    }
      
    return(
      <div className="container">

        { /* <Headers /> */ }
        <div >
          <div className="header header-slim" style={{ zIndex: 2 }}>
            <Link to={BjjcRouter.rootPath} >T.G.M</Link>
          </div>
          <ul className="header" style={{ zIndex: 2 }} >
            <li><a href="#">Cities</a></li>
            <li><a href="#">Tags</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#">Profile</a></li>
          </ul>
          <div className="header-2" style={{ zIndex: 2 }} >
            <BjjcBreadcrumbs path={this.props.params} />
          </div>
        </div>

        
        <div className={ `folder folder-both folder-collapse-${this.state.collapseState} footer-${this.state.collapseFooter}` } >
          <div className="folder folder-left folder-half">
            <ul className="nav nav-tabs">
              <li className="active"><a href="#web-design-6" data-toggle="tab" aria-expanded="false">Map</a></li>
              <li className=""><a href="#graphic-design-6" data-toggle="tab" aria-expanded="false"><span className="title-head">News</span></a></li>
              <li className=""><a href="#developement-6" data-toggle="tab" aria-expanded="false"><span className="title-head">People</span></a></li>
            </ul>
            <div className="tab-wrapper">
              <div className="tab-content">
                <div className="tab-pane active" id="web-design-6">
                  { this.props.children }
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
              <li className="active"><a href="#">Tasks</a></li>
              <li className=""><a href="#graphic-design-6" data-toggle="tab" aria-expanded="false"><span className="title-head">News</span></a></li>
              <li className=""><a href="#developement-6" data-toggle="tab" aria-expanded="false"><span className="title-head">People</span></a></li>
            </ul>
            <div className="tab-wrapper">
              <div className="tab-content" style={{ overflowY: 'auto', overflowX: 'hidden' }} >
                { rightPane }
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
      </div>
    )
  }
}

Tgm2.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    badge: state.badge,
    path: state.path,

    // leftPane: state.leftPane,
    // rightPane: state.rightPane,
  }
}

export default connect(mapStateToProps)(Tgm2)
