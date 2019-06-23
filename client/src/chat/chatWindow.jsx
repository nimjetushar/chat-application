import './chat.scss';
import React, { Component, Fragment } from 'react';
import SendMessage from './sendMessage';
import ReceivedMessage from './receivedMessage';
import { User } from '../proptypes';
import { createConnection } from './connection';

class ChatWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            receivedMsg: [],
            message: '',
            username: ''
        };
    }

    componentWillReceiveProps(props) {
        if (props.users && props.users.to && props.users.from) {
            if (this.socket) {
                return;
            }
            this.setState({ username: props.users.from[0] });
            this.socketConnection(props);
        }
    }

    socketConnection(props) {
        const socket = createConnection();
        this.socket = socket;
        socket.emit('join', { chatUser: props.users.to, currentUser: props.users.from });

        socket.on('new_message', function (msg) {
            if (props.users.from !== msg.user) {
                msg.received = true;
            }
            this.setState({ receivedMsg: this.state.receivedMsg.concat([msg]) }, () => {
                this.scrollToBottom();
            });
        }.bind(this));
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

    scrollToBottom() {
        const ele = document.getElementsByClassName("messages-content")[0];
        ele.scrollTop = ele.scrollHeight;
    }

    send() {
        if (!this.state.message && this.socket) {
            return;
        }

        this.socket.emit('join', {
            chatUser: this.props.users.to,
            currentUser: this.props.users.from,
            message: this.state.message
        });
        this.setState({ message: '' });
    }

    inputHandler(event) {
        const message = event.target.value;
        this.setState({ message: message.trim() });
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.send();
        }
    }

    render() {
        return (
            <Fragment>
                <div className="chat">
                    <div className="chat-title">
                        <h1></h1>
                        <figure className="avatar">
                            <span>{this.state.username}</span>
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
                            onChange={this.inputHandler.bind(this)}
                            onKeyDown={this.handleKeyDown.bind(this)}></textarea>
                        <button type="submit" className="message-submit" onClick={this.send.bind(this)}>Send</button>
                    </div>
                </div>
                <div className="bg"></div>
            </Fragment>
        );
    }
}

ChatWindow.propTypes = {
    users: User
}

export default ChatWindow;