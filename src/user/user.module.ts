import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avatar } from 'src/avatar/model/avatar.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Avatar]),
    UserModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
