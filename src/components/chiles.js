'use strict'
import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import Chile from './chile'
import Heart from './heart'

export default class Chiles extends React.Component {
    constructor() {
        super();
        this.state = {
            color: '',
            showModal: false
        };
    }

    close() {
        this.setState({
            color: '',
            showModal: false
        });
    }

    handleClickChile(color) {
        this.open(color);
    }

    open(color) {
        this.setState({
            color: color,
            showModal: true
        });
    }

    render() {
        // const confirmPane = (<div style="position: absolute; height: 100px; width: 100px")> no no no </div>);
        let ModalHeart = React.createClass({
            render: function() {
                return (
                    <div className="modal" style={{ display: 'block' }}>
                        <div className="row vertical-align" style={{ height: '100%' }}>
                            <div className="col-xs-10 col-xs-offset-1">
                                <Heart chileColor={this.state.color} close={this.close.bind(this)}></Heart>
                            </div>
                        </div>
                    </div>
                );
            }.bind(this)
        });
        return (
            <div className="row chile-types">

                <Modal show={this.state.showModal} onHide={this.close.bind(this)} dialogComponent={ModalHeart}>
                </Modal>

                <div id="chile-col-red" className="col-xs-12 col-sm-6 chile-col">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-10 z-up">
                        <Chile color="red" flipY onClick={() => { this.handleClickChile.call(this, "red") }.bind(this) } />
                    </div>
                    <div className="col-xs-1"></div>
                </div>

                <div id="chile-col-green" className="col-xs-12 col-sm-6 chile-col">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-10 z-up">
                        <Chile color="green" onClick={() => { this.handleClickChile.call(this, "green") }.bind(this) } />
                    </div>
                    <div className="col-xs-1"></div>
                </div>
            </div>
        )
    }
}
