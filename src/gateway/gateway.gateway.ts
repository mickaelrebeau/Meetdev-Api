import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from 'src/message/message.service';
import { ContentDto, ChatRoomDto } from './dtos/content.dto';

@WebSocketGateway(80)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private messageService: MessageService) {
    console.log('Gateway created');
  }

  @WebSocketServer()
  private server: Server;

  handleConnection(socket: Socket) {
    return this.messageService.getUserIdFromSocket(socket);
  }

  @SubscribeMessage('onJoinRoom')
  onJoinRoom(
    @MessageBody() data: ChatRoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(data.chatId);
  }

  @SubscribeMessage('onLeaveRoom')
  onLeaveRoom(
    @MessageBody() data: ChatRoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.leave(data.chatId);
  }

  @SubscribeMessage('send_message')
  async listenForMessages(
    @MessageBody() data: ContentDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const userId = await this.handleConnection(socket);
    console.log({ userId });

    const newMessage = await this.messageService.createMessage({
      content: data.content,
      userId,
      chatId: data.chatId,
    });

    this.server.to(data.chatId).emit('receive_message', {
      message: newMessage,
    });
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('Disconnected', socket.id);
  }
}
