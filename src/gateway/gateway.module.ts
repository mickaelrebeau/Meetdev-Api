import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway.gateway';
import { ChatsService } from 'src/chats/chats.service';
import { AuthService } from 'src/auth/auth.service';
import { Chats } from 'src/chats/model/chats.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModule } from 'src/chats/chats.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/model/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chats]),
    TypeOrmModule.forFeature([User]),
    ChatsModule,
    AuthModule,
  ],
  providers: [ChatGateway, AuthService, ChatsService, UserService, JwtService],
})
export class GatewayModule {}
