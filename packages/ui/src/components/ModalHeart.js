import './ModalHeart.css'
import React from 'react'
import Heart from './heart'

export default function ModalHeart (props) {
  return (
    <div className='heart-modal'>
      <Heart chileColor={props.color} close={props.close} />
    </div>
  )
}
