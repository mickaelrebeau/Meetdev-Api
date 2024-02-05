import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { Chats } from './model/chats.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { ChatsService } from './chats.service';
import { UserService } from 'src/user/user.service';
import { AvatarService } from 'src/avatar/avatar.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/model/user.entity';
import { File } from 'src/avatar/model/avatar.entity';
import { ChatGateway } from 'src/gateway/gateway.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chats]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([File]),
  ],
  providers: [
    AuthService,
    ChatsService,
    UserService,
    AvatarService,
    JwtService,
    ChatGateway,
  ],
  controllers: [ChatsController],
})
export class ChatsModule {}
