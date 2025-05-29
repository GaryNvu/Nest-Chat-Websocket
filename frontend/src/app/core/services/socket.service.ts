import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../../features/message/interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket = io('http://localhost:3000');
  messages = signal<Message[]>([]);

  constructor() {
    this.socket.on('newMessage', (msg: Message) => {
      this.messages.update((msgs) => [...msgs, msg]);
    });
  }

  sendMessage(userId: string, content: string) {
    this.socket.emit('sendMessage', { userId, content });
  }

  addInitialMessages(initialMessages: Message[]) {
    this.messages.set(initialMessages);
  }
}
