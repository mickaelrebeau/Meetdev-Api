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
import { GoogleUser } from 'src/google-user/model/google.entity';
import { GoogleUserService } from 'src/google-user/google-user.service';
import { GoogleUserModule } from 'src/google-user/google-user.module';

dotenv.config();

@Module({
  imports: [
    GoogleUserModule,
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([GoogleUser]),
    TypeOrmModule.forFeature([Data]),
    TypeOrmModule.forFeature([File]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    GoogleUserService,
    AvatarService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    GoogleStatregy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
