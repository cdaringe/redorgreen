import './vote-poem.css'
import React from 'react'

export default class VotePoem extends React.Component {
  render () {
    const { color } = this.props
    let poemBlocks = null
    let voteButtonClass = null
    if (color === 'red') {
      poemBlocks = [
        <span>Chile is red,</span>,
        <span>A simple truth,</span>,
        <span>You suggest green?</span>,
        <span>How dare you!</span>
      ]
      voteButtonClass = 'btn-danger' // red
    } else {
      poemBlocks = [
        <span>Green for good,</span>,
        <span>Red for dead,</span>,
        <span>No other option,</span>,
        <span>The truth has been said!</span>
      ]
      voteButtonClass = 'btn-success' // green
    }
    return (
      <div id='vote-poem'>
        <div id='vote-poem-text'>
          {poemBlocks}
        </div>
        <button
          type='button' className={`btn vote-btn ${voteButtonClass}`}
          onClick={this.props.chooseColor}>Vote for {color.toUpperCase()}</button>
      </div>
    )
  }
}
