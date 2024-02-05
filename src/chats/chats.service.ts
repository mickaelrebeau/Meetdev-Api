import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { ChatsDto } from './dtos/chats.dto';
import { Chats } from './model/chats.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chats)
    private chatsRespository: Repository<Chats>,
    private authService: AuthService,
  ) {}

  async getUserFromSocket(socket: Socket) {
    let auth_token = socket.handshake.headers.authorization;
    auth_token = auth_token.split(' ')[1];

    const user = this.authService.getUserFromAuthenticationToken(auth_token);

    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  async createMessage(message: ChatsDto, userId: string) {
    await this.chatsRespository.save({
      ...message,
      user: { id: userId },
    });
  }

  async getAllChats(): Promise<Chats[]> {
    return await this.chatsRespository.find();
  }
}
