import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Image } from './model/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/model/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [ImageService, UserService],
  controllers: [ImageController],
})
export class ImageModule {}
