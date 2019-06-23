import React, { Component } from "react";
import "./App.scss";
import ChatWindow from "./chat/chatWindow";
import UserPanel from "./user/userPanel";

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: {}
    }
  }

  fetchUserObj(userObj) {
    this.setState({ users: userObj });
  }

  render() {
    return (
      <div className="container">
        <UserPanel callback={this.fetchUserObj.bind(this)}></UserPanel>
        <ChatWindow users={this.state.users}></ChatWindow>
      </div>
    );
  }
}

export default App;
