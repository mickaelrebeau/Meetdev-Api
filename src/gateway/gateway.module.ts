import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway.gateway';
import { ChatService } from 'src/chat/chat.service';
import { AuthService } from 'src/auth/auth.service';
import { Chat } from 'src/chat/model/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from 'src/chat/chat.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/model/user.entity';
import { MessageService } from 'src/message/message.service';
import { Message } from 'src/message/model/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, User, Message]),
    ChatModule,
    AuthModule,
  ],
  providers: [
    ChatGateway,
    AuthService,
    ChatService,
    UserService,
    JwtService,
    MessageService,
  ],
})
export class GatewayModule {}
