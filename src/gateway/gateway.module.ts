import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway.gateway';
import { ChatsService } from 'src/chats/chats.service';
import { AuthService } from 'src/auth/auth.service';
import { Chats } from 'src/chats/model/chats.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModule } from 'src/chats/chats.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { GoogleUserService } from 'src/google-user/google-user.service';
import { GithubUserService } from 'src/github-user/github-user.service';
import { AvatarService } from 'src/avatar/avatar.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/model/user.entity';
import { GoogleUser } from 'src/google-user/model/google.entity';
import { GithubUser } from 'src/github-user/model/github.entity';
import { File } from 'src/avatar/model/avatar.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chats]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([GoogleUser]),
    TypeOrmModule.forFeature([GithubUser]),
    TypeOrmModule.forFeature([File]),
    ChatsModule,
    AuthModule,
  ],
  providers: [
    ChatGateway,
    AuthService,
    ChatsService,
    UserService,
    GoogleUserService,
    GithubUserService,
    AvatarService,
    JwtService,
  ],
})
export class GatewayModule {}
