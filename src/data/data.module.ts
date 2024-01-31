import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from './model/data.entity';
import { File } from 'src/avatar/model/avatar.entity';
import { AvatarModule } from 'src/avatar/avatar.module';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { AvatarService } from 'src/avatar/avatar.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Data]),
    TypeOrmModule.forFeature([File]),
    AvatarModule,
  ],
  providers: [DataService, AvatarService],
  controllers: [DataController],
})
export class DataModule {}
