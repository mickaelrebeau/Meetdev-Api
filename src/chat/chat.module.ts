import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { Chat } from './model/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { ChatService } from './chat.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/model/user.entity';
import { MessageService } from 'src/message/message.service';
import { Message } from 'src/message/model/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User, Message])],
  providers: [
    AuthService,
    ChatService,
    UserService,
    JwtService,
    MessageService,
  ],
  controllers: [ChatController],
})
export class ChatModule {}
