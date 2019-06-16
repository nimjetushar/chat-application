import React, { Component } from "react";
import "./App.scss";
import ChatWindow from "./chat/chatWindow";
import UserPanel from "./user/userPanel";

class App extends Component {
  render() {
    return (
      <div className="container">
        <UserPanel></UserPanel>
        <ChatWindow></ChatWindow>
      </div>
    );
  }
}

export default App;
