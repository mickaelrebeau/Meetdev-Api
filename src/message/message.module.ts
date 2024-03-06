import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './model/message.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/model/user.entity';
import { ChatService } from 'src/chat/chat.service';
import { Chat } from 'src/chat/model/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, Chat])],
  providers: [
    MessageService,
    AuthService,
    UserService,
    JwtService,
    ChatService,
  ],
})
export class MessageModule {}
