'use strict'
import React from 'react'
export default class Header extends React.Component {
    render() {
        return (
            <div id="rog_banner" className="banner">
                <div id="rog_title">
                    <span className="title title-red">Red</span>
                    <span id="or" className="title">or</span>
                    <span className="title title-green">Green</span>
                </div>
            </div>
        )
    }
}
