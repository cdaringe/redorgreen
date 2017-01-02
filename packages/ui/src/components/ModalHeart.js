import React from 'react'
import Heart from './heart'

export default function ModalHeart (props) {
  return (
    <div className='modal' style={{ display: 'block' }}>
      <div className='vertical-align' style={{ height: '100%' }}>
        <div className='col-xs-10 col-xs-offset-1'>
          <Heart chileColor={props.color} close={props.close} />
        </div>
      </div>
    </div>
  )
}
