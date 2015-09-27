import React from 'react'
import Header from './header'
import Chiles from './chiles'
import app from 'ampersand-app'
import NotificationSystem from 'react-notification-system'
import Zia from './zia'
import ModalStats from './modal-stats'
import assign from 'lodash.assign'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        window.notificationSystem = this.refs.notificationSystem;
    }
    setStatsUp(up) {
        let nstate = {};
        assign(nstate, this.state, {statsUp: up});
        this.setState(nstate);
    }
    render() {
        let modal = (<span id="stats-placeholder"></span>);
        if (this.state.statsUp) {
            modal = <ModalStats setStatsUp={this.setStatsUp.bind(this)} />
        }
        return (
            <div className="vbox viewport">
                <NotificationSystem ref="notificationSystem" />
                <header>
                    <Header />
                </header>
                <section className="hbox space-between">
                    <Chiles />
                </section>
                <footer>
                    <div>
                        <Zia setStatsUp={this.setStatsUp.bind(this)} />
                    </div>
                    <small>made with love by <a href="https://github.com/cdaringe/" target="_blank">cdaringe</a></small>
                </footer>
                {modal}
            </div>
        )
    }
}

app.votePort = 8081;

window.dummyFetch = function() {
    return fetch({method: 'post', url: 'http://localhost:' + app.votePort})
    .then(function() { console.log(arguments); })
    .catch(function() { console.log(arguments); });
}
