import './main.css'
import React from 'react'
import Header from './header'
import Chiles from './chiles'
import NotificationSystem from 'react-notification-system'
import Zia from './zia'
import Stats from './stats'

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      statsUp: false
    }
  }
  componentWillMount () {
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }
  componentDidMount () {
    window.notificationSystem = this.refs.notificationSystem
  }
  setStatsUp () {
    let nstate = {}
    Object.assign(nstate, this.state, {statsUp: !this.state.statsUp})
    this.setState(nstate)
  }
  render () {
    let modal = <span id='stats-placeholder' />
    if (this.state.statsUp) return <Stats setStatsUp={this.setStatsUp.bind(this)} />
    return (
      <div className='layout-column'>
        <NotificationSystem ref='notificationSystem' />
        <Header className='layout-row' />
        <Chiles className='layout-row' />
        <footer className='layout-row' onClick={this.setStatsUp.bind(this)}>
          <div className='layout-column'>
            <small>click for stats</small>
            <Zia />
            <small>made with love by <a href='https://github.com/cdaringe/' target='_blank'>cdaringe</a></small>
          </div>
        </footer>
        {modal}
      </div>
    )
  }
}
