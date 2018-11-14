import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  receivedMsg: Array<string> = [];
  message: string;
  socket: any;
  chatUser: string;
  currentUser: string;
  userObj: Array<string> = [];

  constructor() {
    this.chatUser = "Nitin";
    this.currentUser = "Tushar";
  }

  ngOnInit() {
    this.socket = io.connect('http://localhost:3000');
    this.socket.emit('join', { chatUser: this.chatUser, currUser: this.currentUser });

    this.socket.on('new_msg', (msg) => {
      this.receivedMsg.push(msg);
    })

    this.socket.on('broadcast', (data) => {
      if (data) {
        for (const key in data) {
          if (!this.userObj.includes(key)) {
            this.userObj.push(key);
          }
        }
      }
    })
  }

  sendMessage() {
    this.socket.emit('join', { chatUser: this.chatUser, currUser: this.currentUser, message: this.message });
    this.message = "";
  }

  closeSession() {
    this.socket.emit('end', { currUser: this.currentUser })
    this.socket.disconnect();
  }
}
