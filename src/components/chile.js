'use strict'
import React from 'react'

export default class Chile extends React.Component {
  constructor (props) {
    super()
    this.onClick = props.onClick
    this.state = {
      color: props.color === 'red' ? 'red' : 'green',
      flipY: props.hasOwnProperty('flipY')
    }
  }
  render () {
    const colorClass = this.state.color === 'red' ? 'chile-main-red' : 'chile-main-green'
    const xform = this.state.flipY ? 'translate(180,0) scale(-1, 1)' : ''
    const clickCb = this.onClick ? this.onClick : () => {}
    return (
      <svg className='xs-chile-rotate chile' viewBox='0 0 180 162' onClick={clickCb}>
        <g transform={xform}>
          <g className='chile-outline'>
            <path
              className={colorClass}
              d='M158.34,44.334c0,0,2.264,9.58,2.172,15.076s-0.265,6.14-2.352,10.067c-2.087,3.927-0.863,3.219-3.744,6.243c-2.881,3.024-2.967,3.346-9.027,7.934c-5.263,3.984-11.128,8.197-13.283,10.934c-1.57,1.995-10.764,5.398-15.427,8.635    c-4.664,3.237-15.324,12.113-19.17,14.878c-3.847,2.767-23.201,9.313-27.715,13.279c-4.514,3.967-11.241,9.757-15.261,13.166c-4.02,3.41-19.446,12.044-24.173,14.229c-4.727,2.186-25.356-1.961-26.771-4.411c-1.414-2.449-2.007-5.287,1.294-4.829    c2.662,0.367,3.737-1.069,7.153-2.225c3.415-1.155,10.638-7.503,16.658-14.518c6.021-7.015,12.99-17.57,16.86-21.71c3.871-4.14,5.894-9.119,13.03-15.144c7.136-6.025,6.429-7.25,11.586-11.044c4.841-3.561,8.597-6.323,13.197-10.613    c4.6-4.289,8.188-6.088,10.879-12.269c2.798-6.425,5.21-11.716,11.23-18.73s7.763-9.654,12.576-12.161c4.813-2.506,13.597-5.672,17.312-5.368c3.715,0.305,4.916,0.972,8.027,3.531c3.11,2.56,0.581-0.879,1.713,3.91c1.132,4.79,0.402,4.939,4.564,7.435  c4.163,2.496,8.67,3.704,8.67,3.704z' />
          </g>
          <g className='chile-outline'>
            <path
              className='chile-stem'
              d='M145.088,29.395c0,0-0.265,6.141,1.793,8.763c2.058,2.622,4.869,3.72,8.497,4.347s4.335,1.852,5.089,0.328c0.753-1.523-2.828-4.899,2.738-8.929c5.565-4.03,10.269-4.84,12.787-10.377c2.071-4.551,3.187-6.739,1.497-12.022    c-2.084-6.515-8.407-9.844-12.293-9.505c-3.886,0.338-3.243,0.511-3.502,1.477s-0.626,3.628,0.661,3.973c1.288,0.345,2.34,0.282,4.461,3.956c2.122,3.674,4.031,5.566,0.805,9.878c-3.226,4.312-4.709,5.985-10.229,7.267c-4.914,1.141-12.305,0.844-12.305,0.844z' />
          </g>
          <g className='chile-highlight'>
            <path
              className='chile-highlight-accent'
              d='M32.14,151.488c12.57-6.985,24.024-14.959,33.891-24.738' />
            <path
              className='chile-highlight-accent'
              d='M112.778,97.175c5.715-3.3,23.161-11.739,29.998-19.225' />
            <g className='chile-highlight-accent-2'>
              <path
                className='chile-reflection'
                d='M117.397,41.3c6.061-4.588,8.188-6.088,13.857-6.64l2.311,6.831c-5.991,0.465-7.302,1.495-11,4.99l-5.168-5.181z' />
            </g>
          </g>
        </g>
      </svg>
        )
  }
}
