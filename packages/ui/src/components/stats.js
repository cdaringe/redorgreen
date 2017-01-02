import React from 'react'
import {Button} from 'react-bootstrap'
import axios from 'axios'
import url from 'url'
import randomColor from 'randomcolor'
const DoughnutChart = require('react-chartjs').Doughnut

export default class ModalStats extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    return axios({
      method: 'get',
      url: url.format({
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        port: window.parseInt(window.location.port, 10) === 3000 ? 8081 : window.location.port,
        pathname: 'stats'
      })
    })
    .then(r => this.setState({ votes: r.data }))
    .catch(err => {
      if (err) {
        window.notificationSystem.addNotification({
          message: 'Sorry, we\'ve experienced an error. Report it, please! :/',
          level: 'error',
          autoDismiss: 10
        })
      }
    })
  }
  render () {
    let statusBody
    let chartOptions = {}
    let chileData = []
    let locationData = []
    let location
    let locationCount
    if (this.state.votes) {
      chileData = chileData.concat([
        {
          value: this.state.votes.red,
          color: '#F7464A',
          highlight: '#FF5A5E',
          label: 'Red'
        },
        {
          value: this.state.votes.green,
          color: 'green',
          highlight: '#57A431',
          label: 'Green'
        }
      ])
      for (location in this.state.votes.locationCount) {
        if (this.state.votes.locationCount.hasOwnProperty(location)) {
          let rando = randomColor()
          locationCount = this.state.votes.locationCount[location]
          locationData.push({
            value: locationCount,
            label: location,
            color: rando
          })
        }
      }
      statusBody = (
        <div>
          <h3>Color Votes!</h3>
          <DoughnutChart data={chileData} options={chartOptions} />
          <div>
            <span>Red: {this.state.votes.red}</span><br />
            <span>Green: {this.state.votes.green}</span>
          </div>
          <h3>Where are voters from?</h3>
          <DoughnutChart data={locationData} options={chartOptions} />
        </div>
      )
    } else {
      statusBody = 'Loading...'
    }
    return (
      <div className='container footer'>
        <h1>Chile Stats!</h1>
        {statusBody}

        <div>
          <Button onClick={() => this.props.setStatsUp(false)} bsStyle='info'>Back</Button>
        </div>
        <br />
      </div>
        )
  }
};
