import React, { Component } from 'react';
import { MessageDetail } from '../proptypes';

class SendMessage extends Component {
    render() {
        return (
            <div className="message message-personal new">{this.props.detail.message}</div>
        );
    }
}

SendMessage.propTypes = {
    detail: MessageDetail
};

export default SendMessage;