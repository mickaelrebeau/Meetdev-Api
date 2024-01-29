import * as dotenv from 'dotenv';
import { AvatarService } from 'src/avatar/avatar.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { User } from 'src/user/model/user.entity';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avatar } from 'src/avatar/model/avatar.entity';

dotenv.config();

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Avatar]),
  ],
  providers: [AuthService, UserService, AvatarService],
  controllers: [AuthController],
})
export class AuthModule {}
