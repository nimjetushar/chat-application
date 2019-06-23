import React, { Component } from 'react';
import { MessageDetail } from '../proptypes';

class ReceivedMessage extends Component {
    render() {
        return (
            <div className="message new">
                <figure className="avatar">
                    <span>{this.props.detail.user[0]}</span>
                </figure>
                <span>{this.props.detail.message}</span>
            </div>
        );
    }
}

ReceivedMessage.propTypes = {
    detail: MessageDetail
};

export default ReceivedMessage;