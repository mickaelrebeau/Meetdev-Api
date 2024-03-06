import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './model/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dtos/createMessage.dto';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';
import { ChatService } from 'src/chat/chat.service';
import { Chat } from 'src/chat/model/chat.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    private authService: AuthService,
    private chatService: ChatService,
  ) {}

  async getUserIdFromSocket(socket: Socket) {
    let auth_token = socket.handshake.headers.authorization;
    auth_token = auth_token.split(' ')[1];

    const userId = this.authService.getUserFromAuthenticationToken(auth_token);

    if (!userId) {
      throw new WsException('Invalid credentials.');
    }
    return userId;
  }

  async createMessage(message: CreateMessageDto) {
    const chat = await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoin('chat.users', 'user', 'user.id = :userId', {
        userId: message.userId,
      })
      .where('chat.id = :chatId', { chatId: message.chatId })
      .getOne();

    console.log(chat);

    if (!chat) {
      throw new NotFoundException("L'utilisateur n'appartient pas au chat");
    }

    const newMessage = this.messageRepository.create({
      content: message.content,
      user: { id: message.userId },
      chat: { id: message.chatId },
    });

    return this.messageRepository.save(newMessage);
  }

  async getMessagesByChatId(chatId: string) {
    return this.messageRepository.find({ where: { chat: { id: chatId } } });
  }
}
