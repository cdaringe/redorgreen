import './header.css'
import React from 'react'
export default class Header extends React.Component {
  render () {
    return (
      <header {...this.props} style={{padding: '10px 0 5px 0'}}>
        <div className='flex-row-grow'>
          <span className='title title-red'>Red</span>
          <span id='or' className='title'>or</span>
          <span className='title title-green'>Green</span>
        </div>
      </header>
    )
  }
}
