import { Injectable } from '@nestjs/common';
import { Chat } from './model/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dtos/createChat';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    private userService: UserService,
  ) {}

  findAll(): Promise<Chat[]> {
    return this.chatRepository.find();
  }

  getChat(id: string) {
    return this.chatRepository.findOneBy({ id });
  }
  async createChat(createChatDto: CreateChatDto) {
    const user1 = await this.userService.getById(createChatDto.users[0]);
    const user2 = await this.userService.getById(createChatDto.users[1]);

    const chat = new Chat();
    chat.users = [user1, user2];
    return await this.chatRepository.save(chat);
  }
}
