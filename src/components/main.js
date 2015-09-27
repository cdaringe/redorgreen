import React from 'react'
import Header from './header'
import Chiles from './chiles'
import app from 'ampersand-app'
import NotificationSystem from 'react-notification-system'
import Zia from './zia'
import ModalStats from './modal-stats'
import assign from 'lodash.assign'

const isXsViewPort = () => Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 768;

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statsUp: false
        };
        this.handleResize = this.handleResize.bind(this)
    }
    componentWillMount() {
        window.addEventListener("resize", this.handleResize);
        this.setState({ isXsViewPort: isXsViewPort() });
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }
    componentDidMount() {
        window.notificationSystem = this.refs.notificationSystem;
    }
    handleResize() {
        this.setState({ isXsViewPort: isXsViewPort() });
    }
    setStatsUp() {
        let nstate = {};
        assign(nstate, this.state, {statsUp: !this.state.statsUp});
        this.setState(nstate);
    }
    render() {
        let modal = (<span id="stats-placeholder"></span>);
        if (this.state.statsUp) {
            modal = <ModalStats setStatsUp={this.setStatsUp.bind(this)} />
        }
        const footer = (
            <footer onClick={this.setStatsUp.bind(this)}>
                <Zia />
                <small>made with love by <a href="https://github.com/cdaringe/" target="_blank">cdaringe</a></small>
            </footer>
        );
        const xsFooter = this.state.isXsViewPort ? footer : null;
        const normalFooter = this.state.isXsViewPort ? null : footer;

        return (
            <div className={normalFooter ? "vbox viewport" : ""}>
                <div className={normalFooter ? "vbox viewport" : ""}>
                    <NotificationSystem ref="notificationSystem" />
                    <header>
                        <Header />
                    </header>
                    <section className="hbox space-between">
                        <Chiles />
                    </section>
                    {normalFooter}
                </div>
                <div>
                    {xsFooter}
                    {modal}
                </div>
            </div>
        )
    }
};
app.votePort = 8081;

window.dummyFetch = function() {
    return window.fetch({method: 'post', url: 'http://localhost:' + app.votePort})
    .then(function() { console.log(arguments); })
    .catch(function() { console.log(arguments); });
}