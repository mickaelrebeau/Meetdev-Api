import * as dotenv from 'dotenv';
import { AvatarService } from 'src/avatar/avatar.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { User } from 'src/user/model/user.entity';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/avatar/model/avatar.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleStatregy } from './strategies/google.strategy';
import { Data } from 'src/data/model/data.entity';
import { GithubStrategy } from './strategies/github.strategy';
import { ChatsService } from 'src/chats/chats.service';
import { Chats } from 'src/chats/model/chats.entity';

dotenv.config();

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Data]),
    TypeOrmModule.forFeature([File]),
    TypeOrmModule.forFeature([Chats]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    AvatarService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    GoogleStatregy,
    GithubStrategy,
    ChatsService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
