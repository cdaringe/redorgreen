import React from 'react'

export default class VotePoem extends React.Component {
  render () {
    if (this.props.color === 'red') {
      return (
        <div>
          <div className='vote-poem'>
            <span>Chile is red,</span>
            <span>A simple truth,</span>
            <span>You suggest green?</span>
            <span>How dare you!</span>
          </div>
          <div className='btn btn-danger vote-btn' onClick={this.props.chooseColor}>Vote for RED</div>
        </div>
            )
    }
    return (
      <div className='vote-poem'>
        <span>Green for good,</span>
        <span>Red for dead,</span>
        <span>No other option,</span>
        <span>The truth has been said!</span>
        <div className='btn btn-success vote-btn' onClick={this.props.chooseColor}>Vote for GREEN</div>
      </div>
        )
  }
};
