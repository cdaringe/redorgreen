import './chiles.css'
import React from 'react'
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
    let modal = null
    if (showModal) modal = <ModalHeart color={this.state.color} close={this.close} />
    return (
      <div id='chiles' {...this.props}>
        {modal}
        <div id='chile-col-red' className='chile-col'>
          <Chile
            color='red'
            onClick={() => this.handleClickChile('red')}
            flipY />
        </div>
        <div id='chile-col-green' className='chile-col'>
          <Chile
            color='green'
            onClick={() => this.handleClickChile('green')} />
        </div>
      </div>
    )
  }
}
