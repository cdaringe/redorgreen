import React from 'react'
import Color from 'color'
import VotePoem from './vote-poem'
import axios from 'axios'
import url from 'url'
import { locations } from 'common'

export default class Heart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      vote: {}
    }
    this.chooseColor = this.chooseColor.bind(this)
    this.vote = this.vote.bind(this)
  }

  chooseColor (evt) {
    const vote = this.state.vote || {}
    vote.color = this.props.chileColor
    this.setState(Object.assign({}, this.state, vote))
  }

  getHomeForm () {
    const { chileColor } = this.props
    return (
      <div>
        <div className='vote-poem'>
          <br />
          <span>To make your vote count,</span>
          <span>tell us where "home" is</span>
        </div>
        <div className='form-group'>
          <label for='location'>{'I\'m from'}:</label>
          <select id='location' className='form-control' placeholder='Select...'>
            <option value=''>Select a location</option>
            {locations.map(loc => <option value={loc.value}>{loc.label}</option>)}
          </select>
        </div>
        <div
          className={'btn vote-btn ' + (chileColor === 'red' ? 'btn-danger' : 'btn-success')}
          onClick={this.vote}>
          {chileColor.toUpperCase()}
        </div>
      </div>
    )
  }

  vote () {
    const { close } = this.props
    const location = document.querySelector('#location').value
    const vote = this.state.vote
    vote.location = location
    this.setState(Object.assign({}, this.state, vote))
    if (!vote.location) {
      return window.notificationSystem.addNotification({
        message: 'Please pick a home location!',
        level: 'warning'
      })
    }
    return axios({
      method: 'POST',
      url: url.format({
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        port: window.parseInt(window.location.port, 10) === 3000 ? 8081 : window.location.port,
        pathname: 'vote'
      }),
      data: this.state.vote,
      withCredentials: true
    })
    .then(function (result) {
      window.notificationSystem.addNotification({
        message: 'Smart choice.  Your vote has been cast!',
        level: 'success',
        autoDismiss: 10
      })
    })
    .catch(function (err) {
      console.warn('unable to cast vote')
      let msg = null
      if (err.status === 409) { // already voted motha trucka
        msg = {
          message: 'You have already cast your vote, sorry!',
          level: 'warning'
        }
      } else {
        msg = {
          message: 'Sorry, we\'ve experienced an error. Report it, please! :/',
          level: 'error',
          autoDismiss: 10
        }
      }
      window.notificationSystem.addNotification(msg)
    })
    .then(() => close())
  }

  render () {
    const { chileColor, close } = this.props
    const outline = Color(chileColor)
    let closeVoteClasses = 'close-vote-btn'
    let voteComponent = null
    let fill = null

    if (chileColor === 'red') {
      fill = outline.clone().lighten(0.4)
      closeVoteClasses += ' close-vote-btn-red'
    } else {
      fill = outline.clone().lighten(0.8).desaturate(0.7)
      closeVoteClasses += ' close-vote-btn-green'
    }
    voteComponent = !this.state.vote.color ?
      <VotePoem color={chileColor} chooseColor={this.chooseColor} /> :
      this.getHomeForm()
    return (
      <div className='heart-container'>
        <svg viewBox='0 0 300 310' xmlns='http://www.w3.org/2000/svg'>
          <g>
            {this.props.children}
            <path
              stroke-width='3'
              stroke={outline.hexString()}
              fill={fill.hexString()}
              d='m111.72434,305.99991c-58.24056,-0.37378 -137.86056,-171.57066 -56.3975,-252.30981c81.46305,-80.73914 147.07584,59.43298 100.63085,78.49639c-46.44501,19.06342 37.22974,-170.07551 108.37166,-69.52538c71.14194,100.55016 -94.36444,243.7126 -152.605,243.33879z' stroke-linecap='null' stroke-linejoin='null' stroke-dasharray='null' />
            <path
              d='m147,266' opacity='0.5' stroke-linecap='null' stroke-linejoin='null' stroke-dasharray='null' />
          </g>
        </svg>
        <div className='heart-body'>
          <div className={closeVoteClasses} onClick={close} />
          {voteComponent}
        </div>
      </div>
    )
  }
}

Heart.propTypes = {
  close: React.PropTypes.func.isRequired,
  chileColor: React.PropTypes.string.isRequired
}
