import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './model/like.entity';
import { ChatService } from 'src/chat/chat.service';
import { Chat } from 'src/chat/model/chat.entity';
import { User } from 'src/user/model/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Chat, User])],
  providers: [LikeService, ChatService, UserService],
  controllers: [LikeController],
})
export class LikeModule {}
