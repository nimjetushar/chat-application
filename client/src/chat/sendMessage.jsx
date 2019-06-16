import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SendMessage extends Component {
    render() {
        return (
            <div className="message message-personal new">{this.props.detail.message}</div>
        );
    }
}

SendMessage.propTypes = {
    detail: PropTypes.shape({
        message: PropTypes.string
    })
};

export default SendMessage;