import React from 'react'
import Color from 'color'
import {Button} from 'react-bootstrap'
import VotePoem from './vote-poem'
import axios from 'axios'
import url from 'url'
import qs from 'qs'
import locations from '../../common/locations'

export default class Heart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      vote: {}
    }
  }

  chooseColor (evt) {
    this.state.vote = this.state.vote || {}
    this.state.vote.color = this.props.chileColor
    this.setState(this.state)
  }

  vote () {
    const location = document.querySelector('#location').value
    this.state.vote.location = location
    this.setState(this.state)
    if (!this.state.vote.location || !this.state.vote.color) {
      return notificationSystem.addNotification({
        message: 'Please pick a home location!',
        level: 'warning'
      })
    }
    axios({
      method: 'POST',
      url: url.format({
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        port: window.location.port == 3000 ? 8081 : window.location.port,
        pathname: 'vote'
      }),
      data: this.state.vote,
      withCredentials: true
    }).then(function (result) {
      notificationSystem.addNotification({
        message: 'Smart choice.  Your vote has been cast!',
        level: 'success',
        autoDismiss: 10
      })
    }.bind(this)).catch(function (err) {
      if (err.status === 409) { // already voted motha trucka
        notificationSystem.addNotification({
          message: 'You have already cast your vote, sorry!',
          level: 'warning'
        })
      } else {
        notificationSystem.addNotification({
          message: 'Sorry, we\'ve experienced an error. Report it, please! :/',
          level: 'error',
          autoDismiss: 10
        })
      }
    }.bind(this)).then(function () {
      this.props.close()
    }.bind(this))
  }
  render () {
    let closeVoteClasses = 'close-vote-btn'
    let outline
    let fill
    if (!this.props.chileColor) {
      return (<div />)
    }
    outline = Color(this.props.chileColor || 'red')
    if (this.props.chileColor === 'red') {
      fill = outline.clone().lighten(0.4)
      closeVoteClasses += ' close-vote-btn-red'
    } else {
      fill = outline.clone().lighten(0.8).desaturate(0.7)
      closeVoteClasses += ' close-vote-btn-green'
    }
    let voteComponent
    if (!this.state.vote.color) {
      voteComponent = <VotePoem color={this.props.chileColor} chooseColor={this.chooseColor.bind(this)} />
    } else {
      voteComponent = (
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
              {locations.map(loc => {
                return <option value={loc.value}>{loc.label}</option>
              })}
            </select>
          </div>
          <div
            className={'btn vote-btn ' + (this.props.chileColor === 'red' ? 'btn-danger' : 'btn-success')}
            onClick={this.vote.bind(this)}>
            {this.props.chileColor.toUpperCase()}
          </div>
        </div>
            )
    }
    return (
      <div className='heart-container'>
        <svg viewBox='0 0 300 310' xmlns='http://www.w3.org/2000/svg' {...this.props} >
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
          <div className={closeVoteClasses} onClick={this.props.close} />
          {voteComponent}
        </div>
      </div>
        )
  }
}
