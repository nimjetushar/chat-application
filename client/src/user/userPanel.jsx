import './userPanel.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPanelOpen: false,
            readonlyFrom: false,
            user: {
                from: '',
                to: ''
            }
        };
        this.inputHandler = this.inputHandler.bind(this);
    }

    togglePanel() {
        this.setState({ isPanelOpen: !this.state.isPanelOpen });
    }

    inputHandler(event) {
        const { name, value } = event.target;
        const user = Object.assign({}, this.state.user, { [name]: value });
        this.setState({ user });
    }

    submit() {
        this.props.callback(this.state.user);
        this.setState({ isPanelOpen: false, readonlyFrom: true });
    }

    renderPanel() {
        if (this.state.isPanelOpen) {
            return <div className="user-details">
                <div className="input-fields">
                    <label>user name</label>
                    <input name="from" value={this.state.user.from}
                        onChange={this.inputHandler} readOnly={this.state.readonlyFrom} />
                </div>
                <div className="input-fields">
                    <label>chat with</label>
                    <input name="to" value={this.state.user.to}
                        onChange={this.inputHandler} />
                </div>
                <button onClick={this.submit.bind(this)}>Submit</button>
            </div>
        }
    }

    render() {
        return (
            <div className="user-panel-container">
                <div className="user-panel" onClick={this.togglePanel.bind(this)}>user</div>
                {this.renderPanel()}
            </div>
        );
    }
}

UserPanel.propTypes = {
    callback: PropTypes.func.isRequired
}

export default UserPanel;