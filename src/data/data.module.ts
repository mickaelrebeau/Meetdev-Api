import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from './model/data.entity';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/model/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Data]), TypeOrmModule.forFeature([User])],
  providers: [DataService, UserService],
  controllers: [DataController],
})
export class DataModule {}
