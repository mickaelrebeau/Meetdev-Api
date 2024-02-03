import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './model/avatar.entity';
import { Chats } from 'src/chats/model/chats.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    TypeOrmModule.forFeature([Chats]),
  ],
  providers: [AvatarService],
  controllers: [AvatarController],
})
export class AvatarModule {}
