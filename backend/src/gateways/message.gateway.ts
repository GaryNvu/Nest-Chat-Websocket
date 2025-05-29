import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from 'src/services/message.service';
import { MessageEntity } from 'src/entities/message.entity';

@WebSocketGateway({ cors: true })
export class MessageGateway implements OnGatewayConnection {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { userId: string; content: string }
  ): Promise<void> {
    const message: MessageEntity = await this.messageService.create(data.userId, data.content);
    this.server.emit('newMessage', message);
  }
}
