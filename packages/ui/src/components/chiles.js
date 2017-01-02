import React from 'react'
import { Modal } from 'react-bootstrap'
import Chile from './chile'
import ModalHeart from './ModalHeart'

export default class Chiles extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: '',
      showModal: false
    }
    this.close = this.close.bind(this)
    this.handleClickChile = this.handleClickChile.bind(this)
  }

  close () {
    const newState = Object.assign({}, this.state, { color: '', showModal: false })
    this.setState(newState)
  }

  handleClickChile (color) {
    this.open(color)
  }

  open (color) {
    this.setState({
      color: color,
      showModal: true
    })
  }

  render () {
    // const confirmPane = (<div style="position: absolute; height: 100px; width: 100px")> no no no </div>);
    const { showModal } = this.state
    let modal =  null
    if (showModal) {
      modal = (
        <Modal show={this.state.showModal} onHide={this.close} bsClass=''>
          <Modal.Body>
            <ModalHeart color={this.state.color} close={this.close} />
          </Modal.Body>
        </Modal>
      )
    }
    return (
      <div className='chile-types'>
        {modal}
        <div id='chile-col-red' className='col-xs-12 col-sm-6 chile-col'>
          <div className='col-xs-1' />
          <div className='col-xs-10 z-up'>
            <Chile color='red' flipY onClick={() => this.handleClickChile('red')} />
          </div>
          <div className='col-xs-1' />
        </div>
        <div id='chile-col-green' className='col-xs-12 col-sm-6 chile-col'>
          <div className='col-xs-1' />
          <div className='col-xs-10 z-up'>
            <Chile color='green' onClick={() => this.handleClickChile('green')} />
          </div>
          <div className='col-xs-1' />
        </div>
      </div>
    )
  }
}
