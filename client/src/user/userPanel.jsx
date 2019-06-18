import './userPanel.scss';

import React, { Component } from 'react';

class UserPanel extends Component {

    constructor() {
        super();
        this.state = {
            isPanelOpen: false,
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

    inputHandler() {

    }

    renderPanel() {
        if (this.state.isPanelOpen) {
            return <div className="user-details">
                <div className="input-fields">
                    <label>user name</label>
                    <input name="from" value={this.state.user.from}
                        onChange={this.inputHandler} />
                </div>
                <div className="input-fields">
                    <label>chat with</label>
                    <input name="to" value={this.state.user.to}
                        onChange={this.inputHandler} />
                </div>
                <button>Submit</button>
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

export default UserPanel;