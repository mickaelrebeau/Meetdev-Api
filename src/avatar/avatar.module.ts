import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './model/avatar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [AvatarService],
  controllers: [AvatarController],
})
export class AvatarModule {}
