import { Component, OnInit, Signal } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../interfaces/message';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthResponse, AuthService } from '../../../../core/services/auth.service';
import { SocketService } from '../../../../core/services/socket.service';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';

@Component({
  selector: 'app-message-list',
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    AvatarComponent
  ],
  templateUrl: './message-list.component.html',
})
export class MessageListComponent implements OnInit {
  currentUser: Signal<AuthResponse['user'] | null>;
  messages!: Signal<Message[]>;
  newMessage: string = '';

  constructor(
    private authService: AuthService,
    private socketService: SocketService,
    private messageService: MessageService,
  ) {
    this.currentUser = this.authService.currentUser;
    this.messages = this.socketService.messages;
  }

  ngOnInit(): void {
    this.messageService.getAllMessages().subscribe({
      next: (msgs) => this.socketService.addInitialMessages(msgs),
      error: (err) => console.error('Erreur lors du chargement des messages initiaux', err),
    });
  }

  isCurrentUserMessage(message: Message): boolean {
    return message.user.id === this.currentUser()?.id;
  }

  sendMessage(): void {
    const content = this.newMessage.trim();
    const user = this.currentUser();

    if (!content || !user) return;

    this.socketService.sendMessage(user.id, content);
    this.newMessage = '';
  }
}
