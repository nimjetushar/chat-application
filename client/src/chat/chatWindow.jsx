import './chat.scss';
import React, { Component, Fragment } from 'react';
import SendMessage from './sendMessage';
import ReceivedMessage from './receivedMessage';

class ChatWindow extends Component {

    constructor() {
        super();
        this.state = {
            receivedMsg: [],
            message: ''
        };

        this.send = this.send.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    renderMessage() {
        return <Fragment>
            {this.state.receivedMsg.map((item, idx) => {
                if (item.received) {
                    return <ReceivedMessage key={idx} detail={item}></ReceivedMessage>
                } else {
                    return <SendMessage key={idx} detail={item}></SendMessage>;
                }
            })}
        </Fragment>
    }

    send() {
        const msgObj = {
            message: this.state.message,
            user: {}
        };

        if (!this.state.message) {
            return;
        }

        const receivedMsg = this.state.receivedMsg.concat([msgObj]);
        this.setState({ receivedMsg: receivedMsg });
    }

    inputHandler(event) {
        this.setState({ message: event.target.value });
    }

    render() {
        return (
            <Fragment>
                <div className="chat">
                    <div className="chat-title">
                        <h1></h1>
                        <figure className="avatar">
                            <span></span>
                        </figure>
                    </div>
                    <div className="messages">
                        <div className="messages-content">
                            {this.renderMessage()}
                        </div>
                    </div>
                    <div className="message-box">
                        <textarea name="message" type="text"
                            className="message-input" placeholder="Type message..."
                            value={this.state.message}
                            onChange={this.inputHandler}></textarea>
                        <button type="submit" className="message-submit" onClick={this.send}>Send</button>
                    </div>
                </div>
                <div className="bg"></div>
            </Fragment>
        );
    }
}

export default ChatWindow;