import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from 'src/chats/chats.service';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatsService: ChatsService) {}

  async handleConnection(socket: Socket) {
    return await this.chatsService.getUserFromSocket(socket);
  }

  @SubscribeMessage('send_message')
  async listenForMessages(
    @MessageBody() message: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const user = await this.handleConnection(socket);
    this.server.sockets.emit('receive_message', {
      message,
    });

    await this.chatsService.createMessage({ message }, user);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('Disconnected', socket.id);
  }
}
